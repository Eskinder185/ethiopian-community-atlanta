import { supabase } from './supabaseClient'

const STORAGE_BUCKET = 'ecaa-media'

function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
}

function sanitizeFolder(uploadFolder = '') {
  return uploadFolder.replace(/^\/+/, '').replace(/\/+$/, '')
}

function sanitizeFileName(fileName = '') {
  return fileName.replace(/\s+/g, '-')
}

/**
 * Upload a community media file to Supabase Storage.
 * Website design images belong in public/images/ — not here.
 */
export async function uploadMedia(file, options = {}) {
  const { uploadFolder = 'media-gallery/photos' } = options
  if (!file) return ''

  const folder = sanitizeFolder(uploadFolder)
  const safeName = sanitizeFileName(file.name)
  const storagePath = `${folder}/${Date.now()}-${safeName}`

  if (!hasSupabaseConfig()) {
    return `/uploads/${file.name}`
  }

  try {
    const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(storagePath, file, {
      upsert: true,
    })
    if (error) throw error

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath)
    return data.publicUrl
  } catch (error) {
    console.warn('Media upload failed; use manual URL or /uploads path.', error)
    return `/uploads/${file.name}`
  }
}
