// The reviews state their policies were checked in November 2026.
const DEFAULT_CHECKED = "November 2026";

interface ReviewMethodBoxProps {
  checked?: string;
  // Switch off for a review where a product was bought and tested.
  showDidNotBuy?: boolean;
  // Guides covering several stores rather than one.
  multipleStores?: boolean;
}

export default function ReviewMethodBox({
  checked = DEFAULT_CHECKED,
  showDidNotBuy = true,
  multipleStores = false,
}: ReviewMethodBoxProps) {
  return (
    <aside className="mb-8 p-5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-700 leading-relaxed">
      <strong className="text-neutral-900">How we reviewed this:</strong> desk
      research using {multipleStores ? "each store's" : "the store's"} own
      policy pages, Trustpilot, Reviews.io, BBB and customer reports, checked{" "}
      {checked}.
      {showDidNotBuy &&
        (multipleStores
          ? " We did not buy from these stores for this guide."
          : " We did not buy from this store for this review.")}
    </aside>
  );
}
