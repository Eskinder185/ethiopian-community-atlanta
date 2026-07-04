import { useEffect, useState } from "react";
import { fetchHomepageMediaItems } from "../utils/mediaItems";

/** @typedef {import('../types').MediaItem} MediaItem */

export function useHomepageMedia() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchHomepageMediaItems()
      .then((items) => {
        if (!mounted) return;
        setMediaItems(items);
        setLoading(false);
      })
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.warn("Homepage media could not be loaded", error);
        }
        if (!mounted) return;
        setMediaItems([]);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { mediaItems, loading };
}
