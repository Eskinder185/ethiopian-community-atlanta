# CMS-managed content

Editable website content for the ECAA site lives in this folder as JSON files.

**Do not edit these files by hand in production** unless you are a developer. Non-technical editors should use the [Decap CMS admin](/admin) at `/admin` after authentication is configured.

## Files

| File               | Purpose                                                                |
| ------------------ | ---------------------------------------------------------------------- |
| `siteInfo.json`    | Organization name, tagline, URLs, SEO                                  |
| `homepage.json`    | Home page featured sections (hero, events, media, book hall, programs) |
| `pageHeroes.json`  | Hero banners for main pages (title, image, buttons, highlights)        |
| `programs.json`    | Program categories and services                                        |
| `events.json`      | Events, announcements, news, book-hall                                 |
| `teamMembers.json` | Leadership groups and member profiles                                  |
| `documents.json`   | Document categories and file links                                     |
| `videos.json`      | YouTube videos and embeds                                              |
| `images.json`      | Site images and gallery metadata                                       |
| `contact.json`     | Address, phone, email, hours, social links                             |
| `faq.json`         | Frequently asked questions                                             |
| `forms.json`       | External forms (Jotform, Google Forms)                                 |

Structural site configuration (navigation labels, page metadata) remains in `src/data/`.

Uploaded media from the CMS is stored in `public/uploads/` and served at `/uploads/`.
