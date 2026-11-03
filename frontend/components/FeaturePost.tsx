import { blogs } from "@/data/blogs";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

const FeaturePost = () => {
  const featuredBlogs = blogs.filter((blog) => blog.featured).slice(0, 3);
  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="container">
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              ♧ Featured Posts
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Hand-picked editorial highlights and deep-dives
            </p>
          </div>

          <Link
            href="/blogs"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {featuredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturePost;
