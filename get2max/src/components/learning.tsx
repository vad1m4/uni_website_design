"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  BookOpen,
  LockKeyhole,
  Volume2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { courses, resources, categoryFor } from "@/lib/data";
import { useDemo, enroll, completeLesson } from "@/lib/store";
import type { Resource } from "@/lib/models";
import { progressPercent } from "@/lib/persistence.mjs";
import { FormatIcon, Progress, ResourceCard, Loading } from "./ui";
import { Missing } from "./library";
import transcripts from "@/lib/transcripts.json";

export function ResourceBody({ resource }: { resource: Resource }) {
  const [mediaError, setMediaError] = useState(false);
  return (
    <>
      {resource.mediaUrl && (
        <div className={`media-player ${resource.format.toLowerCase()}`}>
          {resource.format === "Audio" ? (
            <>
              <div className="audio-art">
                <Volume2 size={32} />
                <div>
                  <span className="eyebrow">TAKE A MOMENT. TUNE IN.</span>
                  <h3>{resource.title}</h3>
                </div>
              </div>
              <audio
                controls
                preload="metadata"
                src={resource.mediaUrl}
                onError={() => setMediaError(true)}
                aria-label={resource.title}
              />
              <label className="playback-speed">
                Playback speed
                <select
                  defaultValue="1"
                  onChange={(e) => {
                    const player = e.currentTarget
                      .closest(".media-player")
                      ?.querySelector("audio");
                    if (player) player.playbackRate = Number(e.target.value);
                  }}
                >
                  <option value="0.75">0.75×</option>
                  <option value="1">1×</option>
                  <option value="1.25">1.25×</option>
                  <option value="1.5">1.5×</option>
                  <option value="2">2×</option>
                </select>
              </label>
            </>
          ) : (
            <video
              controls
              loop
              playsInline
              preload="metadata"
              src={resource.mediaUrl}
              onError={() => setMediaError(true)}
              aria-label={resource.title}
            >
              <track
                kind="captions"
                src="/media/nature-captions.vtt"
                srcLang="en"
                label="English descriptions"
                default
              />
            </video>
          )}
          {mediaError && (
            <p className="error-message" role="alert">
              This recording could not load. Try refreshing or use the written
              guide below.
            </p>
          )}
          <p className="media-credit">{resource.mediaCredit}</p>
          {resource.format === "Video" && (
            <p className="media-credit">
              5-second nature loop · 2-minute observation practice
            </p>
          )}
          {resource.format === "Audio" && (
            <details className="audio-transcript">
              <summary>Read the full audio transcript</summary>
              <p>{(transcripts as Record<string, string>)[resource.id]}</p>
            </details>
          )}
        </div>
      )}
      <article className="article-content">
        {resource.format === "Audio" && (
          <p className="article-kicker">YOUR WRITTEN GUIDE</p>
        )}
        {resource.content.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {s.points && (
              <ul>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <div className="takeaway">
          <span>PUT IT INTO PRACTICE</span>
          <p>Choose one idea from this lesson. Give it a place in your day.</p>
          <Link href="/goals?new=1" className="text-link">
            Make it a personal goal
            <ArrowRight size={16} />
          </Link>
        </div>
      </article>
    </>
  );
}
export function ResourceDetail({ slug }: { slug: string }) {
  const resource = resources.find((r) => r.slug === slug);
  if (!resource) return <Missing />;
  const related = courses.filter((c) =>
    c.lessons.some((l) => l.resourceId === resource.id),
  );
  return (
    <div className="container page-space">
      <Link className="back-link" href="/resources">
        <ArrowLeft size={15} />
        The learning library
      </Link>
      <div className="reading-layout">
        <div>
          <header className="article-header">
            <Link
              className="eyebrow"
              href={`/categories/${categoryFor(resource.categoryId).slug}`}
            >
              {categoryFor(resource.categoryId).name}
            </Link>
            <h1>{resource.title}</h1>
            <p>{resource.description}</p>
            <div className="resource-meta">
              <span>
                <FormatIcon format={resource.format} />
                {resource.format === "Text" ? "Article" : resource.format}
              </span>
              <span>
                <Clock3 size={14} />
                {resource.durationMinutes} min
              </span>
              <span>{resource.difficulty}</span>
            </div>
          </header>
          {resource.format === "Text" && (
            <img className="article-cover" src={resource.thumbnail} alt="" />
          )}
          <ResourceBody resource={resource} />
        </div>
        <aside className="reading-sidebar">
          <p className="eyebrow">YOUR NEXT STEP</p>
          <h3>
            A little learning.
            <br />A lasting difference.
          </h3>
          <p>Take your time, make a few notes, and choose one thing to try.</p>
          <Link className="button button-dark" href="/goals?new=1">
            Set a personal goal
            <ArrowRight size={16} />
          </Link>
          {related.length > 0 && (
            <div className="related-courses">
              <p className="eyebrow">PART OF A BIGGER PICTURE</p>
              {related.map((c) => (
                <Link key={c.id} href={`/courses/${c.slug}`}>
                  <BookOpen size={18} />
                  <span>{c.title}</span>
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>
      <section className="section">
        <h2>Keep your curiosity going.</h2>
        <div className="resource-grid">
          {resources
            .filter(
              (r) =>
                r.categoryId === resource.categoryId && r.id !== resource.id,
            )
            .slice(0, 3)
            .map((r) => (
              <ResourceCard resource={r} key={r.id} />
            ))}
        </div>
      </section>
    </div>
  );
}
export function CourseDetail({ slug }: { slug: string }) {
  const course = courses.find((c) => c.slug === slug);
  const { data, ready } = useDemo();
  const params = useSearchParams();
  const [chosen, setChosen] = useState<string | null>(params.get("lesson"));
  const [notice, setNotice] = useState("");
  if (!course) return <Missing />;
  if (!ready) return <Loading />;
  const enrollment = data.progress.find((p) => p.courseId === course.id);
  const completed = enrollment?.completedLessonIds || [];
  const next =
    course.lessons.find((l) => !completed.includes(l.id)) || course.lessons[0];
  const lesson = course.lessons.find((l) => l.id === chosen) || next;
  const resource = resources.find((r) => r.id === lesson.resourceId)!;
  const percent = progressPercent(completed.length, course.lessons.length);
  const markComplete = () => {
    completeLesson(course.id, lesson.id);
    const following = course.lessons.find(
      (l) => l.id !== lesson.id && !completed.includes(l.id),
    );
    setNotice(
      following
        ? "Lesson completed. Your next lesson is ready."
        : "Course complete. Take a moment to appreciate your progress.",
    );
    if (following) setChosen(following.id);
  };
  return (
    <div className="container page-space">
      <Link className="back-link" href="/courses">
        <ArrowLeft size={15} />
        All courses
      </Link>
      <div className="course-detail-hero">
        <div>
          <p className="eyebrow">{categoryFor(course.categoryId).name}</p>
          <h1>{course.title}</h1>
          <p className="muted">{course.description}</p>
          <div className="resource-meta">
            <span>
              <BookOpen size={15} />
              {course.lessons.length} lessons
            </span>
            <span>
              <Clock3 size={15} />
              {course.estimatedDuration} min
            </span>
            <span>{course.difficulty}</span>
          </div>
          {!enrollment ? (
            <button
              className="button button-dark"
              onClick={() => {
                enroll(course.id);
                setNotice("You’re enrolled. Your first lesson is ready.");
              }}
            >
              Enroll & start learning
              <ArrowRight size={17} />
            </button>
          ) : (
            <div className="enrolled-label">
              <CheckCircle2 size={18} />
              {percent === 100
                ? "You completed this course"
                : "Enrolled · Make progress at your pace"}
            </div>
          )}
        </div>
        <img src={course.thumbnail} alt="" />
      </div>
      <p className="save-notice" aria-live="polite">
        {notice}
      </p>
      <div className="lesson-layout">
        <aside className="lesson-sidebar">
          <div className="progress-caption">
            <b>Your learning path</b>
            <span>{percent}%</span>
          </div>
          <Progress value={percent} label="Course completion" />
          <p className="muted small">
            {completed.length} of {course.lessons.length} lessons completed
          </p>
          <ol className="lesson-list">
            {course.lessons.map((l, i) => (
              <li key={l.id}>
                <button
                  className={l.id === lesson.id ? "selected" : ""}
                  aria-current={l.id === lesson.id ? "step" : undefined}
                  onClick={() => {
                    setChosen(l.id);
                    setNotice("");
                  }}
                >
                  <span
                    className={`lesson-number ${completed.includes(l.id) ? "is-done" : ""}`}
                  >
                    {completed.includes(l.id) ? (
                      <Check size={15} />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  <span>
                    {l.title}
                    <small>
                      {resources.find((r) => r.id === l.resourceId)?.format} ·{" "}
                      {
                        resources.find((r) => r.id === l.resourceId)
                          ?.durationMinutes
                      }{" "}
                      min
                    </small>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className="demo-explanation">
            <LockKeyhole size={14} />
            Your progress is saved in this browser.
          </p>
        </aside>
        <div className="lesson-view" key={lesson.id}>
          <p className="eyebrow">
            LESSON {lesson.order} OF {course.lessons.length}
          </p>
          <h2>{lesson.title}</h2>
          <p className="muted">{resource.description}</p>
          <ResourceBody resource={resource} />
          <div className="lesson-completion">
            {!enrollment ? (
              <button
                className="button button-dark"
                onClick={() => enroll(course.id)}
              >
                Enroll to save your progress
                <ArrowRight size={16} />
              </button>
            ) : completed.includes(lesson.id) ? (
              <span className="success-label">
                <CheckCircle2 size={19} />
                Lesson completed
              </span>
            ) : (
              <button className="button button-dark" onClick={markComplete}>
                Mark lesson complete
                <Check size={18} />
              </button>
            )}
            {enrollment && percent === 100 && (
              <Link href="/dashboard" className="text-link">
                Back to your dashboard
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
