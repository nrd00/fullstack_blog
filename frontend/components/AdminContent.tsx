"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import {
  FileText,
  Eye,
  Layers3,
  PlusCircle,
  TrendingUp,
  ArrowUpRight,
  Pencil,
  Pen,
  Trash,
} from "lucide-react";

const dashboardStats = [
  {
    title: "Total Posts",
    value: "24",
    description: "+3 published this week",
    icon: FileText,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Total Views",
    value: "12,480",
    description: "+18.6% vs last month",
    icon: Eye,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Published Posts",
    value: "18",
    description: "6 posts awaiting publication",
    icon: Layers3,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <Suspense>
      <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8">
        <div className="container space-y-7">
          {/* Page Header */}
          <header className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Content Management Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Manage blog posts, create new content, and monitor engagement.
              </p>
            </div>

            <Link
              href="/blogs/new"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <PlusCircle size={18} />
              Create New Post
            </Link>
          </header>

          {/* Two Tabs */}
          <nav className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                activeTab === "overview"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              Dashboard Overview
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                activeTab === "blogs"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              Post Management ({blogs.length})
            </button>
          </nav>

          {/* Dashboard Overview */}
          {activeTab === "overview" && (
            <section className="space-y-7">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {dashboardStats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <article
                      key={stat.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">
                          {stat.title}
                        </p>

                        <div
                          className={`rounded-lg p-2.5 ${stat.bg} ${stat.color}`}
                        >
                          <Icon size={20} />
                        </div>
                      </div>

                      <h2 className="mt-4 text-3xl font-bold tracking-tight">
                        {stat.value}
                      </h2>

                      <p className="mt-2 text-sm text-emerald-600">
                        {stat.description}
                      </p>
                    </article>
                  );
                })}
              </div>

              {/* Recent Activity */}
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Recent Post Activity</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Track your latest articles and performance.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab("blogs")}
                    className="inline-flex items-center gap-2 self-start text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    View all blogs
                    <ArrowUpRight size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  {blogs.slice(0, 3).map((post) => (
                    <article
                      key={post.slug}
                      className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                          <FileText size={22} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold">
                            {post.title}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            {post.date} · {post.category}
                          </p>
                          <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                            <Eye size={13} />
                            {/* Generates a consistent number between 150 and 2650 based on the blog ID */}
                            {((post.id * 317) % 2500) + 150} views
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <Link
                          href={`/blogs/${post.slug}`}
                          aria-label={`Edit ${post.title}`}
                          className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <Eye size={15} />
                        </Link>

                        <Link
                          href={`/blogs/${post.id}/edit`}
                          aria-label={`Edit ${post.title}`}
                          className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <Pencil size={15} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Quick Shortcuts */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Link
                  href="/blogs/new"
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm"
                >
                  <div>
                    <h3 className="font-semibold">Create a new article</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Start writing your next blog post.
                    </p>
                  </div>
                  <PlusCircle
                    className="text-emerald-600 transition group-hover:scale-110"
                    size={24}
                  />
                </Link>

                <button
                  onClick={() => setActiveTab("blogs")}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:border-blue-300 hover:shadow-sm"
                >
                  <div>
                    <h3 className="font-semibold">Manage your content</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Review drafts and published articles.
                    </p>
                  </div>
                  <TrendingUp className="text-blue-600" size={24} />
                </button>
              </div>
            </section>
          )}

          {/* Post Management */}
          {activeTab === "blogs" && (
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold">Post Management</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Manage, review, and edit your articles.
                  </p>
                </div>

                <Link
                  href="/blogs/new"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <PlusCircle size={17} />
                  New Post
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full mx-auto text-left text-sm">
                  <thead className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr className="grid grid-cols-[5fr_3fr_3fr_3fr_3fr]">
                      <th className="px-6 py-4 font-semibold">Post Title</th>
                      <th className="px-6 py-4 font-semibold">Category</th>
                      <th className="px-6 py-4 font-semibold">Author</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 text-right font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {blogs.map((post) => (
                      <tr
                        key={post.slug}
                        className="hover:bg-slate-50 grid grid-cols-[5fr_3fr_3fr_3fr_3fr]"
                      >
                        <td className="px-6 py-5 font-semibold text-slate-800">
                          {post.title}
                        </td>
                        <td className="px-6 py-5 text-slate-500">
                          {post.category}
                        </td>
                        <td className="px-6 py-5 text-slate-500">
                          {post.author}
                        </td>
                        <td className="px-6 py-5 text-slate-600">
                          {post.date}
                        </td>

                        <td className="px-6 py-5 text-right">
                          <Link
                            href={`/blogs/${post.slug}`}
                            aria-label={`Edit ${post.title}`}
                            className="inline-flex rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                          >
                            <Eye size={20} />
                          </Link>

                          <Link
                            href={`/blogs/${post.slug}/edit`}
                            aria-label={`Edit ${post.title}`}
                            className="inline-flex rounded-lg p-2 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-900"
                          >
                            <Pen size={20} />
                          </Link>

                          <Link
                            href={`/blogs/${post.slug}/edit`}
                            aria-label={`Edit ${post.title}`}
                            className="inline-flex rounded-lg p-2 text-red-500 hover:bg-red-100 hover:text-red-900"
                          >
                            <Trash size={20} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
                Showing {blogs.length} blogs
              </div>
            </section>
          )}
        </div>
      </main>
    </Suspense>
  );
};

export default AdminContent;
