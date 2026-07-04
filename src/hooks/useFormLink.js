import { useEffect, useState } from "react";
import { resolveFormHref } from "../utils/formLinks";

/**
 * Resolve internal ECAA form path when published, otherwise return fallback URL.
 */
export function useFormLink(internalSlug, fallbackUrl) {
  const [href, setHref] = useState(fallbackUrl || "");
  const [isInternal, setIsInternal] = useState(false);

  useEffect(() => {
    let active = true;

    resolveFormHref({ internalSlug, fallbackUrl }).then((resolved) => {
      if (!active) return;
      setHref(resolved || "");
      setIsInternal(Boolean(resolved?.startsWith("/forms/")));
    });

    return () => {
      active = false;
    };
  }, [internalSlug, fallbackUrl]);

  return { href, isInternal };
}
