"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  X,
  Compass,
} from "lucide-react";
import { categories, courses, resources, categoryFor } from "@/lib/data";
import {
  CategoryCard,
  CategoryIcon,
  CourseCard,
  EmptyState,
  ResourceCard,
  SectionHeading,
} from "./ui";

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
export function Categories() {
  return (
    <div className="container page-space">
      <PageIntro
        eyebrow="FIND YOUR DIRECTION"
        title="Every side of a better you."
        description="Growth looks different for everyone. Explore a little, follow your curiosity, and start where you are."
      />
      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
        <div className="category-invitation">
          <Compass size={34} />
          <h3>Not sure where to start?</h3>
          <p>A small goal is a good first step.</p>
          <Link className="text-link" href="/goals">
            Create a goal
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
export function CategoryDetail({ slug }: { slug: string }) {
  const category = categories.find((c) => c.slug === slug);
  if (!category) return <Missing />;
  const relatedCourses = courses.filter((c) => c.categoryId === category.id);
  return (
    <div className="container page-space">
      <Link className="back-link" href="/categories">
        <ArrowLeft size={15} />
        All categories
      </Link>
      <div className="category-detail-heading">
        <CategoryIcon category={category} size={30} />
        <PageIntro
          eyebrow="EXPLORE YOUR POTENTIAL"
          title={category.name}
          description={category.description}
        />
      </div>
      <SectionHeading title="A little knowledge. A useful next step." />
      <div className="resource-grid">
        {resources
          .filter((r) => r.categoryId === category.id)
          .map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
      </div>
      {relatedCourses.length > 0 && (
        <section className="section">
          <SectionHeading
            title="Go a little deeper."
            description="A structured path to help you put ideas into practice."
          />
          <div className="course-grid">
            {relatedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
export function Library() {
  const params = useSearchParams();
  const initial = params.get("format") || "";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [format, setFormat] = useState(
    ["Text", "Audio", "Video"].includes(initial) ? initial : "",
  );
  const [difficulty, setDifficulty] = useState("");
  const [sort, setSort] = useState("newest");
  const filtered = resources
    .filter(
      (r) =>
        (!category || r.categoryId === category) &&
        (!format || r.format === format) &&
        (!difficulty || r.difficulty === difficulty) &&
        `${r.title} ${r.description}`
          .toLowerCase()
          .includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "shortest"
        ? a.durationMinutes - b.durationMinutes
        : sort === "longest"
          ? b.durationMinutes - a.durationMinutes
          : resources.indexOf(b) - resources.indexOf(a),
    );
  const reset = () => {
    setSearch("");
    setCategory("");
    setFormat("");
    setDifficulty("");
  };
  return (
    <div className="container page-space">
      <PageIntro
        eyebrow="THE LEARNING LIBRARY"
        title="Feed your curiosity."
        description="Practical knowledge for your next chapter. Read, listen, and watch—at your own pace."
      />
      <div className="library-toolbar">
        <label className="search-field">
          <Search size={19} />
          <input
            type="search"
            placeholder="What would you like to learn?"
            aria-label="Search resources"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <div className="filter-row">
          <span className="filter-label">
            <SlidersHorizontal size={16} />
            Filter by
          </span>
          <label className="sr-only" htmlFor="category-filter">
            Category
          </label>
          <select
            id="category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="format-filter">
            Format
          </label>
          <select
            id="format-filter"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="">All formats</option>
            <option>Text</option>
            <option>Audio</option>
            <option>Video</option>
          </select>
          <label className="sr-only" htmlFor="difficulty-filter">
            Difficulty
          </label>
          <select
            id="difficulty-filter"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">All levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>
      <div className="results-heading">
        <p aria-live="polite">
          {filtered.length} resource{filtered.length !== 1 ? "s" : ""} to
          explore
        </p>
        <label>
          Sort by{" "}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort resources"
          >
            <option value="newest">Newest added</option>
            <option value="shortest">Shortest first</option>
            <option value="longest">Longest first</option>
          </select>
        </label>
      </div>
      {filtered.length ? (
        <div className="resource-grid">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="A different direction?"
          text="No resources match these filters. Try another search or start fresh."
        >
          <button className="button button-outline" onClick={reset}>
            <X size={16} />
            Clear filters
          </button>
        </EmptyState>
      )}
    </div>
  );
}
export function CourseCatalog() {
  const [category, setCategory] = useState("");
  const filtered = courses.filter(
    (c) => !category || c.categoryId === category,
  );
  return (
    <div className="container page-space">
      <PageIntro
        eyebrow="ONE LESSON AT A TIME"
        title="A little structure. A lot of possibility."
        description="Thoughtfully organized courses to help you turn new knowledge into everyday progress."
      />
      <div className="catalog-tabs" aria-label="Course categories">
        <button
          className={!category ? "selected" : ""}
          aria-pressed={!category}
          onClick={() => setCategory("")}
        >
          All courses<span>{courses.length}</span>
        </button>
        {categories
          .filter((c) => courses.some((course) => course.categoryId === c.id))
          .map((c) => (
            <button
              className={category === c.id ? "selected" : ""}
              aria-pressed={category === c.id}
              key={c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
      </div>
      <div className="course-grid">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <div className="inline-note">
        <Compass size={21} />
        <div>
          <b>Your pace is the right pace.</b>
          <p>
            Enroll for free, take one lesson at a time, and pick up where you
            left off.
          </p>
        </div>
      </div>
    </div>
  );
}
export function Missing() {
  return (
    <div className="container page-space">
      <EmptyState
        title="This path doesn’t lead anywhere yet."
        text="Let’s find a useful place to continue your journey."
        href="/categories"
        label="Explore categories"
      />
    </div>
  );
}
export function CategoryLabel({ id }: { id: string }) {
  return <span className="eyebrow">{categoryFor(id).name}</span>;
}
