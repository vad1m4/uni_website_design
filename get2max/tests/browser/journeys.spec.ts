import { test, expect } from "@playwright/test";

test("resource search, combined filters, difficulty, sorting, and empty state", async ({
  page,
}) => {
  await page.goto("/resources");
  await expect(page.locator(".resource-card")).toHaveCount(15);
  await page.getByLabel("Search resources").fill("listening");
  await expect(page.locator(".resource-card")).toHaveCount(1);
  await page.getByLabel("Search resources").fill("");
  await page.getByLabel("Format", { exact: true }).selectOption("Audio");
  await expect(page.locator(".resource-card")).toHaveCount(3);
  await page.getByLabel("Category", { exact: true }).selectOption("health");
  await expect(page.locator(".resource-card")).toHaveCount(1);
  await page.getByLabel("Difficulty", { exact: true }).selectOption("Advanced");
  await expect(
    page.getByRole("heading", { name: "A different direction?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByLabel("Sort resources").selectOption("shortest");
  await expect(page.locator(".resource-card").first()).toContainText(
    "Notice more. Slow down.",
  );
  await page.getByLabel("Sort resources").selectOption("longest");
  await expect(page.locator(".resource-card").first()).toContainText(
    "Say what you mean, with clarity",
  );
});

test("enroll, complete lessons, resume after refresh, and see dashboard progress", async ({
  page,
}) => {
  await page.goto("/courses/effective-communication");
  await page.getByRole("button", { name: "Enroll & start learning" }).click();
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(
    page.getByRole("progressbar", { name: "Course completion" }),
  ).toHaveAttribute("aria-valuenow", "33");
  await page.reload();
  await expect(
    page.getByRole("heading", {
      name: "Say what you mean, with clarity",
      exact: true,
    }),
  ).toBeVisible();
  await page.goto("/dashboard");
  await expect(
    page.getByRole("progressbar", {
      name: "Foundations of Effective Communication progress",
    }),
  ).toHaveAttribute("aria-valuenow", "33");
  await expect(
    page.getByText("Up next: Say what you mean, with clarity"),
  ).toBeVisible();
  await page.locator(".course-card").click();
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(
    page.getByRole("progressbar", { name: "Course completion" }),
  ).toHaveAttribute("aria-valuenow", "100");
  await page.reload();
  await expect(page.getByText("You completed this course")).toBeVisible();
});

test("create, edit, update, complete, reopen, and delete a numerical goal", async ({
  page,
}) => {
  await page.goto("/goals?new=1");
  await page.getByLabel("Goal title").fill("Practice public speaking");
  await page
    .getByLabel("What does this goal mean to you?")
    .fill("Give ten short practice talks.");
  await page
    .getByRole("combobox", { name: "Category", exact: true })
    .selectOption("communication");
  await page
    .getByRole("spinbutton", { name: "Target", exact: true })
    .fill("10");
  await page.getByRole("textbox", { name: "Unit", exact: true }).fill("talks");
  await page.getByRole("button", { name: "Create my goal" }).click();
  await expect(page).toHaveURL(/\/goals\/[a-f0-9-]+$/);
  await expect(
    page.getByRole("heading", {
      name: "Practice public speaking",
      exact: true,
      level: 1,
    }),
  ).toBeVisible();
  const url = page.url();
  await page.getByLabel("Update your progress").fill("4");
  await page.getByRole("button", { name: "Save progress" }).click();
  await page.reload();
  await expect(
    page.getByRole("progressbar", { name: "Goal progress" }),
  ).toHaveAttribute("aria-valuenow", "40");
  await page.goto("/dashboard");
  await page.goto(url);
  await page.getByRole("button", { name: "Edit goal", exact: true }).click();
  await page.getByLabel("Goal title").fill("Speak with confidence");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(
    page.getByRole("heading", { name: "Speak with confidence", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Mark goal complete" }).click();
  await expect(
    page.getByRole("progressbar", { name: "Goal progress" }),
  ).toHaveAttribute("aria-valuenow", "100");
  await page.getByRole("button", { name: "Reopen this goal" }).click();
  await expect(
    page.getByRole("progressbar", { name: "Goal progress" }),
  ).toHaveAttribute("aria-valuenow", "0");
  await page.getByRole("button", { name: "Delete goal", exact: true }).click();
  await page.getByRole("button", { name: "Keep goal" }).click();
  await expect(
    page.getByRole("heading", { name: "Speak with confidence", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Delete goal", exact: true }).click();
  await page
    .getByRole("button", { name: "Delete goal", exact: true })
    .last()
    .click();
  await expect(page).toHaveURL("/goals");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Speak with confidence", exact: true }),
  ).toHaveCount(0);
});

test("completion goals and form validation", async ({ page }) => {
  await page.goto("/goals?new=1");
  await page.getByLabel("Goal title").fill("   ");
  await page
    .getByRole("combobox", { name: "How will you track it?" })
    .selectOption("completion");
  await page.getByRole("button", { name: "Create my goal" }).click();
  await expect(page).toHaveURL("/goals?new=1");
  await page.getByLabel("Goal title").fill("Try one new skill");
  await page.getByRole("button", { name: "Create my goal" }).click();
  await page.getByRole("button", { name: "Mark goal complete" }).click();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "You made it." }),
  ).toBeVisible();
  await page.goto("/goals");
  await page.getByRole("button", { name: /^Completed/ }).click();
  await expect(page.locator(".goal-card")).toHaveCount(1);
});

test("audio and video play, pause, seek, and expose usable controls", async ({
  page,
}) => {
  await page.goto("/resources/mindful-pause");
  await expect(page.locator("audio")).toBeVisible();
  const audio = await page
    .locator("audio")
    .evaluate(async (element: HTMLAudioElement) => {
      if (element.readyState < 1)
        await new Promise<void>((resolve, reject) => {
          element.onloadedmetadata = () => resolve();
          element.onerror = () => reject(new Error("Audio failed to load"));
        });
      element.muted = true;
      await element.play();
      const playing = !element.paused;
      element.pause();
      element.currentTime = 10;
      element.volume = 0.4;
      return {
        duration: element.duration,
        playing,
        paused: element.paused,
        seek: element.currentTime,
        volume: element.volume,
      };
    });
  expect(audio.playing).toBe(true);
  expect(audio.paused).toBe(true);
  expect(audio.duration).toBeGreaterThan(60);
  expect(audio.seek).toBe(10);
  expect(audio.volume).toBe(0.4);
  await page.getByRole("combobox").selectOption("1.5");
  expect(
    await page
      .locator("audio")
      .evaluate((a: HTMLAudioElement) => a.playbackRate),
  ).toBe(1.5);
  await page.getByText("Read the full audio transcript").click();
  await expect(page.locator(".audio-transcript p")).toContainText(
    "Welcome to a small pause",
  );
  await page.goto("/resources/notice-nature");
  const video = await page
    .locator("video")
    .evaluate(async (element: HTMLVideoElement) => {
      element.muted = true;
      await element.play();
      const playing = !element.paused;
      element.pause();
      element.currentTime = 2;
      return {
        playing,
        controls: element.controls,
        duration: element.duration,
      };
    });
  expect(video.playing).toBe(true);
  expect(video.controls).toBe(true);
  expect(video.duration).toBeGreaterThan(0);
});

test("responsive pages, navigation, persistent theme, keyboard skip link", async ({
  page,
}, testInfo) => {
  for (const route of [
    "/",
    "/categories",
    "/resources",
    "/dashboard",
    "/courses/effective-communication",
    "/goals/read-12-books",
    "/goals?new=1",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    const size = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(size.scroll, `Horizontal overflow on ${route}`).toBeLessThanOrEqual(
      size.client,
    );
  }
  if (testInfo.project.name === "desktop") {
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/");
      const size = await page.evaluate(() => ({
        client: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(size.scroll, `Home overflow at ${width}px`).toBeLessThanOrEqual(
        size.client,
      );
    }
  }
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Resources", exact: true })
      .click();
    await expect(page).toHaveURL("/resources");
  }
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.screenshot({
    path: testInfo.outputPath("home.png"),
    fullPage: true,
  });
});

test("all category links work and missing resources return 404", async ({
  page,
}) => {
  await page.goto("/categories");
  const links = await page
    .locator(".category-card")
    .evaluateAll((elements) => elements.map((a) => a.getAttribute("href")!));
  expect(links).toHaveLength(7);
  for (const href of links) {
    const response = await page.goto(href);
    expect(response?.status()).toBe(200);
    await expect(page.locator(".resource-card").first()).toBeVisible();
  }
  const response = await page.goto("/resources/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "This path doesn’t lead anywhere yet." }),
  ).toBeVisible();
});

test("empty states and invalid stored data recover gracefully", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem("seeded")) {
      localStorage.setItem(
        "get2max-demo-v1",
        JSON.stringify({ version: 1, goals: [], progress: [] }),
      );
      sessionStorage.setItem("seeded", "yes");
    }
  });
  await page.goto("/dashboard");
  await expect(
    page.getByRole("link", { name: "Find your first course" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Create a goal", exact: true }),
  ).toBeVisible();
  await page.evaluate(() =>
    localStorage.setItem("get2max-demo-v1", "invalid-json"),
  );
  await page.reload();
  await expect(page.locator(".storage-warning")).toBeVisible();
  await expect(page.locator(".goal-card")).toHaveCount(3);
});
