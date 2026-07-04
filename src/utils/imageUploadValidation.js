export function isBadPublishedImageUrl(value) {
  if (!value) return false;
  return (
    value.startsWith("blob:") ||
    value.startsWith("file:") ||
    value.startsWith("C:\\") ||
    value.startsWith("/Users/")
  );
}

export function assertPublishableImageUrl(finalImageUrl, hadSelectedFile = false) {
  if (hadSelectedFile && !finalImageUrl) {
    throw new Error("Image upload failed. No public URL was returned.");
  }

  if (isBadPublishedImageUrl(finalImageUrl)) {
    throw new Error("Local preview URLs cannot be published. Please upload the image again.");
  }
}
