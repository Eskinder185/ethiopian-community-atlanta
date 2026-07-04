const INTERNAL_ROUTES = new Set([
  "/",
  "/about",
  "/programs",
  "/events",
  "/events#book-hall",
  "/media",
  "/membership",
  "/support",
  "/leadership",
  "/documents",
  "/contact",
  "/privacy",
  "/terms",
  "/volunteer",
  "/book-hall",
  "/donate",
  "/governance",
]);

const INTERNAL_ROUTE_PREFIXES = ["/programs/", "/admin/", "/forms/"];

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function warnValidation(scope, message, details) {
  if (import.meta.env.DEV) {
    console.warn(`[contentValidation] ${scope}: ${message}`, details ?? "");
  }
}

function hasUsableText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidUuid(value) {
  return hasUsableText(value) && UUID_PATTERN.test(value.trim());
}

export function isValidInternalRoute(value) {
  if (!hasUsableText(value)) return false;

  const trimmed = value.trim();

  if (/[\u1200-\u137F]/.test(trimmed)) {
    return false;
  }

  const [pathOnly] = trimmed.split("#");
  if (INTERNAL_ROUTES.has(trimmed) || INTERNAL_ROUTES.has(pathOnly)) {
    return true;
  }

  return INTERNAL_ROUTE_PREFIXES.some((prefix) => pathOnly.startsWith(prefix));
}

export function isValidExternalUrl(value) {
  if (!hasUsableText(value)) return false;
  const trimmed = value.trim();
  return (
    /^https?:\/\//i.test(trimmed) || trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")
  );
}

export function validateButton(button, scope = "button") {
  const issues = [];

  if (!button || typeof button !== "object") {
    issues.push("button is missing");
    return { valid: false, issues };
  }

  if (!hasUsableText(button.label)) {
    issues.push("missing label");
  }

  if (!hasUsableText(button.href)) {
    issues.push("missing href");
  } else if (button.external) {
    if (!isValidExternalUrl(button.href)) {
      issues.push("invalid external href");
    }
  } else if (!isValidInternalRoute(button.href) && !button.href.startsWith("#")) {
    issues.push("invalid internal route");
  }

  if (issues.length > 0) {
    warnValidation(scope, issues.join(", "), button);
  }

  return { valid: issues.length === 0, issues };
}

export function validateImage(imageUrl, altText, scope = "image") {
  const issues = [];

  if (!hasUsableText(imageUrl)) {
    issues.push("missing image_url");
  } else if (imageUrl.startsWith("TODO") || imageUrl === "#") {
    issues.push("placeholder image_url");
  }

  if (!hasUsableText(altText)) {
    issues.push("missing alt text");
  }

  if (issues.length > 0) {
    warnValidation(scope, issues.join(", "), { imageUrl, altText });
  }

  return { valid: issues.length === 0, issues };
}

export function validateEvent(event, scope = "event") {
  const issues = [];

  if (!event || typeof event !== "object") {
    issues.push("event is missing");
    return { valid: false, issues };
  }

  if (!hasUsableText(event.title)) {
    issues.push("missing title");
  }

  if (event.link && !isValidExternalUrl(event.link) && !isValidInternalRoute(event.link)) {
    issues.push("invalid event link");
  }

  if (event.id && !isValidUuid(event.id) && !hasUsableText(event.slug)) {
    issues.push("invalid id without slug fallback");
  }

  if (event.posterUrl || event.imageUrl) {
    const imageCheck = validateImage(
      event.posterUrl || event.imageUrl,
      event.imageAlt || event.title,
      `${scope}.image`
    );
    issues.push(...imageCheck.issues);
  }

  if (issues.length > 0) {
    warnValidation(scope, issues.join(", "), event);
  }

  return { valid: issues.length === 0, issues };
}

export function validateMediaItem(item, scope = "media") {
  const issues = [];

  if (!item || typeof item !== "object") {
    issues.push("media item is missing");
    return { valid: false, issues };
  }

  if (!hasUsableText(item.title)) {
    issues.push("missing title");
  }

  const mediaType = item.mediaType || item.media_type;
  if (mediaType && !["photo", "video", "document"].includes(mediaType)) {
    issues.push("invalid media type");
  }

  if (item.link && !isValidExternalUrl(item.link) && !isValidInternalRoute(item.link)) {
    issues.push("invalid link");
  }

  if (item.imageUrl || item.image_url) {
    const imageCheck = validateImage(
      item.imageUrl || item.image_url,
      item.altText || item.alt_text || item.title,
      `${scope}.image`
    );
    issues.push(...imageCheck.issues);
  }

  if (item.id && !isValidUuid(item.id)) {
    issues.push("invalid UUID");
  }

  if (issues.length > 0) {
    warnValidation(scope, issues.join(", "), item);
  }

  return { valid: issues.length === 0, issues };
}

export function validateLeadershipMember(member, scope = "leadership") {
  const issues = [];

  if (!member || typeof member !== "object") {
    issues.push("member is missing");
    return { valid: false, issues };
  }

  if (!hasUsableText(member.name)) {
    issues.push("missing name");
  }

  if (member.imageUrl || member.image_url) {
    const imageCheck = validateImage(
      member.imageUrl || member.image_url,
      member.name,
      `${scope}.image`
    );
    issues.push(...imageCheck.issues);
  }

  if (issues.length > 0) {
    warnValidation(scope, issues.join(", "), member);
  }

  return { valid: issues.length === 0, issues };
}

export function validateProgram(program, scope = "program") {
  const issues = [];

  if (!program || typeof program !== "object") {
    issues.push("program is missing");
    return { valid: false, issues };
  }

  if (!hasUsableText(program.title)) {
    issues.push("missing title");
  }

  if (!hasUsableText(program.slug)) {
    issues.push("missing slug");
  }

  if (program.id && !isValidUuid(program.id)) {
    issues.push("invalid UUID");
  }

  if (issues.length > 0) {
    warnValidation(scope, issues.join(", "), program);
  }

  return { valid: issues.length === 0, issues };
}

export function filterValidItems(items, validator) {
  if (!Array.isArray(items)) return [];

  return items.filter((item) => {
    const result = validator(item);
    return result.valid || !import.meta.env.PROD;
  });
}

export function runDevContentValidation(contentSets = []) {
  if (!import.meta.env.DEV) return;

  contentSets.forEach(({ label, items, validator }) => {
    if (!Array.isArray(items)) return;
    items.forEach((item, index) => validator(item, `${label}[${index}]`));
  });
}
