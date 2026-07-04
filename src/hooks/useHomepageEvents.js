import { useEffect, useState } from "react";
import { fetchHomepageEvents } from "../utils/events";

/** @typedef {import('../types').EventItem} EventItem */

export function useHomepageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchHomepageEvents()
      .then((items) => {
        if (!mounted) return;
        setEvents(items);
        setLoading(false);
      })
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.warn("Homepage events could not be loaded", error);
        }
        if (!mounted) return;
        setEvents([]);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { events, loading };
}
