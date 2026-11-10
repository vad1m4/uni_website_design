"use client";
import { useRef, useState, type FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  ArrowLeft,
  ArrowRight,
  Pencil,
  Trash2,
  Check,
  CalendarDays,
  Flag,
  X,
} from "lucide-react";
import { categories, categoryFor } from "@/lib/data";
import { deleteGoal, saveGoal, useDemo } from "@/lib/store";
import type { Goal } from "@/lib/models";
import { progressPercent } from "@/lib/persistence.mjs";
import { CategoryIcon, EmptyState, GoalCard, Loading, Progress } from "./ui";
import { Missing, PageIntro } from "./library";

export function GoalForm({
  goal,
  onDone,
  onCancel,
}: {
  goal?: Goal;
  onDone: (id: string) => void;
  onCancel: () => void;
}) {
  const [kind, setKind] = useState<Goal["kind"]>(goal?.kind || "numerical");
  const ref = useRef<HTMLFormElement>(null);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") || "").trim();
    if (!title) {
      const input =
        ref.current?.querySelector<HTMLInputElement>("[name=title]");
      input?.setCustomValidity("Please give your goal a title.");
      input?.reportValidity();
      return;
    }
    const targetValue = kind === "completion" ? 1 : Number(form.get("target"));
    const currentValue =
      kind === "completion"
        ? goal?.status === "completed"
          ? 1
          : 0
        : Math.min(goal?.currentValue || 0, targetValue);
    const id = goal?.id || crypto.randomUUID();
    saveGoal({
      id,
      title,
      description: String(form.get("description") || "").trim(),
      categoryId: String(form.get("category")),
      kind,
      targetValue,
      currentValue,
      unit:
        kind === "completion"
          ? "completed"
          : String(form.get("unit") || "steps").trim() || "steps",
      deadline: String(form.get("deadline") || ""),
      status: currentValue >= targetValue ? "completed" : "active",
      createdAt: goal?.createdAt || new Date().toISOString(),
    });
    onDone(id);
  };
  return (
    <section className="goal-form-panel" aria-labelledby="goal-form-title">
      <div className="card-top">
        <div>
          <p className="eyebrow">MAKE IT YOURS</p>
          <h2 id="goal-form-title">
            {goal
              ? "A little adjustment."
              : "What would you like to work toward?"}
          </h2>
        </div>
        <button
          className="icon-button"
          onClick={onCancel}
          aria-label="Close goal form"
        >
          <X size={20} />
        </button>
      </div>
      <form ref={ref} onSubmit={submit}>
        <label>
          Goal title
          <input
            autoFocus
            name="title"
            required
            maxLength={120}
            defaultValue={goal?.title}
            placeholder="e.g. Read 12 books this year"
            onChange={(e) => e.target.setCustomValidity("")}
          />
        </label>
        <label>
          What does this goal mean to you?
          <textarea
            name="description"
            rows={3}
            maxLength={1000}
            defaultValue={goal?.description}
            placeholder="A little context to come back to…"
          />
        </label>
        <div className="form-grid">
          <label>
            Category
            <select
              name="category"
              defaultValue={goal?.categoryId || categories[0].id}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            How will you track it?
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as Goal["kind"])}
            >
              <option value="numerical">A measurable target</option>
              <option value="completion">Simply complete it</option>
            </select>
          </label>
        </div>
        {kind === "numerical" && (
          <div className="form-grid">
            <label>
              Target
              <input
                name="target"
                type="number"
                min="1"
                max="1000000"
                step="1"
                required
                defaultValue={goal?.targetValue || 12}
              />
            </label>
            <label>
              Unit
              <input
                name="unit"
                required
                maxLength={30}
                defaultValue={goal?.kind === "numerical" ? goal.unit : ""}
                placeholder="e.g. books, walks, sessions"
              />
            </label>
          </div>
        )}
        <label>
          Deadline <span className="muted">(optional)</span>
          <input name="deadline" type="date" defaultValue={goal?.deadline} />
        </label>
        <div className="form-actions">
          <button
            type="button"
            className="button button-outline"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="button button-dark" type="submit">
            {goal ? "Save changes" : "Create my goal"}
            <ArrowRight size={16} />
          </button>
        </div>
        <p className="form-footnote">
          For you, on this device. Your goals are saved in this browser.
        </p>
      </form>
    </section>
  );
}
export function Goals() {
  const { data, ready } = useDemo();
  const params = useSearchParams();
  const router = useRouter();
  const [creating, setCreating] = useState(params.get("new") === "1");
  const [filter, setFilter] = useState("all");
  if (!ready) return <Loading />;
  const visible = data.goals.filter(
    (g) => filter === "all" || g.status === filter,
  );
  return (
    <div className="container page-space">
      <div className="page-title-row">
        <PageIntro
          eyebrow="YOUR PROGRESS, YOUR PACE"
          title="Small steps. Personal goals."
          description="Give your intentions a direction. Make progress visible, one meaningful step at a time."
        />
        <button
          className="button button-dark"
          onClick={() => setCreating(true)}
        >
          <Plus size={17} />
          Create a goal
        </button>
      </div>
      {creating && (
        <GoalForm
          onCancel={() => setCreating(false)}
          onDone={(id) => router.push(`/goals/${id}`)}
        />
      )}
      <div className="catalog-tabs">
        {[
          ["all", "All goals"],
          ["active", "In progress"],
          ["completed", "Completed"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={value === filter ? "selected" : ""}
            aria-pressed={value === filter}
          >
            {label}
            <span>
              {
                data.goals.filter((g) => value === "all" || g.status === value)
                  .length
              }
            </span>
          </button>
        ))}
      </div>
      {visible.length ? (
        <div className="goal-grid">
          {visible.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={
            filter === "completed"
              ? "Your next milestone is ahead."
              : "Every journey starts with one goal."
          }
          text={
            filter === "completed"
              ? "Complete a goal and it will appear here. Keep going at your own pace."
              : "Choose something that matters to you, make it achievable, and take the first step."
          }
        >
          <button
            className="button button-dark"
            onClick={() => setCreating(true)}
          >
            Create a goal
            <Plus size={16} />
          </button>
        </EmptyState>
      )}
    </div>
  );
}
export function GoalDetail({ id }: { id: string }) {
  const { data, ready } = useDemo();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [notice, setNotice] = useState("");
  if (!ready) return <Loading />;
  const goal = data.goals.find((g) => g.id === id);
  if (!goal) return <Missing />;
  const percent = progressPercent(goal.currentValue, goal.targetValue);
  const update = (value: number) => {
    saveGoal({
      ...goal,
      currentValue: value,
      status: value >= goal.targetValue ? "completed" : "active",
    });
    setNotice(
      value >= goal.targetValue
        ? "Goal completed. That’s a step worth celebrating."
        : "Progress saved. Keep going at your own pace.",
    );
  };
  return (
    <div className="container page-space goal-detail">
      <Link href="/goals" className="back-link">
        <ArrowLeft size={15} />
        All your goals
      </Link>
      {editing ? (
        <GoalForm
          goal={goal}
          onDone={() => {
            setEditing(false);
            setNotice("Your changes are saved.");
          }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <>
          <div className="goal-detail-top">
            <CategoryIcon category={categoryFor(goal.categoryId)} />
            <div className="goal-actions">
              <button
                className="button button-outline"
                onClick={() => setEditing(true)}
              >
                <Pencil size={15} />
                Edit goal
              </button>
              <button
                className="icon-button delete-button"
                aria-label="Delete goal"
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <p className="eyebrow">{categoryFor(goal.categoryId).name}</p>
          <h1>{goal.title}</h1>
          <p className="goal-description">
            {goal.description || "A personal goal, one small step at a time."}
          </p>
          <div className="goal-dates">
            <span>
              <Flag size={15} />
              Created{" "}
              {new Date(goal.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            {goal.deadline && (
              <span>
                <CalendarDays size={15} />
                Target date{" "}
                {new Date(`${goal.deadline}T12:00:00`).toLocaleDateString(
                  "en-GB",
                  { day: "numeric", month: "short", year: "numeric" },
                )}
              </span>
            )}
          </div>
          <section className="goal-progress-panel">
            <div className="progress-caption">
              <h2>
                {goal.status === "completed"
                  ? "You made it."
                  : "Look how far you’ve come."}
              </h2>
              <span className="large-percent">
                {percent}
                <small>%</small>
              </span>
            </div>
            <Progress value={percent} label="Goal progress" />
            <p className="muted">
              {goal.kind === "numerical"
                ? `${goal.currentValue} of ${goal.targetValue} ${goal.unit}`
                : goal.status === "completed"
                  ? "Completed"
                  : "In progress"}
            </p>
            {goal.kind === "numerical" && (
              <form
                className="update-progress"
                key={`${goal.id}-${goal.currentValue}`}
                onSubmit={(e) => {
                  e.preventDefault();
                  update(Number(new FormData(e.currentTarget).get("value")));
                }}
              >
                <label htmlFor="progress-value">Update your progress</label>
                <div>
                  <input
                    id="progress-value"
                    name="value"
                    type="number"
                    min="0"
                    max={goal.targetValue}
                    step="1"
                    defaultValue={goal.currentValue}
                    required
                  />
                  <span>{goal.unit}</span>
                  <button type="submit" className="button button-dark">
                    Save progress
                    <Check size={16} />
                  </button>
                </div>
              </form>
            )}
            <button
              className="button button-outline"
              onClick={() =>
                update(goal.status === "completed" ? 0 : goal.targetValue)
              }
            >
              {goal.status === "completed"
                ? "Reopen this goal"
                : "Mark goal complete"}
              <Check size={16} />
            </button>
            <p className="save-notice" aria-live="polite">
              {notice}
            </p>
          </section>
          {confirmDelete && (
            <div className="delete-confirm" role="alert">
              <h3>Delete this goal?</h3>
              <p>
                This will remove the goal and its saved progress from this
                browser.
              </p>
              <div className="form-actions">
                <button
                  className="button button-outline"
                  onClick={() => setConfirmDelete(false)}
                >
                  Keep goal
                </button>
                <button
                  className="button button-danger"
                  onClick={() => {
                    deleteGoal(goal.id);
                    router.push("/goals");
                  }}
                >
                  Delete goal
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
