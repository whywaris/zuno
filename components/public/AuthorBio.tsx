import { POST_AUTHOR } from "@/lib/utils";

interface AuthorBioProps {
  name?: string;
  role?: string;
  bio?: string;
}

export default function AuthorBio({
  name = POST_AUTHOR,
  role = "Fashion & Apparel Editor",
  bio = "Curating modern wardrobe advice, fabric care insights, and contemporary fashion movements for mindful dressers worldwide.",
}: AuthorBioProps) {
  return (
    <div className="my-10 p-6 sm:p-8 bg-neutral-50 rounded-lg border border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-neutral-200 bg-neutral-900 text-white flex items-center justify-center font-serif text-xl">
        {name.split(" ").map((part) => part[0]).join("")}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-neutral-900 text-base">{name}</h3>
          <span className="text-xs bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded font-mono">
            {role}
          </span>
        </div>
        <p className="text-sm text-neutral-600 leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}

