import FilteredBlogs from "@/components/FilteredBlogs";
import Link from "next/link";
import { Suspense } from "react";

const page = () => {
  return (
    <section className="px-3 md:px-0">
      <div className="mb-10 container">
        {/* Breadcrumb */}
        <nav className="mt-6 flex flex-wrap gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-indigo-600">
            Home
          </Link>
          <span>/</span>
          <span>blogs</span>
        </nav>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mt-5">
          Explore All blogs
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base mb-5">
          Filter articles by category, search instantly, and toggle loading
          states to test Suspense boundaries.
        </p>
        {/* Search, filters, and results */}
        <Suspense>
          <FilteredBlogs />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
