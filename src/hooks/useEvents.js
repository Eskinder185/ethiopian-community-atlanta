import { useEffect, useState } from "react";
import { fetchEvents, getFallbackEvents, groupEvents } from "../utils/events";
import { runDevContentValidation, validateEvent } from "../utils/contentValidation";

/** @typedef {import('../types').EventItem} EventItem */

export function useEvents() {
  const [events, setEvents] = useState(getFallbackEvents);
  const [groups, setGroups] = useState(() => groupEvents(getFallbackEvents()));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchEvents()
      .then((items) => {
        if (!mounted) return;
        setEvents(items);
        setGroups(groupEvents(items));
        setLoading(false);
        runDevContentValidation([{ label: "events", items, validator: validateEvent }]);
      })
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.warn("Using fallback events because Supabase failed", error);
        }
        if (!mounted) return;
        const fallback = getFallbackEvents();
        setEvents(fallback);
        setGroups(groupEvents(fallback));
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { events, groups, loading };
}
