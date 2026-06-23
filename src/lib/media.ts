const DEFAULT_MEDIA_BASE = "/media";

export const mediaConfig = {
  defaultBaseUrl: DEFAULT_MEDIA_BASE,
  futureBaseUrl: "https://media.turbogixxertuning.com"
} as const;

export function mediaUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const base = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || mediaConfig.defaultBaseUrl).replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${base}${normalizedPath}`;
}
