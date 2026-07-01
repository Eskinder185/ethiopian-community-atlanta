# Ethiopian Community Association in Atlanta (ECAA)

Modern, mobile-first community website for the Ethiopian Community Association in Atlanta. Built with React, Vite, Tailwind CSS, and JSON-based content so non-technical editors can update most content without touching code.

## Project overview

- **Organization:** Ethiopian Community Association in Atlanta (ECAA)
- **Tagline:** Building intergenerational connections and strengthening community resilience.
- **Stack:** React 19, Vite 8, Tailwind CSS 4, React Router
- **Content model:** JSON files in `src/data/`
- **Membership form:** [Jotform registration](https://form.jotform.com/211111215669043) (opens in a new tab; not embedded by default)

Pages: Home, About ECAA, Programs & Services, Membership, Events & News, Leadership, Documents, Media, Support ECAA, Contact.

## Setup commands

```bash
npm install
```

## Dev command

```bash
npm run dev
```

Open the local URL shown in the terminal (typically `http://localhost:5173`).

## Build command

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment recommendation

1. Run `npm run build` — output goes to `dist/`.
2. Deploy `dist/` to a static host such as **Netlify**, **Vercel**, **Cloudflare Pages**, or **GitHub Pages**.
3. Configure the host for **single-page app (SPA) routing** so all paths fall back to `index.html`.
4. Use a custom domain when ready (e.g. `ecaa.org` or your chosen domain).
5. Do **not** deploy until official contact details, leadership, events, documents, and donation links have been reviewed (see Remaining TODOs below).

## Folder structure

```
src/
├── assets/              Static images and files
├── components/
│   ├── cards/           Reusable cards (events, programs, team, etc.)
│   ├── layout/          Header, Footer, PageHero, Layout
│   ├── sections/        Page sections and previews
│   └── ui/              Buttons, badges, accordion, embeds
├── data/                JSON content (edit these files)
├── pages/               One file per route
├── utils/               Content helpers (published filters, URL checks)
├── App.jsx              Routes
├── main.jsx             App entry
└── index.css            ECAA design tokens and utilities
```

## How to update JSON content

1. Open the relevant file in `src/data/`.
2. Replace `TODO:` placeholder text with verified official content.
3. Set `"published": true` on items that should appear on the site.
4. Save and refresh the browser (`npm run dev` hot-reloads automatically).

**Important:** Items with `TODO` in required fields (title, name, URL, etc.) are automatically hidden even if `published` is true.

Key files:

| File | Purpose |
|------|---------|
| `siteInfo.json` | Organization name, tagline, membership form URL |
| `navigation.json` | Main navigation labels and paths |
| `contact.json` | Address, phone, email, hours, social links |
| `programs.json` | Program categories and individual programs |
| `events.json` | Upcoming, announcements, news, past events |
| `teamMembers.json` | Leadership groups and member profiles |
| `documents.json` | Document categories and files |
| `videos.json` / `images.json` | Media library |
| `forms.json` | External forms (membership, etc.) |
| `faq.json` | FAQ questions and answers |
| `membership.json` | Membership page copy |
| `about.json` / `support.json` | Page-specific content |

## How to add a new event

Edit `src/data/events.json`. Add an object to the correct array (`upcoming`, `announcements`, `communityNews`, or `past`):

```json
{
  "id": "community-picnic-2026",
  "title": "Community Picnic",
  "date": "2026-08-15",
  "time": "2:00 PM",
  "location": "Verified location",
  "summary": "Short summary for cards.",
  "description": "Optional longer description.",
  "registrationUrl": "https://example.com/register",
  "published": true
}
```

Use real dates and details only. Leave `"published": false` until verified.

## How to add a new document

Edit `src/data/documents.json`:

```json
{
  "id": "bylaws-2026",
  "title": "ECAA Bylaws",
  "categoryId": "bylaws",
  "description": "Short description.",
  "fileUrl": "https://your-host.com/files/bylaws.pdf",
  "fileType": "pdf",
  "date": "2026-01-01",
  "published": true
}
```

`categoryId` must match a category: `bylaws`, `election-documents`, `meeting-notices`, or `public-reports`.

## How to add a new YouTube video

Edit `src/data/videos.json`:

```json
{
  "id": "annual-gathering-2025",
  "title": "Annual Community Gathering",
  "description": "Short description.",
  "embedUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
  "provider": "youtube",
  "date": "2025-12-01",
  "published": true
}
```

You may use a standard YouTube watch URL or an embed URL (`https://www.youtube.com/embed/VIDEO_ID`). The site converts watch URLs automatically.

## How to update forms

Edit `src/data/forms.json`. The membership form entry:

```json
{
  "id": "membership-registration",
  "title": "ECAA Registration Form",
  "url": "https://form.jotform.com/211111215669043",
  "provider": "Jotform",
  "category": "membership",
  "embedAllowed": true,
  "published": true
}
```

Also update `siteInfo.json` → `membershipFormUrl` if the URL changes. The Membership page uses a **button-first** design (form opens in a new tab).

## Remaining TODOs

Content still marked `TODO` in JSON files, including:

- Mission, vision, values, and full organization history
- Program descriptions and sub-programs
- Verified events, announcements, and news
- Leadership names, roles, photos, and bios
- Downloadable documents and file URLs
- Photos and YouTube videos
- Contact email, phone, street address, office hours, map embed
- Donation, fundraising, sponsorship, and volunteer URLs
- Membership FAQ official answers
- Social media URLs
- SEO meta description in `siteInfo.json`

## What needs human review before launch

- [ ] All `TODO` placeholders replaced with **verified official** content
- [ ] Contact details confirmed (address, phone, email, hours)
- [ ] Leadership profiles approved by ECAA board/communications lead
- [ ] Event dates and locations verified
- [ ] Document links tested (PDFs open correctly)
- [ ] Donation and volunteer links confirmed (do not invent URLs)
- [ ] Membership form tested end-to-end on Jotform
- [ ] EDIR legal/disclosure language reviewed by appropriate officials
- [ ] Accessibility review with real users (including older adults)
- [ ] Mobile testing on iOS and Android devices
- [ ] Custom domain, SSL, and analytics (if desired)
- [ ] Privacy policy / terms if collecting member data online

## Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run Oxlint |
