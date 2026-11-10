"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container page-space empty-state">
      <h1>A small detour.</h1>
      <p>This page could not load. Give it another try.</p>
      <button className="button button-dark" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
