# Ethiopian Community Association in Atlanta (ECAA)

Modern, mobile-first community website for the Ethiopian Community Association in Atlanta. Built with React, Vite, Tailwind CSS, and JSON-based content so non-technical editors can update most content without touching code.

## Project overview

- **Organization:** Ethiopian Community Association in Atlanta (ECAA)
- **Tagline:** Building intergenerational connections and strengthening community resilience.
- **Stack:** React 19, Vite 8, Tailwind CSS 4, React Router
- **Content model:** CMS-editable JSON in `src/content/` (edited via Decap CMS at `/admin`)
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

### Decap CMS local backend (port 8081)

`npm run dev` starts **one** Vite dev server and **one** Decap local backend (`decap-server` on port **8081**). Do not run `npm run dev` in multiple terminals at the same time, and do not run `npm run cms` while `npm run dev` is already running.

If Decap CMS fails with **`EADDRINUSE: address already in use :::8081`**:

1. Close duplicate terminals running `npm run dev` or `npm run cms`.
2. Or find and stop the process holding port 8081:

```powershell
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

Replace `<PID>` with the process ID from the last column of `netstat` output.

Use `npm run dev:site` if you only need the website without the CMS backend.

## Admin CMS Editing

Non-technical ECAA team members can update selected website content through **Decap CMS** at `/admin/` without editing React code.

### 1. Admin page location

|           |                                                                |
| --------- | -------------------------------------------------------------- |
| **URL**   | `/admin/` (during development: `http://localhost:5173/admin/`) |
| **Files** | `public/admin/index.html`, `public/admin/config.yml`           |

Run `npm run dev`, then open `/admin/` or click **Admin** in the site navbar.

**Important:** The CMS interface loads at `/admin/`, but **real login/authentication still needs to be configured** before non-technical team members can save changes in production. Do not give editors direct code access unless necessary. Review content changes before publishing.

### 2. First CMS version — three areas only

| CMS collection    | Content file                   | Used on                     |
| ----------------- | ------------------------------ | --------------------------- |
| **Home Page**     | `src/content/homepage.json`    | Home page featured sections |
| **Events & News** | `src/content/events.json`      | Events & News page          |
| **Leadership**    | `src/content/teamMembers.json` | Leadership page             |

Other pages (Programs, Documents, Membership, Contact, Media, etc.) are **not** editable in the CMS yet.

### 3. Homepage content (`homepage.json`)

The Home page uses **`src/content/homepage.json` only** for its curated sections. It does **not** automatically show every event, photo, or program from other files.

Editors can update:

- **Hero** — title, description, background image, buttons
- **Upcoming Events & Community** — up to 3 featured cards
- **Community Moments** — featured photos, GIFs, or YouTube items
- **Book a Hall** — copy, good-for list, buttons, image
- **Featured Programs & Services** — up to 4 curated program cards

Use **Show this section?** or **Show this item?** to hide content without deleting it.

### 4. Uploaded images and GIFs

Uploads are saved to `public/uploads/` and served at `/uploads/...`. You can also reference existing files in `public/images/` (for example `/images/home-hero-community-atlanta.jpg`).

### 5. How to add a homepage feature

1. Open `/admin/` → **Home Page**.
2. Open the section you want (for example **Upcoming Events & Community**).
3. Click **Add** under **Featured event cards** (or media items / program cards).
4. Fill in title, description, image, and button link.
5. Set **Show this item?** to `true`.
6. Click **Publish**.

**Tip:** Do not add every event to the Home page — add only featured items visitors should see first.

### 6. How to add an event

1. Open `/admin/` → **Events & News**.
2. Add an item under the correct list:
   - **Upcoming events** (status: upcoming — requires a date)
   - **Announcements** (status: announcement)
   - **Community news** (status: community-news)
   - **Past events** (status: past)
3. Fill in title, description, date (if known), and links.
4. Set **Show this item?** to `true` only when verified.
5. Click **Publish**.

To feature an event on the **Home page**, also add it under **Home Page** → **Featured event cards**.

### 7. How to add a leadership member

1. Open `/admin/` → **Leadership**.
2. Open the correct **Committee** group (or add a new committee).
3. Click **Add** under **Leadership members**.
4. Fill in name, role, bio, and photo. Use **TODO** in notes if details are not confirmed.
5. Set **Show on leadership page?** to `true`.
6. Click **Publish**.

Do not invent names, titles, or roles.

### 8. What still needs setup before real team login

Local editing works without login when you run `npm run dev` (`decap-server` + `local_backend`).

Before production editors can save online:

- [ ] Connect the GitHub repository to your hosting provider (Netlify recommended)
- [ ] Configure **git-gateway** in `public/admin/config.yml`
- [ ] Set up **authentication** (Netlify Identity + Git Gateway, or GitHub OAuth)
- [ ] Replace `site_url`, `display_url`, and `branch` placeholders
- [ ] Remove or comment out `local_backend` for production deploys
- [ ] Invite ECAA editors with appropriate permissions
- [ ] Test edit → publish → deploy workflow

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
├── content/             CMS-editable JSON content (edit via /admin)
├── data/                Structural config (navigation, page metadata)
├── pages/               One file per route
├── utils/               Content helpers (published filters, URL checks)
├── App.jsx              Routes
├── main.jsx             App entry
└── index.css            ECAA design tokens and utilities
```

## How to update content manually (developers)

Editors should use `/admin` after authentication is configured. Developers can also edit JSON directly:

1. Open the relevant file in `src/content/` (or `src/data/navigation.json` for navigation).
2. Replace `TODO:` placeholder text with verified official content.
3. Set `"published": true` on items that should appear on the site.
4. Save and refresh the browser (`npm run dev` hot-reloads automatically).

**Important:** Items with `TODO` in required fields (title, name, URL, etc.) are automatically hidden even if `published` is true.

Key files:

| File                                                  | Purpose                                         |
| ----------------------------------------------------- | ----------------------------------------------- |
| `src/content/siteInfo.json`                           | Organization name, tagline, membership form URL |
| `src/data/navigation.json`                            | Main navigation labels and paths                |
| `src/content/contact.json`                            | Address, phone, email, hours, social links      |
| `src/content/programs.json`                           | Program categories and individual programs      |
| `src/content/events.json`                             | Upcoming, announcements, news, past events      |
| `src/content/teamMembers.json`                        | Leadership groups and member profiles           |
| `src/content/documents.json`                          | Document categories and files                   |
| `src/content/videos.json` / `src/content/images.json` | Media library                                   |
| `src/content/forms.json`                              | External forms (membership, etc.)               |
| `src/content/faq.json`                                | FAQ questions and answers                       |
| `src/content/membership.json`                         | Membership page copy                            |
| `src/data/about.json` / `src/data/support.json`       | Page-specific content                           |

## How to add a new event

Edit `src/content/events.json` or use `/admin` → **Events & News**. Add an object to the correct array (`upcoming`, `announcements`, `communityNews`, or `past`):

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

Edit `src/content/documents.json` or use `/admin` → **Documents**:

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

Edit `src/content/videos.json` or use `/admin` → **Videos**:

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

Edit `src/content/forms.json` or use `/admin` → **Forms**. The membership form entry:

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

Also update `src/content/siteInfo.json` → `membershipFormUrl` if the URL changes. The Membership page uses a **button-first** design (form opens in a new tab).

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

| Command            | Description                                        |
| ------------------ | -------------------------------------------------- |
| `npm install`      | Install dependencies                               |
| `npm run dev`      | Start Vite + Decap local backend (CMS at `/admin`) |
| `npm run dev:site` | Start Vite only (no CMS backend)                   |
| `npm run cms`      | Start Decap local backend only (port 8081)         |
| `npm run build`    | Production build to `dist/`                        |
| `npm run preview`  | Preview production build                           |
| `npm run lint`     | Run Oxlint                                         |
