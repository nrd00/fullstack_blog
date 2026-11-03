const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-indigo-50/60 via-white to-white px-4 py-10 sm:py-15">
      {/* Background decorations */}
      <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 -z-10 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
          Welcome to dev.pen
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Discover Ideas,
          <span className="mt-2 block text-indigo-600">Read Great Stories</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
          Explore our latest blog posts, learn something new, and be part of our
          growing community.
        </p>

        {/* Search form */}
        <form
          action="/blogs"
          method="GET"
          className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="ml-2 h-5 w-5 shrink-0 text-gray-400"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <input
            type="search"
            name="q"
            placeholder="Search blogs, topics, or categories..."
            aria-label="Search blog posts"
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 sm:text-base"
          />

          <button
            type="submit"
            aria-label="Search"
            className="flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          Find your next favorite read.
        </p>
      </div>
    </section>
  );
};

export default Hero;
