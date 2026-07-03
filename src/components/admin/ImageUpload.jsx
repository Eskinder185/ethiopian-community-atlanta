import { uploadMedia } from '../../lib/uploadMedia'

export default function ImageUpload({
  id = 'image-upload',
  label = 'Upload image',
  hint,
  disabled = false,
  uploadFolder,
  onUploaded,
  onChange,
  ...props
}) {
  const handleChange = async (event) => {
    const file = event.target.files?.[0]

    if (file && uploadFolder) {
      const url = await uploadMedia(file, { uploadFolder })
      onUploaded?.(url)
    }

    onChange?.(event)
  }

  const resolvedHint =
    hint ||
    (uploadFolder
      ? `Uploads to ecaa-media/${uploadFolder.replace(/^\/+/, '').replace(/\/+$/, '')} when Supabase storage is configured.`
      : 'Select an image file to upload.')

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ecaa-ink">
          {label}
        </label>
      )}
      <input
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        disabled={disabled}
        onChange={handleChange}
        className="block w-full text-sm text-ecaa-ink-muted file:mr-3 file:rounded-lg file:border-0 file:bg-ecaa-green-900 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-ecaa-white hover:file:bg-ecaa-green-800 disabled:opacity-50"
        {...props}
      />
      {resolvedHint && <p className="mt-1.5 text-xs text-ecaa-ink-subtle">{resolvedHint}</p>}
    </div>
  )
}
