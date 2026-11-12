# Reuben Korsi Amuzu (Amson) · Portfolio

Personal portfolio of Reuben Korsi Amuzu, Full-Stack Developer & Applied AI Engineer.
A single-page site with a neon "sci-fi HUD" look.

Live site: https://reubenkorsiamuzu.tech

## Built with

- [Next.js 15](https://nextjs.org/) (App Router) and React 19
- TypeScript
- [Tailwind CSS 3](https://tailwindcss.com/) plus plain CSS for the HUD effects
- No animation library. All motion is CSS keyframes and one small scroll observer.

## Run it

You need Node.js 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the production site. Fails if there is a type error. |
| `npm run start` | Serves the production build locally. |
| `npm run lint` | Checks the code with ESLint. |

## Where things are

```
src/
  app/
    layout.tsx           fonts, SEO metadata, JSON-LD
    page.tsx             the order of the sections
    globals.css          colours, effects and animations
    opengraph-image.tsx  the share image, drawn from code
    sitemap.ts, robots.ts, icon.svg
  components/            one file per section (Header, Hero, About, ...)
  data/
    projects.ts          every project on the site
    site.ts              name, email, socials, stack, leadership
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

Name, role, intro, email, social links, the stack grid, leadership and certifications are in [`src/data/site.ts`](src/data/site.ts).

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
