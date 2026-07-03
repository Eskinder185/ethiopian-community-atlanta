import rawPrograms from '../content/programs.json'
import { programsAmharicFallbackBySlug } from './programsAmharicFallback'

/** Map JSON program records into snake_case fallback rows for Supabase-shaped consumers. */
function mapFallbackProgram(program, index) {
  const slug = program.slug || program.id || ''
  const contentAm = program.content_am ?? programsAmharicFallbackBySlug[slug] ?? null

  return {
    id: program.id || slug,
    slug,
    initials: program.initials ?? '',
    category: program.category ?? '',
    title: program.title ?? '',
    subtitle: program.subtitle ?? '',
    short_description: program.shortDescription ?? program.description ?? '',
    full_description: program.fullDescription ?? '',
    page_intro: program.pageIntro ?? '',
    status_label: program.statusLabel ?? 'Details Coming Soon',
    placeholder_details: program.placeholderDetails ?? [],
    detail_sections: program.detailSections ?? [],
    media_items: program.mediaItems ?? [],
    resource_links: program.resourceLinks ?? [],
    registration_links: program.registrationLinks ?? [],
    registration_empty_message: program.registrationEmptyMessage ?? '',
    media_empty_message: program.mediaEmptyMessage ?? '',
    interest_form_label: program.interestFormLabel ?? '',
    interest_form_link: program.interestFormLink ?? '',
    button_label: program.buttonLabel ?? 'View Program Details',
    button_link: program.buttonLink ?? `/programs/${slug}`,
    legal_notice: program.legalNotice ?? '',
    visible: program.visible !== false,
    featured: program.featured !== false,
    display_order: typeof program.displayOrder === 'number' ? program.displayOrder : index + 1,
    published: program.published !== false,
    content_am: contentAm,
  }
}

export const programs = (rawPrograms.mainPrograms ?? []).map(mapFallbackProgram)

export default programs
