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

## Content Management System

Non-technical ECAA team members can update website content through **Decap CMS** without editing React components.

### 1. Admin page location

| | |
|---|---|
| **URL** | `/admin` (during development: `http://localhost:5173/admin/`) |
| **Files** | `public/admin/index.html`, `public/admin/config.yml` |

Run `npm run dev`, then open `/admin`. The site navbar also has an **Admin** link.

### 2. What editors can update

| CMS collection | Content file | Used on |
|----------------|--------------|---------|
| Site Information | `src/content/siteInfo.json` | Site-wide name, tagline, form URLs, SEO |
| Home Page | `src/content/homepage.json` | Home page only (curated featured sections) |
| Events & News | `src/content/events.json` | Events page |
| Media — Videos | `src/content/videos.json` | Media page |
| Media — Photos | `src/content/images.json` | Media page, section images |
| Programs & Services | `src/content/programs.json` | Programs page |
| Membership | `src/content/membership.json` | Membership page |
| Leadership | `src/content/teamMembers.json` | Leadership page |
| Documents | `src/content/documents.json` | Documents page |
| Contact | `src/content/contact.json` | Contact page, footer |
| FAQs | `src/content/faq.json` | Membership FAQ |
| Forms | `src/content/forms.json` | External forms (membership, hall booking, etc.) |
| Navigation | `src/data/navigation.json` | Menu and footer link labels |

Structural page copy for About and Support remains in `src/data/` for now.

### 3. Home page is controlled separately

The Home page reads **`src/content/homepage.json` only**. It does **not** automatically show everything from `events.json`, `videos.json`, `images.json`, or `programs.json`.

Editors choose exactly what appears on the Home page:

- **Hero** — headline, buttons, image
- **Featured Events & News** — up to 3 curated cards
- **Featured Media** — curated photo/video collage
- **Book a Hall** — home section copy and buttons
- **Featured Programs & Services** — curated program cards

Set **Show this section?** to `false` to hide a section without deleting its content.

### 4. Uploaded media

Images uploaded through the CMS are saved to `public/uploads/` and served at `/uploads/...`.

### 5. How to add a new event

1. Open `/admin` → **Events & News**.
2. Add an item under **Upcoming events**, **Announcements**, **Community news**, or **Past events**.
3. Fill in title, date, excerpt, and link. Use `TODO` if details are not confirmed.
4. Set **Publish?** to `true` only when verified.
5. Click **Publish**.

To feature an event on the **Home page**, also add it under **Home Page** → **Featured event cards** (separate from the full Events page).

### 6. How to add a new photo

1. Open `/admin` → **Media — Photos**.
2. Click **Add** under **Photos**.
3. Enter a title, upload an image, and add alt text for accessibility.
4. Set **Publish?** to `true` when ready.
5. Click **Publish**.

To show a photo on the **Home page**, also add it under **Home Page** → **Featured media items**.

### 7. How to add a new YouTube video

1. Open `/admin` → **Media — Videos**.
2. Click **Add** under **Videos**.
3. Enter a title and paste the **public YouTube link** (watch or embed URL).
4. Set **Publish?** to `true` when ready.
5. Click **Publish**.

To feature a video on the **Home page**, also add it under **Home Page** → **Featured media items** and set the type to **video**.

### 8. How to update Book a Hall

**On the Home page:** open `/admin` → **Home Page** → **Book a Hall**. Edit the title, description, details list, buttons, and image. Use `/contact` as the button link until the official booking form is ready. Do not invent pricing, capacity, or availability — use `TODO` for unconfirmed details.

**On the Events page:** open `/admin` → **Events & News** → **Book the Event Hall** for the full-page hall booking section.

### 9. How to update the membership form link

The public membership form is: `https://form.jotform.com/211111215669043`

1. Open `/admin` → **Forms** and update the **ECAA Registration Form** URL.
2. Also update **Site Information** → **Membership form URL** if that link changes.
3. Click **Publish**.

You can also edit membership page copy under **Membership** in the CMS.

### 10. What still needs setup before real team members can log in

Local editing works without login when you run `npm run dev` (uses `decap-server` + `local_backend`).

Before production editors can save changes online:

- [ ] Connect the GitHub repository to your hosting provider (Netlify recommended)
- [ ] Configure the **Decap CMS backend** (`git-gateway` in `public/admin/config.yml`)
- [ ] Set up an **authentication provider** (Netlify Identity + Git Gateway, or GitHub OAuth)
- [ ] Replace `site_url`, `display_url`, and `branch` placeholders in `public/admin/config.yml`
- [ ] Remove or comment out `local_backend` for production deploys
- [ ] Invite ECAA editors with appropriate permissions (they should use `/admin`, not edit React code)
- [ ] Test a full edit → publish → deploy workflow

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

| File | Purpose |
|------|---------|
| `src/content/siteInfo.json` | Organization name, tagline, membership form URL |
| `src/data/navigation.json` | Main navigation labels and paths |
| `src/content/contact.json` | Address, phone, email, hours, social links |
| `src/content/programs.json` | Program categories and individual programs |
| `src/content/events.json` | Upcoming, announcements, news, past events |
| `src/content/teamMembers.json` | Leadership groups and member profiles |
| `src/content/documents.json` | Document categories and files |
| `src/content/videos.json` / `src/content/images.json` | Media library |
| `src/content/forms.json` | External forms (membership, etc.) |
| `src/content/faq.json` | FAQ questions and answers |
| `src/content/membership.json` | Membership page copy |
| `src/data/about.json` / `src/data/support.json` | Page-specific content |

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

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite + Decap local backend (CMS at `/admin`) |
| `npm run dev:site` | Start Vite only (no CMS backend) |
| `npm run cms` | Start Decap local backend only (port 8081) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run Oxlint |
