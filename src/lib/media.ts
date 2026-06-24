const CDN_MEDIA_BASE_URL = "https://media.turbogixxertuning.com";

export const mediaConfig = {
  defaultBaseUrl: CDN_MEDIA_BASE_URL,
  cdnBaseUrl: CDN_MEDIA_BASE_URL
} as const;

export function mediaUrl(path: string, baseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || mediaConfig.defaultBaseUrl) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const base = baseUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${base}${normalizedPath}`;
}
