# Reuben Korsi Amuzu (Amson) · Portfolio

Personal portfolio of Reuben Korsi Amuzu, Full-Stack Developer & Applied AI Engineer.
A single-page site with a neon "sci-fi HUD" look and an AI terminal, "Ask Amson", that answers questions about my work.

Live site: https://reubenkorsiamuzu.tech

## Built with

- [Next.js 15](https://nextjs.org/) (App Router) and React 19
- TypeScript
- [Tailwind CSS 3](https://tailwindcss.com/) plus plain CSS for the HUD effects
- No animation library. All motion is CSS keyframes and one small scroll observer.
- [Claude API](https://platform.claude.com/docs) through the official `@anthropic-ai/sdk` for the Ask Amson terminal
- [Vitest](https://vitest.dev/) for tests

## Run it

You need Node.js 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

The site runs without any setup. To switch on AI answers in the Ask Amson terminal, see [Ask Amson](#ask-amson) below.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the production site. Fails if there is a type error. |
| `npm run start` | Serves the production build locally. |
| `npm run lint` | Checks the code with ESLint. |
| `npm test` | Runs the tests for the Ask Amson guardrails. |

## Where things are

```
src/
  app/
    layout.tsx           fonts, SEO metadata, JSON-LD
    page.tsx             the order of the sections
    globals.css          colours, effects and animations
    opengraph-image.tsx  the share image, drawn from code
    sitemap.ts, robots.ts, icon.svg
    api/ask/route.ts     the server route the AI terminal talks to
  components/            one file per section (Header, Hero, About, ...)
    ask/                 the Ask Amson terminal, drawer and floating button
  data/
    projects.ts          every project on the site
    profile.ts           name, bio, email, socials, stack, leadership, availability
  lib/ask/               the assistant: prompt, guardrails, slash commands, tests
public/
  projects/              project screenshots
  images/                portrait
```

## Edit your projects

Everything is in [`src/data/projects.ts`](src/data/projects.ts). You never need to touch a component.

**Add a project:** copy one `{ ... }` block, paste it where you want it to appear, and change the values. The order in the file is the order on the site.

**Remove a project:** delete its block.

| Field | What to put |
| --- | --- |
| `id` | Short unique name, lowercase with dashes, e.g. `"campus-print-platform"` |
| `title` | The project name |
| `summary` | One line. Shown on every card. |
| `description` | Optional. Two or three sentences, shown only on featured cards. |
| `tags` | The stack. The first three show on the card as `NEXT.JS · CLAUDE API`. |
| `category` | One of `"AI"`, `"Fintech"`, `"Full-Stack"`, `"Tools"`. Drives the filter chips. |
| `status` | One of `"In development"`, `"Prototype"`, `"Live"`, `"Completed"` |
| `featured` | `true` to give it a large card at the top. Leave out otherwise. |
| `github` | Full URL, or `null` to show "Repo pending" |
| `live` | Full URL, or `null` to show "Demo pending" |
| `image` | Path inside `public/`, e.g. `"/projects/my-app.png"` |
| `imageAlt` | One sentence describing the image, for screen readers |

**Add a screenshot:** save a 16:9 image (1600 x 900 works well) into `public/projects/`, then point `image` at it. The same images fill the scrolling wall in the hero.

**Add a category:** add its name to the `CATEGORIES` list at the top of the file. A new filter chip appears on its own.

If you mistype a category or status, `npm run build` stops and tells you which line is wrong.

Lines marked `// TODO` are placeholders that still need real values.

## Edit your details

Name, role, intro, bio, email, social links, the stack grid, leadership, certifications and availability are in [`src/data/profile.ts`](src/data/profile.ts).

The site and the Ask Amson assistant both read this file, so one edit updates both.

The "> NOW BUILDING" label in the hero is the `nowBuilding` value in that file.

## Change the colours

All colours are at the top of [`src/app/globals.css`](src/app/globals.css), inside `:root`:

```css
:root {
  --bg: #0c0e11;        /* page background */
  --surface-1: #111317; /* cards */
  --text: #cdd2d7;      /* body text */
  --heading: #eef0f2;   /* headings */
  --cyan: #00f0ff;      /* main accent */
  --magenta: #ff2bd6;   /* second accent */
  --lime: #b6ff3b;
  --violet: #a46bff;
}
```

Change a value and save. Every glow, border and button that uses it updates with it.

Two places hold their own copy of the colours because they are drawn as images: the share image in `src/app/opengraph-image.tsx` and the favicon in `src/app/icon.svg`. Update those too if you change cyan or magenta.

Cards cycle through cyan, magenta, lime and violet in order. To change that order, edit `ACCENTS` at the bottom of `src/data/projects.ts`.

## Ask Amson

A terminal on the home page, and a floating **> ASK AMSON** button, where visitors ask about your work and get answers from the Claude API.

### How it works

1. The visitor types a question. Anything starting with `/` (`/help`, `/projects`, `/stack`, `/contact`, `/clear`) is answered in the browser and never leaves it.
2. A real question goes to `POST /api/ask`, which runs on the server.
3. The server checks the input, applies the rate limit, runs a prompt-injection check, then calls Claude and streams the answer back.

If there is no API key, or the Claude API is down, the terminal says so, keeps answering slash commands and points people to the contact section. The rest of the site is unaffected.

### Environment variables

| Variable | Needed? | What it does |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Yes, for AI answers | Your Claude API key. Create one at https://platform.claude.com/settings/keys |
| `ANTHROPIC_MODEL` | No | Which model answers. Defaults to `claude-haiku-5-5`. |
| `UPSTASH_REDIS_REST_URL` | No | With the token below, turns on shared rate limiting. |
| `UPSTASH_REDIS_REST_TOKEN` | No | See above. |

The key is read only on the server, inside `src/lib/ask/handler.ts`. It is never sent to the browser. Do not rename it with a `NEXT_PUBLIC_` prefix: that prefix is what makes Next.js expose a value to visitors.

**On your computer:** copy the template, then paste your key into the new file.

```bash
cp .env.example .env.local
```

Restart `npm run dev` after editing `.env.local`. The file is ignored by git.

**On Vercel:** open the project, go to **Settings → Environment Variables**, add `ANTHROPIC_API_KEY` for Production and Preview, then redeploy. Add `ANTHROPIC_MODEL` or the Upstash variables the same way if you want them.

### What the assistant knows

Its knowledge is built from two files, the same ones the site uses:

- [`src/data/profile.ts`](src/data/profile.ts): bio, stack, leadership, certifications, contact, availability
- [`src/data/projects.ts`](src/data/projects.ts): every project

Edit either file and the assistant knows the new facts after the next deploy. There is nothing else to update.

Two fields in `profile.ts` exist mainly for the assistant:

- `availability`: what you are open to. While it is empty the assistant says it has no availability details and suggests contacting you, so it never guesses.
- `extraFacts`: short sentences it may share that are not shown elsewhere on the site.

Its rules (answer only about you, third person, 2 to 5 sentences, never invent facts, decline off-topic requests) are at the top of [`src/lib/ask/knowledge.ts`](src/lib/ask/knowledge.ts). The suggested questions and slash commands are in [`src/lib/ask/commands.ts`](src/lib/ask/commands.ts).

### Change the model

Set `ANTHROPIC_MODEL` to another model ID, for example `claude-sonnet-5-5`, and redeploy. No code change is needed. Larger models cost more per answer. The reply length cap (`MAX_OUTPUT_TOKENS`, 400) is in [`src/lib/ask/config.ts`](src/lib/ask/config.ts).

### Guardrails

| Guardrail | Where | What it does |
| --- | --- | --- |
| Input validation | `validation.ts` | Questions up to 500 characters, up to 10 earlier messages, checked with zod |
| Rate limit | `rate-limit.ts` | 10 requests a minute and 50 a day per visitor |
| Injection check | `injection.ts` | Catches common "ignore your instructions" phrasings and answers with a fixed reply, without calling the API |
| System prompt | `knowledge.ts` | Tells the model to treat visitor text as questions, never as instructions |

All four live in `src/lib/ask/`. The limits themselves are in `config.ts`.

**Rate limiting has two modes.** With no Upstash variables set, counts are kept in the server's memory. That is fine locally, but on Vercel each server instance keeps its own count and forgets it when it restarts, so the limit is looser than the numbers suggest. For a limit that holds, create a free Redis database at https://console.upstash.com and set the two `UPSTASH_REDIS_REST_*` variables. The Vercel KV names (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) work too.

**Privacy.** Nothing visitors type is logged or stored by this site. Visitor IP addresses are hashed before they are used for rate limiting. Questions are sent to Anthropic to be answered, under Anthropic's own data policy.

**Cost control.** Set a monthly spend limit for your key in the Claude Console. The rate limit slows abuse; the spend limit is what caps the bill.

### Tests

```bash
npm test
```

The tests cover input validation, the rate limiter, the injection check, the prompt builder and the server route. They use a stand-in for the Claude API, so they need no key and cost nothing.

## Change the fonts

Fonts are set near the top of `src/app/layout.tsx`: Orbitron for headings, Exo 2 for body text and JetBrains Mono for labels. They are downloaded at build time and served from the site itself, so no request goes to Google when someone visits.

## Motion and accessibility

- Visitors who turn on "reduce motion" on their device get no animation: no boot intro, no scrolling wall, no hover lifts.
- The hero wall pauses on hover and has a "Pause motion" button for keyboard and touch users.
- The boot intro shows once per browser, lasts about a second, and can be skipped with any key or tap. To see it again, clear the site's data for `amson-boot` in your browser.

## Deploy

The site is a standard Next.js app with no extra deploy config, and it includes Vercel Analytics, so Vercel is the simplest host. With the repo connected to Vercel, a push to `main` goes live and each pull request gets its own preview link.

## Contact

Reuben Korsi Amuzu · reubenamuzu23@gmail.com · https://github.com/reubenamuzu
