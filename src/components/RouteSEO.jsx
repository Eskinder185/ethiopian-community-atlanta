import { useLocation } from "react-router-dom";
import SEO from "./SEO";
import { organizationStructuredData, pageSeo } from "../data/seoMetadata";

export default function RouteSEO() {
  const { pathname } = useLocation();
  const meta = pageSeo[pathname];

  if (!meta) {
    return (
      <SEO
        title="Page not found"
        description="The page you are looking for may have moved or is no longer available."
        canonicalPath={pathname}
        noIndex
      />
    );
  }

  const structuredData = pathname === "/" ? organizationStructuredData : undefined;

  return (
    <SEO
      title={meta.title}
      description={meta.description}
      canonicalPath={pathname}
      type={meta.type}
      structuredData={structuredData}
    />
  );
}
