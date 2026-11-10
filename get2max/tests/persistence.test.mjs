import { test } from "node:test";
import assert from "node:assert/strict";
import { isDemoState, progressPercent } from "../src/lib/persistence.mjs";
const goal = {
  id: "g1",
  title: "Read",
  description: "Read regularly",
  categoryId: "knowledge",
  targetValue: 12,
  currentValue: 4,
  unit: "books",
  deadline: "",
  status: "active",
  createdAt: "2026-11-10T12:00:00Z",
  kind: "numerical",
};
const state = {
  version: 1,
  goals: [goal],
  progress: [
    {
      courseId: "course-1",
      completedLessonIds: ["lesson-1"],
      enrolledAt: "2026-11-10T12:00:00Z",
      lastAccessedAt: "2026-11-10T12:00:00Z",
    },
  ],
};
test("saved goals and course progress survive serialization", () =>
  assert.equal(isDemoState(JSON.parse(JSON.stringify(state))), true));
test("invalid or incomplete saved data is rejected", () => {
  for (const value of [
    null,
    {},
    { ...state, version: 2 },
    { ...state, goals: [{ ...goal, targetValue: 0 }] },
    { ...state, goals: [{ ...goal, currentValue: 13 }] },
    { ...state, progress: [{ courseId: "x" }] },
  ])
    assert.equal(isDemoState(value), false);
});
test("course and goal percentages handle boundaries and rounding", () => {
  assert.equal(progressPercent(1, 3), 33);
  assert.equal(progressPercent(3, 3), 100);
  assert.equal(progressPercent(5, 3), 100);
  assert.equal(progressPercent(0, 0), 0);
});
