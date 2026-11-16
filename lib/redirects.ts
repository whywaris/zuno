// Merged articles: the weaker URL redirects to the one that keeps the content.
// Turn on only after the text of each pair has been merged by hand.
export const MERGE_REDIRECTS_ENABLED = false;

export const MERGE_REDIRECTS = [
  { from: "best-budget-anime-clothing-websites", to: "anime-clothes-on-a-budget" },
  { from: "official-vs-bootleg-anime-merch", to: "how-to-check-if-anime-store-is-legit" },
];

export const REDIRECTED_SLUGS = new Set(
  MERGE_REDIRECTS_ENABLED ? MERGE_REDIRECTS.map((r) => r.from) : []
);
