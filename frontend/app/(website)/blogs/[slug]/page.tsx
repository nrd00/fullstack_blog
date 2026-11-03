import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";

type BlogDetailsProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: BlogDetailsProps) {
  const { slug } = await params;
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    title: blog.title,
    description: blog.description,
    alternates: siteUrl
      ? { canonical: `${siteUrl}/blogs/${blog.slug}` }
      : undefined,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: new Date(blog.date).toISOString(),
      authors: [blog.author],
      images: blog.image ? [blog.image] : [],
    },
  };
}

export default async function BlogDetailsPage({ params }: BlogDetailsProps) {
  const { slug } = await params;
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) notFound();

  const relatedBlogs = blogs
    .filter(
      (item) => item.category === blog.category && item.slug !== blog.slug,
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 p-8 sm:px-6 lg:px-8">
      <article className="container">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-emerald-600">
            Blogs
          </Link>
          <span>/</span>
          <span className="text-slate-800">{blog.title}</span>
        </nav>

        {/* Header */}
        <header>
          <Link
            href={`/blogs?category=${encodeURIComponent(blog.category)}`}
            className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
          >
            {blog.category}
          </Link>

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            {blog.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4 border-y border-slate-200 py-5">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${blog.avatarColor}`}
            >
              {blog.initials}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-slate-900">{blog.author}</p>
              <p className="mt-1 text-sm text-slate-500">{blog.role}</p>
            </div>

            <div className="text-sm text-slate-500">
              <p>{blog.date}</p>
              <p className="mt-1">{blog.readTime}</p>
            </div>
          </div>
        </header>

        {/* Featured image */}
        {blog.image && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-slate-200">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Article content */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm sm:px-3 sm:py-3">
          <div className="p-6">
            {blog.content?.length ? (
              <div className="space-y-8">
                {blog.content.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {section.heading}
                    </h2>

                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-base leading-8 text-slate-600"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <p className="text-base leading-8 text-slate-600">
                {blog.description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href="/blogs"
          className="mt-8 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          ← Back to all articles
        </Link>

        {/* Related posts */}
        {relatedBlogs.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Related Posts
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              More articles from {blog.category}.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((related) => (
                <Link
                  key={related.id}
                  href={`/blogs/${related.slug}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {related.image && (
                    <div className="relative aspect-16/10 bg-slate-100">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    <span className="text-xs font-semibold text-emerald-700">
                      {related.category}
                    </span>
                    <h3 className="mt-2 line-clamp-2 font-bold leading-6 text-slate-900">
                      {related.title}
                    </h3>
                    <p className="mt-3 text-xs text-slate-500">
                      {related.date} · {related.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
