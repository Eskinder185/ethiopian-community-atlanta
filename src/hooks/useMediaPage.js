import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useEvents } from "./useEvents";
import { fetchMediaItems } from "../utils/mediaItems";
import { fetchMediaPageContentRow, resolveMediaPageContent } from "../utils/pageContent";
import { applyMediaItemsLocale } from "../utils/mediaLocale";
import { getFallbackEvents } from "../utils/events";
import { getFallbackMediaItems } from "../utils/mediaItems";

export function useMediaPage() {
  const { language } = useLanguage();
  const { events } = useEvents();
  const [mediaItems, setMediaItems] = useState(() =>
    getFallbackMediaItems(events ?? getFallbackEvents())
  );
  const [pageContentRow, setPageContentRow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const eventList = events ?? getFallbackEvents();

    Promise.all([fetchMediaItems(eventList), fetchMediaPageContentRow()])
      .then(([items, contentRow]) => {
        if (!active) return;
        setMediaItems(items);
        setPageContentRow(contentRow);
        setLoading(false);
      })
      .catch((error) => {
        console.warn("Using fallback media page content because loading failed", error);
        if (!active) return;
        setMediaItems(getFallbackMediaItems(eventList));
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [events]);

  const pageContent = useMemo(
    () => resolveMediaPageContent(language, pageContentRow),
    [language, pageContentRow]
  );

  const localizedItems = useMemo(
    () => applyMediaItemsLocale(mediaItems, language),
    [mediaItems, language]
  );

  return {
    mediaItems: localizedItems,
    pageContent,
    loading,
  };
}
