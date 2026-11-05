import assert from "node:assert/strict";
import { test } from "node:test";
import { feedWindow, firstParam, parsePage, resolveSiteUrl } from "./utils";

test("feedWindow skips the hero post on every page of the main feed", () => {
  assert.deepEqual(feedWindow("1", 25, true, 8), { page: 1, skip: 1, totalPages: 3 });
  assert.deepEqual(feedWindow("2", 25, true, 8), { page: 2, skip: 9, totalPages: 3 });
  assert.deepEqual(feedWindow("3", 25, true, 8), { page: 3, skip: 17, totalPages: 3 });
});

test("feedWindow does not skip a post when there is no hero", () => {
  assert.deepEqual(feedWindow("2", 16, false, 8), { page: 2, skip: 8, totalPages: 2 });
});

test("feedWindow does not count the hero as an extra page", () => {
  assert.equal(feedWindow("1", 9, true, 8).totalPages, 1);
  assert.equal(feedWindow("1", 10, true, 8).totalPages, 2);
});

test("resolveSiteUrl never returns a localhost address", () => {
  assert.equal(resolveSiteUrl("http://localhost:3000"), "https://zunoclothing.com");
  assert.equal(resolveSiteUrl(undefined), "https://zunoclothing.com");
  assert.equal(resolveSiteUrl(""), "https://zunoclothing.com");
  assert.equal(resolveSiteUrl("https://example.com/"), "https://example.com");
});

test("firstParam takes the first value of a repeated parameter", () => {
  assert.equal(firstParam("a"), "a");
  assert.equal(firstParam(["a", "b"]), "a");
  assert.equal(firstParam([]), undefined);
  assert.equal(firstParam(undefined), undefined);
});

test("parsePage only returns whole numbers from 1 up", () => {
  assert.equal(parsePage("3"), 3);
  for (const bad of [undefined, "", "abc", "0", "-3"]) {
    assert.equal(parsePage(bad), 1, String(bad));
  }
});

test("feedWindow recovers from bad page values", () => {
  for (const bad of [undefined, "", "abc", "0", "-3"]) {
    assert.equal(feedWindow(bad, 25, true, 8).page, 1, String(bad));
  }
  assert.deepEqual(feedWindow("999", 25, true, 8), { page: 3, skip: 17, totalPages: 3 });
  assert.deepEqual(feedWindow("1", 0, true, 8), { page: 1, skip: 1, totalPages: 1 });
});
