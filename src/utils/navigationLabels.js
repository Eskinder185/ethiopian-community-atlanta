const NAV_LABEL_KEYS = {
  Home: "nav.home",
  About: "nav.about",
  Programs: "nav.programs",
  Events: "nav.events",
  Membership: "nav.membership",
  Media: "nav.media",
  Leadership: "nav.leadership",
  Contact: "nav.contact",
  Support: "nav.support",
  Admin: "nav.admin",
  "Get Involved": "nav.getInvolved",
  "About ECAA": "nav.aboutEcaa",
  Governance: "nav.governance",
  "Programs & Services": "nav.programsServices",
  EDIR: "nav.edir",
  "Youth & Education": "nav.youthEducation",
  "Health & Wellness": "nav.healthWellness",
  "Upcoming Events": "nav.upcomingEvents",
  Announcements: "nav.announcements",
  "Media Gallery": "common.mediaGallery",
  "Become a Member": "common.becomeMember",
  Donate: "common.donate",
  Volunteer: "common.volunteer",
  "Book a Hall": "common.bookHall",
};

export function translateNavLabel(label, t) {
  const key = NAV_LABEL_KEYS[label];
  if (!key) return label;
  const translated = t(key);
  return translated === key ? label : translated;
}
