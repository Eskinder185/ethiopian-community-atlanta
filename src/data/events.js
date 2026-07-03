import eventsContent from '../content/events.json'
import videosContent from '../content/videos.json'

function mapLegacyEvent(item, status) {
  const slug = item.slug || item.id
  return {
    id: item.id || slug,
    slug,
    status,
    category: item.category || '',
    title: item.title || '',
    event_date: item.event_date || item.eventDate || item.date || '',
    event_time: item.event_time || item.eventTime || '',
    location: item.location || '',
    excerpt: item.excerpt || item.summary || '',
    description: item.description || item.body || '',
    image_url: item.image_url || item.imageUrl || item.image?.src || '',
    image_alt: item.image_alt || item.imageAlt || item.image?.alt || '',
    eventbrite_link: item.eventbrite_link || item.eventbriteLink || '',
    google_form_link: item.google_form_link || item.googleFormLink || '',
    partiful_link: item.partiful_link || item.partifulLink || '',
    youtube_link: item.youtube_link || item.youtubeLink || '',
    link: item.link || '',
    registration_url: item.registration_url || item.registrationUrl || '',
    recap_url: item.recap_url || item.recapUrl || '',
    cta_label: item.cta_label || item.ctaLabel || 'Learn more',
    media_items: item.media_items || item.mediaItems || [],
    resource_links: item.resource_links || item.resourceLinks || [],
    registration_links: item.registration_links || item.registrationLinks || [],
    featured: item.featured !== false,
    visible: item.visible !== false,
    published: item.published !== false,
    display_order: item.display_order ?? item.displayOrder ?? 999,
    external: item.external !== false,
  }
}

const legacyEvents = [
  ...(eventsContent.upcoming ?? []).map((item) => mapLegacyEvent(item, 'upcoming')),
  ...(eventsContent.announcements ?? []).map((item) => mapLegacyEvent(item, 'announcement')),
  ...(eventsContent.communityNews ?? []).map((item) => mapLegacyEvent(item, 'community-news')),
  ...(eventsContent.past ?? []).map((item) => mapLegacyEvent(item, 'past')),
]

export const events = legacyEvents

export default events
