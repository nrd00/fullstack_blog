import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/data/blogs";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Blog image */}
      <Link
        href={`/blogs/${blog.slug}`}
        aria-label={`Read ${blog.title}`}
        className="relative block h-52 overflow-hidden bg-slate-100"
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-medium text-white">
          {blog.category}
        </span>
      </Link>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>

        <Link href={`/blogs/${blog.slug}`} className="mt-2">
          <h2 className="line-clamp-2 text-lg font-bold leading-7 text-slate-900 transition group-hover:text-indigo-600">
            {blog.title}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">
          {blog.description}
        </p>

        <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${blog.avatarColor}`}
          >
            {blog.initials}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-900">
              {blog.author}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-slate-500">
              {blog.role}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
