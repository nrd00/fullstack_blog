import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Feather,
  Heart,
  Lightbulb,
  PenLine,
  Sparkles,
  Users,
} from "lucide-react";

const values = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Ideas that matter",
    description:
      "We believe every great idea begins with curiosity. We share thoughtful perspectives that inspire people to question, learn, and see the world differently.",
  },
  {
    number: "02",
    icon: Feather,
    title: "Writing with purpose",
    description:
      "Good writing does more than fill a page. It connects people, makes complex ideas easier to understand, and turns everyday experiences into meaningful stories.",
  },
  {
    number: "03",
    icon: Users,
    title: "A community of thinkers",
    description:
      "We are building a welcoming space where writers, learners, and curious minds can exchange knowledge, share experiences, and grow together.",
  },
];

const topics = [
  "Technology",
  "Personal Growth",
  "Design",
  "Creativity",
  "Lifestyle",
  "Ideas & Culture",
];

const page = () => {
  return (
    <main className="overflow-hidden bg-white text-[#171717]">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pb-18 sm:pt-28 lg:pb-20 lg:pt-20">
        <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-medium tracking-wide text-gray-600">
              <Sparkles size={14} />A SPACE FOR CURIOUS MINDS
            </div>

            <h1 className="max-w-4xl text-5xl font-medium leading-[1.08] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[88px]">
              Stories worth
              <br />
              <span className="text-gray-400">thinking about.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-500 sm:text-lg">
              We believe the right words can spark new ideas, change
              perspectives, and bring people closer together. This is a place
              for stories that stay with you long after you finish reading.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/blogs"
                className="group inline-flex items-center gap-3 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-black"
              >
                Explore
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#our-story"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3.5 text-sm font-medium transition hover:border-black/30"
              >
                Our story
                <ArrowDownRight size={16} />
              </a>
            </div>
          </div>

          {/* Editorial visual */}
          <div className="relative mx-auto w-full max-w-md lg:ml-auto">
            <div className="relative flex min-h-77.5 flex-col justify-between overflow-hidden rounded-[28px] bg-[#ece9e3] p-7 sm:min-h-95 sm:p-9">
              <div className="absolute -right-12 -top-16 size-64 rounded-full border border-black/10" />
              <div className="absolute -right-2 -top-6 size-44 rounded-full border border-black/10" />
              <div className="absolute -bottom-24 -left-12 size-64 rounded-full bg-[#d9d2c7]" />

              <div className="relative z-10 flex items-center justify-between">
                <BookOpen size={27} strokeWidth={1.4} />
                <span className="text-xs tracking-[0.2em] text-gray-500">
                  EST. WITH CURIOSITY
                </span>
              </div>

              <div className="relative z-10 py-10">
                <p className="text-sm text-gray-500">A simple thought</p>
                <p className="mt-3 max-w-xs text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
                  Read deeply.
                  <br />
                  <span className="text-gray-500">Think freely.</span>
                </p>
              </div>

              <div className="relative z-10 flex items-end justify-between">
                <p className="max-w-47.5 text-sm leading-6 text-gray-600">
                  Every story is an invitation to discover something new.
                </p>
                <div className="flex size-12 items-center justify-center rounded-full border border-black/15">
                  <ArrowDownRight size={21} />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 right-5 rounded-full border border-black/5 bg-white px-4 py-2.5 text-xs text-gray-500 shadow-sm sm:right-8">
              Made for the love of ideas.
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section
        id="our-story"
        className="border-y border-black/5 bg-[#f8f8f7] px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="mb-5 text-xs font-medium tracking-[0.25em] text-gray-500">
              WHY WE EXIST
            </p>
            <h2 className="max-w-md text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
              The internet needs more meaningful conversations.
            </h2>
          </div>

          <div className="max-w-2xl space-y-6 text-base leading-8 text-gray-600 sm:text-lg">
            <p>
              We started with a simple belief: everyone has something worth
              sharing, and everyone has something new to learn. Somewhere
              between endless scrolling and constant notifications, we wanted to
              create a quieter corner of the internet.
            </p>

            <p>
              A place where ideas have room to breathe, where thoughtful writing
              matters more than noise, and where readers can discover
              perspectives beyond their everyday experiences.
            </p>

            <p>
              Whether you are exploring a new technology, reflecting on personal
              growth, or sharing a lesson from your own journey, you belong
              here. Our goal is to make learning feel natural and writing feel
              rewarding.
            </p>

            <div className="border-l-2 border-black pl-5 pt-2">
              <p className="text-xl font-medium leading-relaxed tracking-tight text-[#171717] sm:text-2xl">
                The best stories don{"'"}t just tell us something new. They help
                us see something familiar in a different way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.25em] text-gray-500">
              WHAT GUIDES US
            </p>
            <h2 className="text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
              More than just words.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-gray-500 sm:text-base">
            The principles behind every story we publish and every idea we
            choose to share.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {values.map(({ number, icon: Icon, title, description }) => (
            <article
              key={number}
              className="group rounded-2xl border border-black/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.04)] sm:p-8"
            >
              <div className="mb-12 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#f5f5f4] transition group-hover:bg-[#ececea]">
                  <Icon size={21} strokeWidth={1.6} />
                </div>
                <span className="text-sm text-gray-400">{number}</span>
              </div>

              <h3 className="text-xl font-medium tracking-tight">{title}</h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="border-y border-black/5 bg-[#f8f8f7] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.25em] text-gray-500">
              SOMETHING FOR EVERY CURIOUS MIND
            </p>
            <h2 className="max-w-lg text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
              Follow your curiosity wherever it leads.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-gray-500">
              From practical guides to personal reflections, explore topics that
              help you understand the world and yourself a little better.
            </p>
          </div>

          <div className="flex flex-wrap content-center gap-3">
            {topics.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm text-gray-700 transition hover:border-black/30 hover:text-black"
              >
                {topic}
                <ArrowUpRight size={14} className="text-gray-400" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl rounded-[28px] bg-[#171717] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full border border-white/20">
            <PenLine size={23} strokeWidth={1.5} />
          </div>

          <p className="mb-4 text-xs font-medium tracking-[0.25em] text-white/50">
            YOUR STORY MATTERS
          </p>

          <h2 className="mx-auto max-w-2xl text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-6xl">
            Have an idea worth sharing?
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
            Discover new perspectives, find inspiration, and become part of a
            community that believes in the power of words.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-gray-200"
            >
              Start exploring
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/authform"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Join the community
              <Heart size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
