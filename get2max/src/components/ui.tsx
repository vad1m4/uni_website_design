import Link from "next/link";
import {
  Activity,
  Sparkles,
  MessagesSquare,
  Zap,
  Heart,
  BookOpen,
  ChartNoAxesCombined,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  FileText,
  Headphones,
  Play,
  Check,
  type LucideIcon,
} from "lucide-react";
import { categoryFor } from "@/lib/data";
import type { Category, Course, Resource, Goal } from "@/lib/models";
import { progressPercent } from "@/lib/persistence.mjs";
const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  sparkles: Sparkles,
  messages: MessagesSquare,
  zap: Zap,
  heart: Heart,
  book: BookOpen,
  chart: ChartNoAxesCombined,
};
export function CategoryIcon({
  category,
  size = 23,
}: {
  category: Category;
  size?: number;
}) {
  const Icon = iconMap[category.icon] || BookOpen;
  return (
    <span className={`category-icon ${category.color}`}>
      <Icon size={size} strokeWidth={1.65} />
    </span>
  );
}
export function FormatIcon({
  format,
  size = 14,
}: {
  format: Resource["format"];
  size?: number;
}) {
  const Icon =
    format === "Audio" ? Headphones : format === "Video" ? Play : FileText;
  return <Icon size={size} />;
}
export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${value}%` }} />
    </div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p className="muted">{description}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {action || "Explore all"}
          <ArrowUpRight size={17} />
        </Link>
      )}
    </div>
  );
}
export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.slug}`} className="category-card">
      <div className="card-top">
        <CategoryIcon category={category} />
        <ArrowUpRight className="card-arrow" size={19} />
      </div>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      <span className="tiny-label">
        EXPLORE CATEGORY <ArrowRight size={13} />
      </span>
    </Link>
  );
}
export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link href={`/resources/${resource.slug}`} className="resource-card">
      <div className="resource-image">
        <img src={resource.thumbnail} alt="" loading="lazy" />
        <span className="format-badge">
          <FormatIcon format={resource.format} />
          {resource.format === "Text" ? "Article" : resource.format}
        </span>
        <span className="image-arrow">
          <ArrowUpRight size={19} />
        </span>
      </div>
      <div className="resource-info">
        <p className="eyebrow">{categoryFor(resource.categoryId).name}</p>
        <h3>{resource.title}</h3>
        <p className="card-description">{resource.description}</p>
        <div className="resource-meta">
          <span>
            <Clock3 size={13} />
            {resource.durationMinutes} min{" "}
            {resource.format === "Text"
              ? "read"
              : resource.format === "Audio"
                ? "listen"
                : "practice"}
          </span>
          <span className="meta-dot" />
          {resource.difficulty}
        </div>
      </div>
    </Link>
  );
}
export function CourseCard({
  course,
  completed,
  continueLabel = false,
}: {
  course: Course;
  completed?: number;
  continueLabel?: boolean;
}) {
  return (
    <Link href={`/courses/${course.slug}`} className="course-card">
      <img src={course.thumbnail} alt="" loading="lazy" />
      <div>
        <p className="eyebrow">{categoryFor(course.categoryId).name}</p>
        <h3>{course.title}</h3>
        <p className="card-description">{course.description}</p>
        <div className="resource-meta">
          <span>
            <BookOpen size={14} />
            {course.lessons.length} lessons
          </span>
          <span>
            <Clock3 size={14} />
            {course.estimatedDuration} min
          </span>
          <span>{course.difficulty}</span>
        </div>
        {completed !== undefined && (
          <>
            <div className="progress-caption">
              <span>
                {completed === 100 ? "Course completed" : "Your progress"}
              </span>
              <b>{completed}%</b>
            </div>
            <Progress value={completed} label={`${course.title} progress`} />
          </>
        )}
        <span className="course-action">
          {continueLabel
            ? completed === 100
              ? "Review course"
              : "Continue learning"
            : "Explore course"}
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
export function GoalCard({ goal }: { goal: Goal }) {
  const value = progressPercent(goal.currentValue, goal.targetValue);
  return (
    <Link href={`/goals/${goal.id}`} className="goal-card">
      <div className="card-top">
        <CategoryIcon category={categoryFor(goal.categoryId)} />
        {goal.status === "completed" ? (
          <span className="success-label">
            <Check size={14} /> Complete
          </span>
        ) : (
          <ArrowUpRight size={18} />
        )}
      </div>
      <p className="eyebrow">{categoryFor(goal.categoryId).name}</p>
      <h3>{goal.title}</h3>
      <div className="progress-caption">
        <span>
          {goal.kind === "completion"
            ? goal.status === "completed"
              ? "Completed"
              : "In progress"
            : `${goal.currentValue} / ${goal.targetValue} ${goal.unit}`}
        </span>
        <b>{value}%</b>
      </div>
      <Progress value={value} label={`${goal.title} progress`} />
    </Link>
  );
}
export function EmptyState({
  title,
  text,
  href,
  label,
  children,
}: {
  title: string;
  text: string;
  href?: string;
  label?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="empty-state">
      <BookOpen size={28} />
      <h3>{title}</h3>
      <p>{text}</p>
      {href && (
        <Link href={href} className="button button-dark">
          {label}
          <ArrowRight size={16} />
        </Link>
      )}
      {children}
    </div>
  );
}
export function Loading() {
  return (
    <div className="loading-state" role="status">
      <span className="loading-dot" /> Getting your space ready…
    </div>
  );
}
