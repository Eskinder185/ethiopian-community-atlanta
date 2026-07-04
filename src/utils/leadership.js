import {
  getFallbackLeadershipIntro,
  getRawFallbackLeadershipRecords,
  LEADERSHIP_COMMITTEES,
} from "../data/leadership";
import { uploadFolders } from "../config/assets";
import { uploadMedia } from "../lib/uploadMedia";
import { supabase } from "../lib/supabaseClient";
import { hasUsableText, isTodoValue } from "./data";
import { resolvePublicAssetPath } from "./images";
import { normalizeLeadershipContentAm } from "./leadershipLocale";
import { isValidUuid } from "./uuid";
import { slugifyTitle } from "./programs";
import { getLeadershipImageAlt as buildLeadershipImageAlt } from "./altText";
import {
  assertAdminSession,
  ensureDeletableUuid,
  logAdminDeleteInDev,
  mapAdminDeleteError,
} from "./adminAuth";

function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

function warnSupabaseFallback(context, error) {
  console.warn(`Using fallback leadership because Supabase failed (${context})`, error);
}

function toBool(value, fallback = false) {
  if (value === undefined || value === null) return fallback;
  return value !== false;
}

export function normalizeLeadershipMember(raw, { requireName = true } = {}) {
  if (!raw) return null;

  const id = raw.id || raw.slug || "";
  const name = raw.name || "";
  if (requireName && !hasUsableText(name)) return null;

  const imageUrl = raw.image_url || raw.imageUrl || raw.image || raw.photo?.src || "";
  const role = raw.role || raw.title || "";

  return {
    id: id || `local-leader-${raw.slug || "new"}`,
    localOnly: raw.localOnly === true || !isValidUuid(id),
    slug: raw.slug || (isValidUuid(id) ? id : ""),
    name: name.trim(),
    role: role.trim(),
    committee: raw.committee || "",
    bio: raw.bio || "",
    imageUrl: typeof imageUrl === "string" ? imageUrl.trim() : "",
    imageAlt: raw.image_alt || raw.imageAlt || raw.photo?.alt || "",
    email: raw.email || "",
    phone: raw.phone || "",
    facebookUrl: raw.facebook_url || raw.facebookUrl || "",
    instagramUrl: raw.instagram_url || raw.instagramUrl || "",
    linkedinUrl: raw.linkedin_url || raw.linkedinUrl || "",
    websiteUrl: raw.website_url || raw.websiteUrl || "",
    showEmail: raw.show_email === true || raw.showEmail === true,
    showPhone: raw.show_phone === true || raw.showPhone === true,
    showFacebook: raw.show_facebook === true || raw.showFacebook === true,
    showInstagram: raw.show_instagram === true || raw.showInstagram === true,
    showLinkedin: raw.show_linkedin === true || raw.showLinkedin === true,
    showWebsite: raw.show_website === true || raw.showWebsite === true,
    profileStyle: raw.profile_style || raw.profileStyle || "bubble",
    featured: raw.featured === true,
    active: toBool(raw.active, true),
    visible: toBool(raw.visible, raw.published !== false),
    displayOrder: raw.display_order ?? raw.displayOrder ?? raw.order ?? 999,
    socials: Array.isArray(raw.socials) ? raw.socials : [],
    content_am: normalizeLeadershipContentAm(raw.content_am ?? raw.contentAm),
    // Legacy aliases for older components
    title: role.trim(),
    image: typeof imageUrl === "string" ? imageUrl.trim() : "",
    order: raw.display_order ?? raw.displayOrder ?? raw.order ?? 999,
    published: toBool(raw.visible, raw.published !== false),
    showOnLeadershipPage: toBool(raw.visible, raw.published !== false),
  };
}

export function isLeadershipMemberVisible(member) {
  if (!member) return false;
  if (
    member.active === false ||
    member.visible === false ||
    member.showOnLeadershipPage === false
  ) {
    return false;
  }
  return hasUsableText(member.name);
}

export function sortLeadershipMembers(members = []) {
  return [...members].sort((a, b) => {
    const orderA = typeof a.displayOrder === "number" ? a.displayOrder : 999;
    const orderB = typeof b.displayOrder === "number" ? b.displayOrder : 999;
    if (orderA !== orderB) return orderA - orderB;
    return (a.name || "").localeCompare(b.name || "");
  });
}

export function getVisibleGroupMembers(members = []) {
  return sortLeadershipMembers(members.filter(isLeadershipMemberVisible));
}

export function groupHasVisibleMembers(group) {
  return getVisibleGroupMembers(group?.members).length > 0;
}

export function getMemberImageAlt(member) {
  return buildLeadershipImageAlt(member);
}

export function memberHasDisplayableImage(member) {
  const src = member?.imageUrl || member?.image || member?.photo?.src || "";
  return Boolean(src && hasUsableText(src) && !isTodoValue(src));
}

export function getMemberImageSrc(member) {
  const src = member?.imageUrl || member?.image || member?.photo?.src || "";
  if (!memberHasDisplayableImage({ ...member, imageUrl: src })) return "";
  if (src.startsWith("http") || src.startsWith("//")) return src;
  return resolvePublicAssetPath(src);
}

export function getMemberInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase();
}

const DEFAULT_CONTACT_LABELS = {
  email: "Email",
  phone: "Phone",
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  website: "Website",
};

export function getPublicContactLinks(member, labels = DEFAULT_CONTACT_LABELS) {
  if (!member) return [];

  const resolvedLabels = { ...DEFAULT_CONTACT_LABELS, ...labels };
  const links = [];

  if (member.showEmail && hasUsableText(member.email)) {
    links.push({
      type: "email",
      label: resolvedLabels.email,
      href: `mailto:${member.email.trim()}`,
      external: false,
    });
  }
  if (member.showPhone && hasUsableText(member.phone)) {
    links.push({
      type: "phone",
      label: resolvedLabels.phone,
      href: `tel:${member.phone.trim().replace(/\s/g, "")}`,
      external: false,
    });
  }
  if (member.showFacebook && hasUsableText(member.facebookUrl)) {
    links.push({
      type: "facebook",
      label: resolvedLabels.facebook,
      href: member.facebookUrl.trim(),
      external: true,
    });
  }
  if (member.showInstagram && hasUsableText(member.instagramUrl)) {
    links.push({
      type: "instagram",
      label: resolvedLabels.instagram,
      href: member.instagramUrl.trim(),
      external: true,
    });
  }
  if (member.showLinkedin && hasUsableText(member.linkedinUrl)) {
    links.push({
      type: "linkedin",
      label: resolvedLabels.linkedin,
      href: member.linkedinUrl.trim(),
      external: true,
    });
  }
  if (member.showWebsite && hasUsableText(member.websiteUrl)) {
    links.push({
      type: "website",
      label: resolvedLabels.website,
      href: member.websiteUrl.trim(),
      external: true,
    });
  }

  return links;
}

function committeeKey(value = "") {
  return value.trim().toLowerCase();
}

function findCommitteeDefinition(committeeTitle) {
  const key = committeeKey(committeeTitle);
  return (
    LEADERSHIP_COMMITTEES.find((committee) => committeeKey(committee.title) === key) ||
    LEADERSHIP_COMMITTEES.find((committee) => committeeKey(committee.id) === key) ||
    null
  );
}

export function groupLeadershipByCommittee(members = []) {
  const visibleMembers = getVisibleGroupMembers(members);

  return LEADERSHIP_COMMITTEES.map((committee) => ({
    ...committee,
    members: sortLeadershipMembers(
      visibleMembers.filter((member) => {
        const definition = findCommitteeDefinition(member.committee);
        return definition
          ? definition.id === committee.id
          : committeeKey(member.committee) === committeeKey(committee.title);
      })
    ),
  }));
}

export function getFeaturedLeadershipMembers(members = [], limit = 12) {
  const visible = getVisibleGroupMembers(members);
  const featured = visible.filter((member) => member.featured);
  const source = featured.length > 0 ? featured : visible;
  return source.slice(0, limit);
}

export async function fetchLeadership() {
  if (!hasSupabaseConfig()) return getFallbackLeadershipMembers();

  try {
    const { data, error } = await supabase
      .from("leadership")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      warnSupabaseFallback("fetchLeadership", error);
      return getFallbackLeadershipMembers();
    }

    if (!data?.length) return getFallbackLeadershipMembers();

    const normalized = data.map(normalizeLeadershipMember).filter(Boolean);
    return normalized.length > 0 ? normalized : getFallbackLeadershipMembers();
  } catch (error) {
    warnSupabaseFallback("fetchLeadership", error);
    return getFallbackLeadershipMembers();
  }
}

export async function fetchLeadershipForAdmin() {
  if (!hasSupabaseConfig()) return getFallbackLeadershipMembers();

  try {
    const { data, error } = await supabase
      .from("leadership")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      warnSupabaseFallback("fetchLeadershipForAdmin", error);
      return getFallbackLeadershipMembers();
    }

    if (data?.length) return data.map(normalizeLeadershipMember).filter(Boolean);
  } catch (error) {
    warnSupabaseFallback("fetchLeadershipForAdmin", error);
  }

  return getFallbackLeadershipMembers();
}

export function leadershipMemberToDbRow(member) {
  const contentAm = member.content_am;
  const row = {
    slug: member.slug || slugifyTitle(member.name),
    name: member.name,
    role: member.role || "",
    committee: member.committee || "",
    bio: member.bio || null,
    image_url: member.imageUrl || null,
    image_alt: member.imageAlt || null,
    email: member.email || null,
    phone: member.phone || null,
    facebook_url: member.facebookUrl || null,
    instagram_url: member.instagramUrl || null,
    linkedin_url: member.linkedinUrl || null,
    website_url: member.websiteUrl || null,
    show_email: member.showEmail === true,
    show_phone: member.showPhone === true,
    show_facebook: member.showFacebook === true,
    show_instagram: member.showInstagram === true,
    show_linkedin: member.showLinkedin === true,
    show_website: member.showWebsite === true,
    profile_style: member.profileStyle || "bubble",
    featured: member.featured === true,
    active: member.active !== false,
    visible: member.visible !== false,
    display_order: member.displayOrder ?? 999,
  };

  if (contentAm) {
    row.content_am = {
      name: contentAm.name || "",
      role: contentAm.role || "",
      committee: contentAm.committee || "",
      bio: contentAm.bio || "",
      image_alt: contentAm.image_alt || contentAm.imageAlt || "",
    };
  }

  return row;
}

export function createEmptyLeadershipMember() {
  return normalizeLeadershipMember(
    {
      id: null,
      localOnly: true,
      slug: "",
      name: "",
      role: "",
      committee: LEADERSHIP_COMMITTEES[0].title,
      bio: "",
      image_url: "",
      image_alt: "",
      email: "",
      phone: "",
      facebook_url: "",
      instagram_url: "",
      linkedin_url: "",
      website_url: "",
      show_email: false,
      show_phone: false,
      show_facebook: false,
      show_instagram: false,
      show_linkedin: false,
      show_website: false,
      profile_style: "bubble",
      featured: false,
      active: true,
      visible: true,
      display_order: 999,
    },
    { requireName: false }
  );
}

export async function saveLeadershipMember(member) {
  const row = leadershipMemberToDbRow(member);

  if (isValidUuid(member.id)) {
    const { data, error } = await supabase
      .from("leadership")
      .update(row)
      .eq("id", member.id)
      .select()
      .single();
    if (error) throw error;
    return normalizeLeadershipMember(data);
  }

  const { data, error } = await supabase.from("leadership").insert(row).select().single();
  if (error) throw error;
  return normalizeLeadershipMember(data);
}

export async function hideLeadershipMember(id) {
  await assertAdminSession();
  ensureDeletableUuid(id, "leadership member");
  await logAdminDeleteInDev();

  const { error } = await supabase
    .from("leadership")
    .update({ active: false, visible: false })
    .eq("id", id);

  if (error) throw mapAdminDeleteError(error);
}

export async function deleteLeadershipMember(id) {
  await assertAdminSession();
  ensureDeletableUuid(id, "leadership member");
  await logAdminDeleteInDev();

  const { error } = await supabase.from("leadership").delete().eq("id", id);
  if (error) throw mapAdminDeleteError(error);
}

export function getLeadershipIntro() {
  return getFallbackLeadershipIntro();
}

export function getFallbackLeadershipMembers() {
  return getRawFallbackLeadershipRecords().map(normalizeLeadershipMember).filter(Boolean);
}

export async function uploadLeadershipImage(file) {
  return uploadMedia(file, { uploadFolder: uploadFolders.leadershipProfiles });
}
