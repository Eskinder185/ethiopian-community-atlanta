import { useEffect, useState } from "react";
import { fetchPrograms, getFallbackPrograms } from "../utils/programs";
import { runDevContentValidation, validateProgram } from "../utils/contentValidation";

/** @typedef {import('../types').ProgramItem} ProgramItem */

export function usePrograms() {
  const [programs, setPrograms] = useState(getFallbackPrograms);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchPrograms()
      .then((items) => {
        if (mounted) {
          setPrograms(items);
          setLoading(false);
          runDevContentValidation([{ label: "programs", items, validator: validateProgram }]);
        }
      })
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.warn("Using fallback programs because Supabase failed", error);
        }
        if (mounted) {
          setPrograms(getFallbackPrograms());
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { programs, loading };
}
