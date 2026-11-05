// next/image throws on hosts missing from next.config.ts, which would take down
// any page showing the post, so the API and admin form validate against this list.
export const ALLOWED_IMAGE_HOSTS = [
  // ponytail: allows every public R2 bucket through the image optimizer; replace with
  // the exact pub-<id>.r2.dev host, or a custom domain, once the bucket exists.
  "*.r2.dev",
  "images.unsplash.com",
  "res.cloudinary.com",
];

export const DEFAULT_POST_IMAGE =
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=630&fit=crop";

const UPLOAD_PATH = /^\/uploads\/[\w-]+\.(jpg|png|webp|gif)$/;

// "*" stands for exactly one subdomain, as R2 public URLs have.
function matchesHost(pattern: string, hostname: string): boolean {
  return pattern.startsWith("*.")
    ? hostname.split(".").slice(1).join(".") === pattern.slice(2)
    : hostname === pattern;
}

export function isAllowedImageUrl(url: string): boolean {
  if (UPLOAD_PATH.test(url)) return true;
  try {
    const { protocol, hostname } = new URL(url);
    return protocol === "https:" && ALLOWED_IMAGE_HOSTS.some((pattern) => matchesHost(pattern, hostname));
  } catch {
    return false;
  }
}

function hasBytes(data: Uint8Array, bytes: number[], offset = 0): boolean {
  return bytes.every((byte, i) => data[offset + i] === byte);
}

const ascii = (text: string) => [...text].map((c) => c.charCodeAt(0));

// Identifies the image from its contents; the browser-sent type and filename can be forged.
export function detectImageExt(data: Uint8Array): string | null {
  if (hasBytes(data, [0xff, 0xd8, 0xff])) return ".jpg";
  if (hasBytes(data, [0x89, ...ascii("PNG"), 0x0d, 0x0a, 0x1a, 0x0a])) return ".png";
  if (hasBytes(data, ascii("GIF87a")) || hasBytes(data, ascii("GIF89a"))) return ".gif";
  if (hasBytes(data, ascii("RIFF")) && hasBytes(data, ascii("WEBP"), 8)) return ".webp";
  return null;
}
