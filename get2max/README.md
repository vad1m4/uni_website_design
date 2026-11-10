# get2max

A responsive self-development MVP built with Next.js App Router, React, TypeScript, Tailwind CSS, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

Open <http://localhost:3000>. On Windows PowerShell, use `npm.cmd` if script execution policy prevents running `npm`.

For a production preview:

```sh
npm run build
npm run start
```

Node 22.13 or newer is recommended for the current lint tooling. The application build is also verified with the installed Node 22.11. Tailwind is pinned to 4.1.18 to preserve compatibility with that environment.

## Implemented

- Public landing page, seven category pages, resource library, individual readers and players, five courses, goals, and a personalized dashboard.
- Fifteen original introductory resources: eleven articles, three spoken audio guides, and one video observation practice.
- Title and description search; category, format, and difficulty filters; newest and duration sorting; useful empty states.
- Native audio playback, seeking, volume, and elapsed/total time, plus playback speeds and complete transcripts. Native video playback, seeking, volume, fullscreen, captions, and an explicit explanation of the short nature loop.
- Course enrollment, ordered lessons, completion, and automatic resume at the next unfinished lesson.
- Numerical and completion goals; descriptions, categories, optional deadlines, editing, progress updates, completion, reopening, and confirmed deletion.
- Dashboard course progress, next lessons, goals, quick actions, and recommendations based on active categories.
- Persistent light/dark theme, mobile navigation, keyboard skip link, visible focus, semantic forms, reduced motion, storage feedback, and error/404 pages.

## Demo data and persistence

This is a **single-user browser demo**. Three sample goals appear on a first visit; courses begin unenrolled. Data is saved under `get2max-demo-v1` in localStorage, with theme preference in `get2max-theme`. Refreshes preserve changes; open tabs receive storage updates.

There are no accounts, authentication, payments, backend, or cross-device synchronization. Clearing site storage removes saved changes. Storage failures show an explanatory banner while allowing in-memory use. Invalid saved data falls back to a fresh demo without immediately overwriting the original record.

The typed models are in [models.ts](./src/lib/models.ts), seed content in [data.ts](./src/lib/data.ts), and state operations in [store.ts](./src/lib/store.ts). The rest of the application uses this state API, so a database-backed implementation can replace persistence later.

## Structure

- [src/app/](./src/app/) — App Router routes, metadata, layout, and responsive design system.
- [src/components/](./src/components/) — reusable cards, navigation, catalog, media/lesson views, goal forms, and dashboard.
- [src/lib/](./src/lib/) — typed data, transcripts, persistence validation, and application state.
- [public/](./public/) — local photographs, original WAV recordings, nature video, and captions.
- [tests/](./tests/) — persistence tests and browser user journeys.

All requested routes are implemented: `/`, `/dashboard`, `/categories`, `/categories/[slug]`, `/resources`, `/resources/[slug]`, `/courses`, `/courses/[slug]`, `/goals`, and `/goals/[id]`.

## Validation

```sh
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

The [Playwright configuration](./playwright.config.ts) runs desktop and mobile Chromium projects against the production preview. Build before running browser tests. It starts a server when needed and reuses an existing server at port 3000 for local work. The suite covers combined filters, sorting, enrollment and completion, refresh persistence, dashboard consistency, both goal types, validation, editing/deletion, media playback, transcripts, responsive overflow, mobile navigation, persistent themes, keyboard navigation, categories, 404s, and storage recovery. Test data is isolated in browser contexts.

`npm run format` formats source files. The production dependency audit is clean. The current ESLint/TypeScript ESLint dependency tree reports moderate development-only minimatch advisories; npm's proposed forced resolution downgrades the Next.js ESLint configuration. No incompatible forced downgrade has been applied.

## Content and media

The audio is original get2max educational narration synthesized with the Windows speech engine; the bundled WAV files and transcripts work on any supported browser and need no speech service. [generate-audio.ps1](./scripts/generate-audio.ps1) can regenerate them on Windows.

The silent flower clip is a locally bundled [MDN CC0 sample](https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4), used for an explicitly described two-minute observation exercise. It is a five-second loop, rather than a full instructional video. Audio guides are introductory sample content, not professional voice recordings.

Photographs are bundled locally from Unsplash. Original image identifiers: `photo-1464822759023-fed622ff2c3b` (mountains), `photo-1434494878577-86c23bcb06b9` (habits), `photo-1521737711867-e3b97375f902` (communication), `photo-1470252649378-9c29740c9fa8` (rest), `photo-1454165804606-c3d57bc86b40` (finance), `photo-1507842217343-583bb7270b66` (learning), `photo-1476480862126-209bfaa8edc8` (movement), and `photo-1608571423902-eed4a5ad8108` (personal care). The small decorative landing-page portraits use Pravatar.

Health information is general education with CDC and WHO references in the relevant articles. Financial content is general education. Recommendations use categories and do not claim AI personalization.
