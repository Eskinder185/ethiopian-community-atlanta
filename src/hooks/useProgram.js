import { useEffect, useState } from "react";
import { fetchProgramBySlug, getFallbackProgramBySlug } from "../utils/programs";

export function useProgram(slug) {
  const [program, setProgram] = useState(() => getFallbackProgramBySlug(slug));
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchProgramBySlug(slug)
      .then((item) => {
        if (!mounted) return;
        setProgram(item);
        setNotFound(!item);
        setLoading(false);
      })
      .catch((error) => {
        console.warn("Using fallback program because Supabase failed", error);
        if (!mounted) return;
        const fallback = getFallbackProgramBySlug(slug);
        setProgram(fallback);
        setNotFound(!fallback);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  return { program, loading, notFound };
}
