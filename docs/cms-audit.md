# ECAA CMS Audit

This document summarizes what staff can edit in the admin CMS without touching code, and what gaps remain.

## Covered in admin (`/admin/*`)

| Area              | Admin screen           | Notes                                                       |
| ----------------- | ---------------------- | ----------------------------------------------------------- |
| Homepage sections | `/admin/home`          | Hero, events preview, media, book hall, programs, final CTA |
| Events            | `/admin/events`        | Titles, dates, posters, visibility, featured                |
| Announcements     | `/admin/events`        | Managed alongside events content                            |
| Programs          | `/admin/programs`      | Program details, EN/AM tabs                                 |
| Leadership        | `/admin/leadership`    | Members, roles, photos, EN/AM                               |
| Media             | `/admin/media`         | Photos/videos, upload, visibility                           |
| Hall bookings     | `/admin/hall-bookings` | Booking requests and calendar data                          |

## Partially covered (JSON / static data)

| Area                     | Current source                                    | Gap                                                                       |
| ------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------- |
| Documents                | `src/content/` + static page                      | No dedicated `/admin/documents` screen                                    |
| Membership page copy     | `membershipPageContent` + Supabase `page_content` | Editable via Supabase if `page_content` row exists; no dedicated admin UI |
| Support / donation links | `support.json`, `siteInfo.json`                   | Donation URLs in site info; no dedicated admin form                       |
| Contact details          | `contact.json`                                    | Requires code/JSON edit for address or hours changes                      |
| Privacy / Terms          | Static legal pages                                | No CMS screen (acceptable for legal copy)                                 |
| Navigation labels        | `navigation.json` + translations                  | No visual admin editor                                                    |

## Recommended next steps (non-blocking)

1. Add `/admin/documents` for PDF links and governance files
2. Add `/admin/support` for donation links and sponsorship copy
3. Add `/admin/contact` or site settings for phone, email, and address
4. Add `/admin/membership` page-content editor (same pattern as leadership page content)

## Validation in admin

Existing admin forms should continue to enforce:

- Required title / name fields before save
- Image upload to Supabase Storage (not blob URLs)
- Valid internal routes (`/membership`, not translated paths)
- Visible/public toggles and display order where applicable

Use `src/utils/contentValidation.js` helpers when adding new admin save handlers.
