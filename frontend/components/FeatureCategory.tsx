import Link from "next/link";
import { blogs } from "@/data/blogs";

const categoryStyles = [
  { initial: "E", color: "bg-emerald-50 text-emerald-600" },
  { initial: "D", color: "bg-blue-50 text-blue-600" },
  { initial: "A", color: "bg-violet-50 text-violet-600" },
  { initial: "J", color: "bg-amber-50 text-amber-600" },
  { initial: "B", color: "bg-rose-50 text-rose-600" },
  { initial: "D", color: "bg-cyan-50 text-cyan-600" },
];

const FeatureCategory = () => {
  // Generate unique categories and count their articles
  const categories = Array.from(
    new Set(blogs.map((blog) => blog.category)),
  ).map((category) => ({
    name: category,
    count: blogs.filter((blog) => blog.category === category).length,
  }));

  // Display only 4 categories on the homepage
  const visibleCategories = categories.slice(0, 4);

  return (
    <section className="bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="container">
        {/* Section heading */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6 text-indigo-600"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
            </svg>
            Explore Categories
          </h2>

          <Link
            href="/categories"
            className="flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            Browse all <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleCategories.map((category) => {
            const index = categories.findIndex(
              (item) => item.name === category.name,
            );
            const style = categoryStyles[index % categoryStyles.length];

            return (
              <Link
                key={category.name}
                href={`/blogs?category=${encodeURIComponent(category.name)}`}
                className="group flex min-h-38.5 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold ${style.color}`}
                >
                  {style.initial}
                </span>

                <h3 className="mt-3 font-bold text-slate-900 transition group-hover:text-indigo-600">
                  {category.name}
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                  {category.count}{" "}
                  {category.count === 1 ? "article" : "articles"} published
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCategory;
