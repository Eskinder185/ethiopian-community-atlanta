import { supabase } from "../lib/supabaseClient";

export async function uploadToSupabaseStorage(file, folder = "media-gallery/photos") {
  if (!file) return "";

  const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";

  const safeBaseName = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const uniqueId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const filePath = `${folder.replace(/^\/+|\/+$/g, "")}/${Date.now()}-${uniqueId}-${safeBaseName}.${fileExt}`;

  console.log("Starting Supabase upload:", {
    bucket: "ecaa-media",
    filePath,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  });

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("ecaa-media")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "image/jpeg",
    });

  if (uploadError) {
    console.error("Supabase Storage upload failed:", uploadError);
    throw new Error(uploadError.message || "Image upload failed.");
  }

  const savedPath = uploadData?.path || filePath;

  const { data: publicUrlData } = supabase.storage.from("ecaa-media").getPublicUrl(savedPath);

  const publicUrl = publicUrlData?.publicUrl;

  if (!publicUrl) {
    throw new Error("Upload succeeded, but Supabase did not return a public URL.");
  }

  console.log("Supabase upload complete:", {
    savedPath,
    publicUrl,
  });

  return publicUrl;
}

export async function verifyUploadedImageUrl(publicUrl) {
  if (!publicUrl) return;

  try {
    const response = await fetch(publicUrl, { method: "HEAD" });
    console.log("Uploaded image public URL test:", {
      url: publicUrl,
      status: response.status,
      ok: response.ok,
    });

    if (response.status === 401 || response.status === 403 || response.status === 404) {
      throw new Error(
        `Image uploaded but public URL is not accessible (${response.status}). Check Supabase Storage bucket policies for ecaa-media.`
      );
    }
  } catch (verifyError) {
    if (verifyError?.message?.includes("public URL is not accessible")) {
      throw verifyError;
    }
    console.warn("Uploaded image public URL test could not complete:", verifyError);
  }
}
