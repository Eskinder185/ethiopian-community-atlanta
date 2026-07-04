import contactData from "../content/contact.json";

/** Official ECAA social URLs from site content. Empty values are hidden on the public site. */
export const socialLinks = {
  youtube: contactData.social?.youtube ?? "",
  tiktok: contactData.social?.tiktok ?? "",
  facebook: contactData.social?.facebook ?? "",
  instagram: contactData.social?.instagram ?? "",
};
