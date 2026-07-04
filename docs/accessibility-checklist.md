# ECAA Accessibility Checklist

Use this checklist before releases to keep the ECAA website accessible for keyboard, screen reader, and mobile users.

## 1. Keyboard-only navigation

- Tab from skip link through header, main content, footer, and sticky CTA
- Shift+Tab moves backward logically
- Open/close mobile menu with keyboard (Escape closes)
- Open/close header dropdowns with Enter/Space; Escape closes
- Reach every CTA, form field, and chatbot control
- No keyboard traps in modals, menus, or chat panel

## 2. Screen reader smoke test

Recommended tools: NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android)

- Skip link announces and moves focus to main content
- Page title and one H1 per page
- Landmarks: header, nav, main, footer
- Buttons and links have clear names
- Form labels are announced
- Error messages use `role="alert"` or `aria-live`
- Chatbot panel has dialog name; bot replies use polite live region

## 3. Color contrast review

- Avoid small gold text on white or cream
- Footer links readable on dark green
- Button hover/focus states remain readable
- Form labels and error text meet WCAG AA

## 4. Mobile tap targets

- Interactive controls at least 44px tall
- Adequate spacing between tappable items
- No horizontal scrolling at 320px–430px widths

## 5. Form validation

- Every input has a visible label linked with `htmlFor`/`id`
- Required fields marked for sighted and screen reader users
- Errors connected with `aria-describedby` and `aria-invalid`
- Do not use placeholder as the only label

## 6. Reduced motion

Enable **prefers-reduced-motion: reduce** in OS/browser settings.

- Large scroll/hover animations should be minimized
- Mobile menu and modals should not rely on motion to function

## 7. English / Amharic language

- `document.documentElement.lang` matches selected language
- Language toggle has accessible name and `aria-pressed` state
- Route paths stay in English

## 8. Manual test pages

### Public

- `/`, `/about`, `/programs`, `/events`, `/events#book-hall`
- `/media`, `/membership`, `/support`, `/leadership`
- `/documents`, `/contact`, `/privacy`, `/terms`
- A fake route (404)

### Admin

- `/admin/login`, `/admin/dashboard`, `/admin/home`
- `/admin/events`, `/admin/media`, `/admin/hall-bookings`
- `/admin/leadership`, `/admin/programs`

## 9. Browser zoom

Test at **200% zoom** on homepage and a form-heavy page.

## 10. Optional tooling

- [axe DevTools](https://www.deque.com/axe/devtools/) browser extension
- ESLint `eslint-plugin-jsx-a11y` (already configured in this project)
- Lighthouse Accessibility audit on production preview (`npm run preview`)

## Quick pass criteria

- [ ] Keyboard fully works
- [ ] Skip link works
- [ ] One H1 per page
- [ ] Useful alt text on meaningful images
- [ ] Form labels and errors connected
- [ ] No icon-only buttons without `aria-label`
- [ ] Reduced motion respected
- [ ] English and Amharic both readable and correctly marked
