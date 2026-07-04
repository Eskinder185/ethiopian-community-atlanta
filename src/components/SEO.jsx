import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, getCanonicalUrl } from "../data/seoMetadata";

/**
 * @param {{
 *   title: string;
 *   description?: string;
 *   canonicalPath?: string;
 *   ogImage?: string;
 *   type?: string;
 *   structuredData?: object | object[];
 *   noIndex?: boolean;
 * }} props
 */
export default function SEO({
  title,
  description,
  canonicalPath = "/",
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  structuredData,
  noIndex = false,
}) {
  const canonicalUrl = getCanonicalUrl(canonicalPath);
  const fullTitle = title.includes("ECAA") ? title : `${title} | ECAA`;
  const resolvedDescription = description || SITE_NAME;
  const resolvedOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_URL}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;

  const structuredItems = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={resolvedDescription} /> : null}
      <link rel="canonical" href={canonicalUrl} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={resolvedOgImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {structuredItems.map((item, index) => (
        <script key={`structured-data-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
