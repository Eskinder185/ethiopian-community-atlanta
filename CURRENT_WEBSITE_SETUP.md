# Current Website Setup — ECAA Rebuild

Last reviewed: July 2026  
Repository: `ethiopian-community-atlanta`

## 1. Current folder structure

```
ethiopian-community-atlanta/
├── .github/workflows/deploy.yml     # GitHub Pages deploy (push to main)
├── public/
│   ├── admin/                       # Decap CMS admin UI
│   ├── images/                      # Static community images
│   ├── uploads/                     # CMS uploads placeholder
│   ├── _redirects                   # Netlify-style redirects
│   └── icons.svg
├── src/
│   ├── main.jsx                     # React entry
│   ├── App.jsx                      # React Router routes
│   ├── index.css                    # Tailwind + ECAA design tokens
│   ├── pages/                       # Route-level page components
│   ├── components/
│   │   ├── layout/                  # Header, Footer, PageHero, Layout
│   │   ├── sections/                # Page sections + homepage blocks
│   │   ├── cards/                   # Reusable card components
│   │   ├── ui/                      # Buttons, containers, badges, etc.
│   │   ├── forms/                   # MailtoForm
│   │   └── chat/                    # Chat widget
│   ├── content/                     # CMS-editable JSON content
│   ├── data/                        # Site config JSON (nav, about, support)
│   └── utils/                       # Helpers (data, events, homepage, images)
├── index.html                       # HTML shell + default meta
├── vite.config.js                   # Vite + React + Tailwind; base path set
└── package.json                     # React 19, Vite 8, Tailwind 4
```

**Framework:** React 19 + Vite 8 + React Router 7 + Tailwind CSS 4  
**CMS:** Decap CMS (`public/admin/`, `decap-server` in dev)  
**Deployment:** GitHub Actions → GitHub Pages (`base: /ethiopian-community-atlanta/`)

## 2. Current pages / routes

| Route | Page file | Notes |
|-------|-----------|-------|
| `/` | `src/pages/Home.jsx` | Conversion-focused homepage |
| `/about` | `src/pages/About.jsx` | Mission, history, how ECAA works |
| `/programs` | `src/pages/Programs.jsx` | Program grid + education/training |
| `/membership` | `src/pages/Membership.jsx` | Benefits, registration, FAQ |
| `/events` | `src/pages/Events.jsx` | Upcoming, announcements, book hall |
| `/leadership` | `src/pages/Leadership.jsx` | Committees + team members |
| `/documents` | `src/pages/Documents.jsx` | Bylaws, elections, reports |
| `/media` | `src/pages/Media.jsx` | Photos + videos |
| `/support` | `src/pages/Support.jsx` | Donate / fundraising (nav label: Donate) |
| `/contact` | `src/pages/Contact.jsx` | Contact details + map area |
| `/volunteer` | `src/pages/Volunteer.jsx` | Volunteer areas + interest form |
| `/privacy` | `src/pages/Privacy.jsx` | Privacy policy |
| `/terms` | `src/pages/Terms.jsx` | Terms & Conditions |
| `/admin` | `src/pages/Admin.jsx` | CMS entry (hidden from public nav) |
| `/education-training` | redirect → `/programs#education-training` | |
| `/book-hall` | redirect → `/events#book-hall` | |
| `*` | `src/pages/NotFound.jsx` | 404 |

**Missing route (requested):** `/governance` — maps to Documents/Bylaws content (to be added as redirect).

## 3. Current components (grouped)

### Layout
- `Layout.jsx`, `Header.jsx`, `Footer.jsx`, `MobileMenu.jsx`, `HeaderBrand.jsx`
- `PageHero.jsx`, `NavDropdown.jsx`, `ScrollToTop.jsx`, `LegalPageLayout.jsx`

### Homepage sections (active on Home.jsx before this task)
- `HomeHeroSection.jsx` — split hero with image
- `WhyJoinSection.jsx`, `CommunityImpactSection.jsx`, `WhoWeServeSection.jsx`
- `FeaturedProgramsSection.jsx`, `FeaturedEventsSection.jsx`
- `WaysToGetInvolvedSection.jsx`, `TrustCredibilitySection.jsx`, `FeaturedMediaSection.jsx`

### Homepage preview sections (built but previously **not wired** to Home.jsx)
- `AboutPreview.jsx`, `MembershipPreview.jsx`, `ProgramsPreview.jsx`
- `EventsPreview.jsx`, `ContactPreview.jsx`, `LeadershipPreview.jsx`
- `QuickActions.jsx`, `ClosingCtaSection.jsx`, `BookHallHomeSection.jsx`

### Shared UI
- `CTAButton` / `Button`, `Container`, `SectionHeader`, `HomeSectionHeader`
- `ExternalFormCTA`, `JotformEmbed`, `EmptyState`, `AnimateIn`
- Cards: `ProgramCard`, `EventCard`, `HomeInfoCard`, `FeaturedProgramCard`, etc.

## 4. Current homepage sections (before content placement update)

Order on `Home.jsx` (prior redesign):

1. Hero — join/community messaging  
2. Why Join ECAA — 6 benefit cards  
3. Community Impact — 6 impact cards  
4. Who We Serve — 6 audience cards  
5. Featured Programs — 7 program image cards  
6. Featured Events — empty state or live events  
7. Ways to Get Involved — 4 CTA cards  
8. Trust & Credibility — leadership/docs/contact  
9. Community Moments — media collage  

Content source: `src/content/homepage.json`

## 5. Current navigation links

**Header (desktop + mobile):**  
Home · About · Programs · Events · Membership · Donate (`/support`) · Contact  

**Header CTAs:** Become a Member · Donate  

**Admin:** hidden (`published: false`)

**Not in header (pages exist):** Volunteer, Leadership, Governance/Documents, Media

## 6. Current footer links

- Mission + 501(c)(3) note  
- Contact: address, phone, email (no office hours in footer yet)  
- Quick links: About, Programs, Events, Membership, Donate, Volunteer, Leadership, Documents, Media, Contact  
- Social: Facebook, Instagram, YouTube, TikTok  
- Legal: Privacy Policy, Terms & Conditions  

No cart/ecommerce links found.

## 7. Existing forms / buttons / external links

| Purpose | URL | Where used |
|---------|-----|------------|
| Membership registration | `https://form.jotform.com/211111215669043` | Membership page, `forms.json` |
| Fundraising / donation | `https://form.jotform.com/240604382753152` | Support page, `forms.json` |
| Event RSVP | Google Form (in `forms.json`) | Events (when linked) |
| Student interest | **TODO** in `forms.json` | Programs youth form |
| Volunteer information | **TODO** in `forms.json` | Programs volunteer form |
| Volunteer page | Mailto form | `Volunteer.jsx` |
| Hall booking | `/contact` mailto | Events book-hall section |

## 8. Existing images / assets

`public/images/`:
- `home-hero-community-atlanta.jpg`
- `events-community-gathering.jpg`
- `programs-community-support.jpg`
- `membership-welcome.jpg`
- `leadership-community-guidance.jpg`
- `global-ethiopian-pattern-divider.jpg`

Registry: `src/content/images.json`  
Design tokens: Ethiopian green, gold, red, cream in `src/index.css`

## 9. Problems found in the current setup

1. **Preview components orphaned** — `AboutPreview`, `ProgramsPreview`, `MembershipPreview`, etc. expect `homepage.json` keys that were removed in the last homepage redesign; they would crash if imported without restoring keys.  
2. **Navigation gap** — Volunteer, Leadership, and Governance are not in the main nav despite being core conversion/trust paths.  
3. **Form URLs incomplete** — Student interest and volunteer Google Forms marked TODO in `forms.json` / `programs.json`.  
4. **Volunteer page** uses mailto-only form; researched Google volunteer form not linked.  
5. **Homepage vs. research mismatch** — Current homepage emphasizes “Why Join” funnels; researched content specifies mission, pillars, and page previews in a different order.  
6. **Governance label** — Bylaws/governance live on `/documents` but are not labeled “Governance” for visitors.  
7. **Footer missing office hours** — Hours exist in `contact.json` but not in footer.  
8. **Support page CTA copy** — Uses “Donate Through Secure Jotform” instead of researched “Donate Today”.  
9. **About history** — Does not explicitly state “Founded in 1983” in all preview surfaces.  
10. **Membership pricing** — `$30` fee is present; should include verification disclaimer per research guidance.  
11. **Unused imports** — `Layout.jsx` has unused `Link` import (lint warning).  
12. **`QuickActions.jsx`** references `homeData.quickActions` which does not exist in `homepage.json`.

## 10. Best places to insert researched content

| Content | Best placement |
|---------|----------------|
| Org contact info (address, phone, email, hours) | `contact.json` → `ContactPreview`, `Footer`, `ContactDetailsSection` |
| Hero headline + CTAs | `homepage.json` → `HomeHeroSection` |
| Mission statement | New `missionSection` in `homepage.json` + `HomeMissionSection` |
| Three community pillars | `homepage.json` → `HomeCommunityPillarsSection` |
| Program list (youth, newcomers, health, legal, financial, sports) | `programs.json` categories + `ProgramsPreview` on homepage |
| Membership benefits + form | `membership.json` + `MembershipPreview` |
| Volunteer areas + Google form | `volunteer.json` + `VolunteerPreviewSection` + `Volunteer.jsx` |
| Donation campaign | `support.json` + new `DonationPreview` on homepage |
| Events empty state | `homepage.json` `eventsPreview` + `EventsPreview` |
| Founded 1983 / about blurb | `about.json` + `AboutPreview` |
| Bylaws English/Amharic | `documents.json` (already present) — nav as **Governance** |
| External form URLs | `forms.json` (single source of truth) |
| SEO title/description | `homepage.json` `seo`, `index.html`, `siteInfo.json` |
| Main tagline | `siteInfo.json` tagline + footer mission |
