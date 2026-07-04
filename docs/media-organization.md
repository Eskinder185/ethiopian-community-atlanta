# ECAA Media Organization

This guide explains how website design images are kept separate from community media gallery content.

## Website images (design assets)

These are static files used for the look and layout of the website:

- Logo
- Hero backgrounds
- Decorative patterns
- Placeholder graphics
- Icons

**Stored in:** `public/images/`

**Folder structure:**

| Folder                        | Purpose                           |
| ----------------------------- | --------------------------------- |
| `public/images/brand/`        | ECAA logo and brand marks         |
| `public/images/heroes/`       | Page hero background photos       |
| `public/images/patterns/`     | Decorative pattern/divider images |
| `public/images/placeholders/` | Fallback placeholder graphics     |
| `public/images/icons/`        | Small icon assets                 |

**Configured in:** `src/config/assets.js`

These images are **not** shown in the Media Gallery (`/media`).

## Community media (gallery content)

These are photos, flyers, videos, forms, and links managed by ECAA editors:

- Community photos
- Event flyers
- Program media
- YouTube videos
- Eventbrite links
- Google Form links
- Partiful links
- Documents and external links

**Stored through:**

1. Supabase `media_items` table (metadata and URLs)
2. Supabase Storage bucket `ecaa-media` (uploaded files)
3. Local JSON fallback data when Supabase is unavailable

**Displayed on:** `/media` only (not on `/events`)

## Supabase Storage folders

Uploaded community files go into organized folders inside the `ecaa-media` bucket:

| Folder                       | Used for                  |
| ---------------------------- | ------------------------- |
| `media-gallery/photos/`      | Gallery photos            |
| `media-gallery/flyers/`      | Event and program flyers  |
| `media-gallery/documents/`   | Document files            |
| `leadership/profile-photos/` | Leadership profile photos |
| `programs/program-media/`    | Program detail page media |
| `events/event-images/`       | Event listing images      |

Uploads are handled by `src/lib/uploadMedia.js`.

## Link-based media (not image files)

YouTube, Google Forms, Eventbrite, Partiful, and external links are **not uploaded as image files**.

Admins enter these as **URL fields** in the admin portal. The website saves them in Supabase data fields and displays them as link or embed cards on `/media`.

## Admin portal

| Admin page         | Upload folder                                    |
| ------------------ | ------------------------------------------------ |
| Admin → Media      | `media-gallery/photos` or `media-gallery/flyers` |
| Admin → Leadership | `leadership/profile-photos`                      |
| Admin → Programs   | `programs/program-media`                         |
| Admin → Events     | `events/event-images`                            |

## Quick rules

1. **Do not** put gallery photos in `public/images/heroes/` or `public/images/brand/`.
2. **Do not** use hero images as leadership profile photos.
3. **Do not** upload YouTube or form links as image files — use URL fields.
4. Website design paths live in `src/config/assets.js`.
5. Community gallery content lives in Supabase and appears on `/media`.
