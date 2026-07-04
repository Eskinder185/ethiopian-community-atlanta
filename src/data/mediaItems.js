import mediaContent from "../content/mediaItems.json";
import videosContent from "../content/videos.json";
import { isValidUuid } from "../utils/uuid";

function videoToMediaItem(video, index) {
  return {
    id: video.id || `local-media-video-${index}`,
    localOnly: video.localOnly !== false && !isValidUuid(video.id),
    title: video.title || "",
    caption: video.description || "",
    type: "youtube",
    url: video.embedUrl || video.url || "",
    image_url: video.thumbnailUrl || "",
    alt_text: video.thumbnailAlt || video.title || "",
    related_event_id: video.related_event_id || "",
    category: video.category || "events",
    featured: video.featured === true,
    visible: video.published !== false,
    display_order: video.display_order ?? index + 1,
  };
}

const jsonItems = mediaContent.mediaItems ?? [];
const videoItems = (videosContent.videos ?? [])
  .filter((video) => video.published !== false)
  .map(videoToMediaItem);

const merged = [...jsonItems];
videoItems.forEach((video) => {
  if (!merged.some((item) => item.id === video.id)) {
    merged.push(video);
  }
});

export const mediaItems = merged;

export default mediaItems;
