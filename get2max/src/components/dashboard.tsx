"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  Plus,
  BookOpen,
  Flag,
  CheckCheck,
  Sprout,
  ArrowRight,
} from "lucide-react";
import { courses, resources } from "@/lib/data";
import { useDemo } from "@/lib/store";
import { progressPercent } from "@/lib/persistence.mjs";
import {
  CourseCard,
  GoalCard,
  Loading,
  EmptyState,
  ResourceCard,
  SectionHeading,
} from "./ui";
import { PageIntro } from "./library";
export function Dashboard() {
  const { data, ready } = useDemo();
  if (!ready) return <Loading />;
  const enrolled = courses.filter((c) =>
    data.progress.some((p) => p.courseId === c.id),
  );
  const active = data.goals.filter((g) => g.status === "active");
  const interests = new Set([
    ...active.map((g) => g.categoryId),
    ...enrolled.map((c) => c.categoryId),
  ]);
  const recommended = resources
    .filter((r) => !interests.size || interests.has(r.categoryId))
    .slice(0, 3);
  const lessons = data.progress.reduce(
    (n, p) => n + p.completedLessonIds.length,
    0,
  );
  return (
    <div className="container page-space dashboard">
      <div className="page-title-row">
        <PageIntro
          eyebrow="YOUR PERSONAL GROWTH SPACE"
          title="Welcome to your next chapter."
          description="Continue building your potential. A little progress today goes a long way."
        />
        <Link href="/goals?new=1" className="button button-dark">
          <Plus size={17} />
          New goal
        </Link>
      </div>
      <div className="dashboard-stats">
        {[
          {
            icon: BookOpen,
            value: enrolled.length,
            label: "Courses on your path",
          },
          { icon: Flag, value: active.length, label: "Goals in progress" },
          { icon: CheckCheck, value: lessons, label: "Lessons completed" },
          {
            icon: Sprout,
            value: data.goals.filter((g) => g.status === "completed").length,
            label: "Goals achieved",
          },
        ].map((s) => (
          <div key={s.label}>
            <s.icon size={21} />
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <section className="dashboard-section">
        <SectionHeading
          title="Pick up where you left off."
          href="/courses"
          action="Browse courses"
        />
        {enrolled.length ? (
          <div className="course-grid">
            {enrolled.map((course) => {
              const p = data.progress.find((p) => p.courseId === course.id)!;
              const next = course.lessons.find(
                (l) => !p.completedLessonIds.includes(l.id),
              );
              return (
                <div key={course.id}>
                  <CourseCard
                    course={course}
                    completed={progressPercent(
                      p.completedLessonIds.length,
                      course.lessons.length,
                    )}
                    continueLabel
                  />
                  {next && <p className="next-lesson">Up next: {next.title}</p>}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="Make room for something new."
            text="Choose a course that sparks your curiosity. Your lessons and progress will appear here."
            href="/courses"
            label="Find your first course"
          />
        )}
      </section>
      <section className="dashboard-section">
        <SectionHeading
          title="The things you’re working toward."
          href="/goals"
          action="All your goals"
        />
        {active.length ? (
          <div className="goal-grid">
            {active.slice(0, 3).map((goal) => (
              <GoalCard goal={goal} key={goal.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="A new direction is waiting."
            text="Create a personal goal and take the first small step."
            href="/goals?new=1"
            label="Create a goal"
          />
        )}
      </section>
      <div className="quick-actions">
        <Link href="/resources">
          <BookOpen size={22} />
          <span>
            Explore the library<small>A little knowledge for your day</small>
          </span>
          <ArrowUpRight size={19} />
        </Link>
        <Link href="/courses">
          <Sprout size={22} />
          <span>
            Find your next course<small>Learn with a little structure</small>
          </span>
          <ArrowUpRight size={19} />
        </Link>
        <Link href="/goals?new=1">
          <Plus size={22} />
          <span>
            Set a personal goal<small>Give your intentions a direction</small>
          </span>
          <ArrowUpRight size={19} />
        </Link>
      </div>
      <section className="dashboard-section">
        <SectionHeading
          eyebrow="INSPIRED BY YOUR ACTIVE CATEGORIES"
          title="A little something for your journey."
          href="/resources"
          action="Keep exploring"
        />
        <div className="resource-grid">
          {recommended.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      </section>
      <p className="demo-notice">
        <Sprout size={17} />
        You’re exploring a single-user demo. Your goals and course progress stay
        in this browser.
        <Link href="/categories">
          Explore more
          <ArrowRight size={14} />
        </Link>
      </p>
    </div>
  );
}
