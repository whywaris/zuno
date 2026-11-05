import assert from "node:assert/strict";
import { test } from "node:test";
import { detectImageExt, isAllowedImageUrl } from "./images";
import { getJwtSecret } from "./jwt";

test("detectImageExt trusts contents only", () => {
  const bytes = (...b: number[]) => Uint8Array.from(b);
  const text = (s: string) => new TextEncoder().encode(s);

  assert.equal(detectImageExt(bytes(0xff, 0xd8, 0xff, 0xe0)), ".jpg");
  assert.equal(detectImageExt(bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)), ".png");
  assert.equal(detectImageExt(text("GIF89a...")), ".gif");
  assert.equal(detectImageExt(text("RIFF0000WEBPVP8 ")), ".webp");

  assert.equal(detectImageExt(text("<script>alert(1)</script>")), null);
  assert.equal(detectImageExt(text("<svg xmlns='http://www.w3.org/2000/svg'/>")), null);
  assert.equal(detectImageExt(text("RIFF0000WAVEfmt ")), null);
  assert.equal(detectImageExt(bytes()), null);
});

test("isAllowedImageUrl accepts only uploads and listed https hosts", () => {
  assert.ok(isAllowedImageUrl("/uploads/1700000000000-abc123.png"));
  assert.ok(isAllowedImageUrl("https://images.unsplash.com/photo-1?w=1200"));
  assert.ok(isAllowedImageUrl("https://res.cloudinary.com/demo/image.jpg"));
  assert.ok(isAllowedImageUrl("https://pub-abc123.r2.dev/looks/coat.webp"));

  for (const bad of [
    "https://evil.example/a.png",
    "https://r2.dev/a.png",
    "https://a.b.r2.dev/a.png",
    "https://evilr2.dev/a.png",
    "https://pub-abc.r2.dev.evil.example/a.png",
    "https://images.unsplash.com.evil.example/a.png",
    "http://images.unsplash.com/a.png",
    "/uploads/../../etc/passwd",
    "/uploads/page.html",
    "javascript:alert(1)",
    "not a url",
  ]) {
    assert.equal(isAllowedImageUrl(bad), false, bad);
  }
});

test("getJwtSecret refuses a missing or short secret", () => {
  const original = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET;
    assert.throws(getJwtSecret);
    process.env.JWT_SECRET = "too-short";
    assert.throws(getJwtSecret);
    process.env.JWT_SECRET = "x".repeat(32);
    assert.equal(getJwtSecret().length, 32);
  } finally {
    process.env.JWT_SECRET = original;
  }
});
