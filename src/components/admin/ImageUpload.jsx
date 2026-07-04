import { useState } from "react";
import { uploadToSupabaseStorage } from "../../utils/uploadToSupabaseStorage";

export default function ImageUpload({
  id = "image-upload",
  label = "Upload image",
  hint,
  disabled = false,
  uploadFolder,
  uploadOnSelect = true,
  onUploaded,
  onFileSelect,
  onUploadError,
  onChange,
  ...props
}) {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (event) => {
    const file = event.target.files?.[0];
    onChange?.(event);

    if (!file || !uploadFolder || disabled) return;

    if (!uploadOnSelect) {
      onFileSelect?.(file);
      return;
    }

    setUploading(true);
    try {
      const url = await uploadToSupabaseStorage(file, uploadFolder);
      onUploaded?.(url);
    } catch (error) {
      console.error("Supabase image upload failed:", error);
      onUploadError?.(error);
    } finally {
      setUploading(false);
    }
  };

  const resolvedHint =
    hint ||
    (uploadFolder
      ? `Uploads to ecaa-media/${uploadFolder.replace(/^\/+/, "").replace(/\/+$/, "")} in Supabase Storage.`
      : "Select an image file to upload.");

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
        disabled={disabled || uploading}
        onChange={handleChange}
        className="block w-full text-sm text-ecaa-ink-muted file:mr-3 file:rounded-lg file:border-0 file:bg-ecaa-green-900 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-ecaa-white hover:file:bg-ecaa-green-800 disabled:opacity-50"
        {...props}
      />
      {uploading && <p className="mt-1.5 text-xs font-medium text-ecaa-green-800">Uploading…</p>}
      {resolvedHint && <p className="mt-1.5 text-xs text-ecaa-ink-subtle">{resolvedHint}</p>}
    </div>
  );
}
