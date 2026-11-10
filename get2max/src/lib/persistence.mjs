export const STORAGE_KEY = "get2max-demo-v1";
export function progressPercent(completed, total) {
  return total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
}
export function isDemoState(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    value.version === 1 &&
    Array.isArray(value.goals) &&
    value.goals.every(
      (g) =>
        g &&
        [
          "id",
          "title",
          "description",
          "categoryId",
          "unit",
          "deadline",
          "createdAt",
        ].every((k) => typeof g[k] === "string") &&
        Number.isFinite(g.targetValue) &&
        g.targetValue > 0 &&
        Number.isFinite(g.currentValue) &&
        g.currentValue >= 0 &&
        g.currentValue <= g.targetValue &&
        ["active", "completed"].includes(g.status) &&
        ["numerical", "completion"].includes(g.kind),
    ) &&
    Array.isArray(value.progress) &&
    value.progress.every(
      (p) =>
        p &&
        typeof p.courseId === "string" &&
        typeof p.enrolledAt === "string" &&
        typeof p.lastAccessedAt === "string" &&
        Array.isArray(p.completedLessonIds) &&
        p.completedLessonIds.every((id) => typeof id === "string"),
    )
  );
}
