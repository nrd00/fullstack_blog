"use client";

import { useMemo, useState } from "react";
import { blogs } from "@/data/blogs";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function FilteredBlogs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Derive activeCategory directly from the URL (No useState or useEffect needed!)
  const activeCategory = searchParams.get("category") || "All Categories";

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to update the URL when a category is clicked
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "All Categories") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    // Reset pagination to page 1 on filter change if needed, then push URL
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const categories = useMemo(
    () => [...new Set(blogs.map((blog) => blog.category))],
    [],
  );

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All Categories" || blog.category === activeCategory;

      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        blog.author.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  function simulateLoading() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }

  // For pagination calculation
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBlogs.length / postsPerPage),
  );

  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  return (
    <div>
      {/* Filter toolbar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* Search input */}
          <div className="relative w-full xl:max-w-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* Category filters and loading button */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleCategoryChange("All Categories")}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
                activeCategory === "All Categories"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Categories
            </button>

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}

            <button
              type="button"
              onClick={simulateLoading}
              disabled={isLoading}
              className="ml-0 flex items-center gap-2 whitespace-nowrap rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-medium text-amber-700 transition hover:bg-amber-100 disabled:cursor-wait disabled:opacity-70 xl:ml-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              >
                <path d="M20 11a8 8 0 0 0-14.9-4L3 10" />
                <path d="M3 4v6h6" />
                <path d="M4 13a8 8 0 0 0 14.9 4L21 14" />
              </svg>
              {isLoading ? "Loading..." : "Simulate Loading"}
            </button>
          </div>
        </div>
      </div>

      {/* Results heading */}
      <div className="mb-5 mt-8 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filteredBlogs.length}
          </span>{" "}
          {filteredBlogs.length === 1 ? "article" : "articles"}
        </p>

        {(search || activeCategory !== "All Categories") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              handleCategoryChange("All Categories");
            }}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Blog cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.slice(0, 6).map((blog) => (
            <div
              key={blog.id}
              className="h-97.5 animate-pulse rounded-2xl border border-slate-200 bg-white"
            >
              <div className="h-52 rounded-t-2xl bg-slate-200" />
              <div className="space-y-4 p-5">
                <div className="h-3 w-1/3 rounded bg-slate-200" />
                <div className="h-5 w-full rounded bg-slate-200" />
                <div className="h-4 w-4/5 rounded bg-slate-200" />
                <div className="mt-6 h-9 w-1/2 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            No articles found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Try another search term or choose a different category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              handleCategoryChange("All Categories");
            }}
            className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Reset filters
          </button>
        </div>
      )}

      {!isLoading && filteredBlogs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
