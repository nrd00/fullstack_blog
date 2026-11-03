import Link from "next/link";
import { blogs } from "@/data/blogs";

const categoryDescriptions: Record<string, string> = {
  Engineering:
    "Latest discussions, guides, and architectural breakdowns regarding Engineering.",
  Design:
    "Explore UI design, design systems, accessibility, and modern frontend experiences.",
  "Artificial Intelligence":
    "Discover AI tools, intelligent agents, LLMs, and practical AI applications.",
  JavaScript:
    "Learn modern JavaScript, React performance, and reusable development patterns.",
  Backend:
    "Explore REST APIs, databases, server architecture, and scalable backend systems.",
  DevOps:
    "Learn containerization, deployment workflows, automation, and DevOps best practices.",
};

const categoryStyles: Record<string, string> = {
  Engineering: "bg-emerald-50 text-emerald-600",
  Design: "bg-blue-50 text-blue-600",
  "Artificial Intelligence": "bg-violet-50 text-violet-600",
  JavaScript: "bg-amber-50 text-amber-600",
  Backend: "bg-rose-50 text-rose-600",
  DevOps: "bg-cyan-50 text-cyan-600",
};

const page = () => {
  const categories = [...new Set(blogs.map((blog) => blog.category))];
  return (
    <main className="px-2.5 pb-10 md:px-0">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pt-6 flex flex-wrap gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-indigo-600">
            Home
          </Link>
          <span>/</span>
          <span>categories</span>
        </nav>
        {/* Page heading */}
        <div className="mb-10 mt-5">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explore Categories
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Browse articles grouped by core technical domains and topics.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const categoryBlogs = blogs.filter(
              (blog) => blog.category === category,
            );

            const latestBlogs = categoryBlogs.slice(0, 2);

            const categorySlug = encodeURIComponent(category);
            const categoryColor =
              categoryStyles[category] ?? "bg-slate-100 text-slate-600";

            return (
              <article
                key={category}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Icon and article count */}
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold ${categoryColor}`}
                  >
                    {category.charAt(0)}
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                    {categoryBlogs.length}{" "}
                    {categoryBlogs.length === 1 ? "article" : "articles"}
                  </span>
                </div>

                {/* Category information */}
                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  {category}
                </h2>

                <p className="mt-1 min-h-12 text-sm leading-5 text-slate-500">
                  {categoryDescriptions[category] ??
                    `Explore the latest articles and tutorials about ${category}.`}
                </p>

                {/* Latest articles */}
                <div className="mt-5 space-y-3">
                  {latestBlogs.map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/blogs/${blog.slug}`}
                      className="group flex min-h-10 items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-3 transition hover:bg-emerald-50"
                    >
                      <span className="line-clamp-2 text-xs font-semibold leading-5 text-slate-700 transition group-hover:text-indigo-700">
                        {blog.title}
                      </span>

                      <span className="shrink-0 text-base text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-600">
                        ›
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Browse category */}
                <Link
                  href={`/blogs?category=${categorySlug}`}
                  className="mt-auto flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  <span className="truncate">View All in {category}</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default page;
