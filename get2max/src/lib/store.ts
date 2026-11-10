"use client";
import { useSyncExternalStore } from "react";
import type { DemoState, Goal } from "./models";
import { initialGoals, courses, categories } from "./data";
import { STORAGE_KEY, isDemoState } from "./persistence.mjs";

type Snapshot = { data: DemoState; ready: boolean; error: string };
const server: Snapshot = {
  data: { version: 1, goals: [], progress: [] },
  ready: false,
  error: "",
};
let snapshot = server;
const listeners = new Set<() => void>();
let initialized = false;
function validState(value: unknown): value is DemoState {
  return (
    isDemoState(value) &&
    (value as DemoState).goals.every((goal) =>
      categories.some((category) => category.id === goal.categoryId),
    )
  );
}
function notify() {
  listeners.forEach((fn) => fn());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!initialized) {
    initialized = true;
    let data: DemoState = { version: 1, goals: initialGoals(), progress: [] };
    let error = "";
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed: unknown = JSON.parse(raw);
          if (validState(parsed)) data = parsed;
          else throw new Error("Invalid saved data");
        } catch {
          error =
            "Saved data could not be read. A fresh demo is available; changes will replace the invalid data.";
        }
      } else localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      error =
        "Browser storage is unavailable. Changes will work for this visit but may not survive a refresh.";
    }
    snapshot = { data, ready: true, error };
    window.addEventListener("storage", (event) => {
      if (event.key !== STORAGE_KEY) return;
      try {
        const parsed: unknown = JSON.parse(event.newValue || "null");
        if (validState(parsed)) {
          snapshot = { data: parsed, ready: true, error: "" };
          notify();
        }
      } catch {
        /* Preserve current valid state. */
      }
    });
    queueMicrotask(notify);
  }
  return () => {
    listeners.delete(listener);
  };
}
function update(transform: (data: DemoState) => DemoState) {
  const data = transform(snapshot.data);
  let error = "";
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    error =
      "Your browser could not save this change. It is available for this visit only.";
  }
  snapshot = { data, ready: true, error };
  notify();
}
export function useDemo() {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => server,
  );
}
export function saveGoal(goal: Goal) {
  update((data) => ({
    ...data,
    goals: data.goals.some((g) => g.id === goal.id)
      ? data.goals.map((g) => (g.id === goal.id ? goal : g))
      : [...data.goals, goal],
  }));
}
export function deleteGoal(id: string) {
  update((data) => ({ ...data, goals: data.goals.filter((g) => g.id !== id) }));
}
export function enroll(courseId: string) {
  update((data) =>
    data.progress.some((p) => p.courseId === courseId)
      ? data
      : {
          ...data,
          progress: [
            ...data.progress,
            {
              courseId,
              completedLessonIds: [],
              enrolledAt: new Date().toISOString(),
              lastAccessedAt: new Date().toISOString(),
            },
          ],
        },
  );
}
export function completeLesson(courseId: string, lessonId: string) {
  if (
    !courses.some(
      (c) => c.id === courseId && c.lessons.some((l) => l.id === lessonId),
    )
  )
    return;
  update((data) => ({
    ...data,
    progress: data.progress.map((p) =>
      p.courseId === courseId
        ? {
            ...p,
            completedLessonIds: Array.from(
              new Set([...p.completedLessonIds, lessonId]),
            ),
            lastAccessedAt: new Date().toISOString(),
          }
        : p,
    ),
  }));
}
