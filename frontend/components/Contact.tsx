"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MessageCircle, CheckCircle2 } from "lucide-react";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Connect your backend or email service here.
    // This demo only shows a success message.
    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Get in touch
          </span>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Let&apos;s start a conversation.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
            Have a question, an idea, or feedback about our articles? We&apos;d
            love to hear from you. Send us a message and let&apos;s connect.
          </p>
        </div>

        {/* Main content */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Contact information */}
          <aside className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">
                We&apos;re here to help.
              </h2>

              <p className="mt-3 leading-7 text-neutral-600">
                Whether you have a question about a tutorial, want to suggest a
                topic, or are interested in collaborating, feel free to reach
                out.
              </p>
            </div>

            <div className="flex gap-4 rounded-2xl border border-neutral-200 p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                <Mail size={20} />
              </div>

              <div>
                <h3 className="font-medium">Email inquiries</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  Questions, corrections, and feedback about our content.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-neutral-200 p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                <MessageCircle size={20} />
              </div>

              <div>
                <h3 className="font-medium">Ideas & collaboration</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  Suggest an article or discuss a potential collaboration.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-neutral-950 p-6 text-white">
              <h3 className="text-lg font-medium">Have an article idea?</h3>

              <p className="mt-2 text-sm leading-6 text-neutral-300">
                We&apos;re always interested in useful topics, practical
                tutorials, and new perspectives.
              </p>
            </div>
          </aside>

          {/* Contact form */}
          <div className="rounded-2xl border border-neutral-200 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Send us a message
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Fill out the form below and tell us how we can help.
            </p>

            {submitted && (
              <div
                role="status"
                className="mt-6 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
              >
                <CheckCircle2 size={20} className="shrink-0" />
                <p>
                  Your form passed validation. Connect a backend or email
                  service to deliver your message.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us a little more about your inquiry..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  className="w-full resize-y rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 sm:w-auto"
              >
                Send message
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

              <p className="text-xs leading-5 text-neutral-500">
                Please don&apos;t include passwords or other sensitive
                information in your message.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
