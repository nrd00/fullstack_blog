export type BlogContentSection = {
  heading: string;
  paragraphs: string[];
};

export type Blog = {
  id: number;
  slug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  role: string;
  initials: string;
  color: string;
  avatarColor: string;
  featured: boolean;
  tags: string[];
  content: BlogContentSection[];
};

export const blogs: Blog[] = [
  {
    id: 1,
    slug: "mastering-nextjs-app-router",
    category: "Engineering",
    title: "Mastering Next.js App Router: Server Components & Actions",
    description:
      "Building a modern web application involves more than creating reusable components. Next.js App Router introduces a server-first approach that changes how developers fetch data, organize routes, handle mutations, and deliver fast user experiences. In this guide, we explore Server Components, Server Actions, and practical architectural decisions for building maintainable applications.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    author: "Sarah Jenkins",
    role: "Principal Architect",
    initials: "SJ",
    color: "bg-emerald-500",
    avatarColor: "bg-emerald-600",
    featured: true,
    tags: [
      "Next.js",
      "React",
      "App Router",
      "Server Components",
      "Web Development",
    ],
    content: [
      {
        heading: "Understanding Server Components",
        paragraphs: [
          "React Server Components allow components to render on the server. They help developers fetch data close to its source and reduce the JavaScript sent to the browser.",
          "Use Server Components by default, and add the use client directive when you need state, event handlers, or browser APIs.",
        ],
      },
      {
        heading: "Working with Server Actions",
        paragraphs: [
          "Server Actions let you execute server-side functions from forms and interactive UI. They are useful for creating posts, updating records, and submitting user input.",
          "Always validate incoming data and verify authorization on the server before performing sensitive operations.",
        ],
      },
      {
        heading: "Building Maintainable Applications",
        paragraphs: [
          "Organize routes clearly, use loading and error boundaries, and keep data access close to the features that need it.",
          "Combining server rendering with client interactivity selectively helps balance performance and user experience.",
        ],
      },
    ],
  },

  {
    id: 2,
    slug: "tailwind-css-v4-guide",
    category: "Design",
    title: "Tailwind CSS v4: Blazing Fast Styling with CSS-First Configuration",
    description:
      "Creating consistent interfaces becomes difficult when design tokens and styles are scattered across a growing project. Tailwind CSS v4 introduces a CSS-first configuration model and an updated compilation engine that simplify modern styling workflows. Learn how theme variables, utility classes, and reusable components can help you build responsive interfaces more efficiently.",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2",
    date: "Oct 10, 2026",
    readTime: "4 min read",
    author: "Alex Rivera",
    role: "Design Systems Lead",
    initials: "AR",
    color: "bg-blue-500",
    avatarColor: "bg-blue-500",
    featured: true,
    tags: [
      "Tailwind CSS",
      "CSS",
      "Frontend",
      "Responsive Design",
      "Design Systems",
    ],
    content: [
      {
        heading: "A CSS-First Configuration",
        paragraphs: [
          "Tailwind CSS v4 lets you configure many design tokens directly in your CSS using theme variables. This makes colors, spacing, and typography easier to maintain alongside your styles.",
          "Existing projects may need migration adjustments, so check compatibility before upgrading plugins or build tooling.",
        ],
      },
      {
        heading: "Building Reusable Interfaces",
        paragraphs: [
          "Utility classes help you create consistent layouts without repeatedly switching between component files and separate stylesheets.",
          "Extract repeated patterns into reusable React components, and use responsive variants to adapt layouts to different screen sizes.",
        ],
      },
    ],
  },

  {
    id: 3,
    slug: "ai-agents-modern-web",
    category: "Artificial Intelligence",
    title: "Integrating Autonomous AI Agents into Modern Web Applications",
    description:
      "AI-powered applications are evolving beyond simple question-and-answer interfaces. By connecting language models with tools, APIs, and application data, developers can build agents that complete multi-step tasks and respond to changing information. This article explores agent architecture, tool calling, reliability, and the safeguards needed to integrate AI into real-world web applications.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    date: "Oct 08, 2026",
    readTime: "7 min read",
    author: "Dr. Elena Rostova",
    role: "AI Research Lead",
    initials: "ER",
    color: "bg-violet-500",
    avatarColor: "bg-violet-500",
    featured: true,
    tags: [
      "Artificial Intelligence",
      "AI Agents",
      "LLMs",
      "API Integration",
      "Automation",
    ],
    content: [
      {
        heading: "How AI Agents Work",
        paragraphs: [
          "An agent receives a goal, reasons about available information, and may call approved tools to retrieve data or perform an operation.",
          "The application should define tool permissions and validate the model's proposed actions before allowing sensitive operations.",
        ],
      },
      {
        heading: "Designing Reliable Agent Workflows",
        paragraphs: [
          "Use clear tool schemas, bounded execution steps, structured outputs, and useful error handling. Logs and evaluations help identify failures and improve reliability.",
          "For high-impact actions, require user confirmation and enforce authorization independently of the model.",
        ],
      },
    ],
  },

  {
    id: 4,
    slug: "javascript-modern-patterns",
    category: "JavaScript",
    title: "Modern JavaScript Patterns Every Developer Should Know",
    description:
      "As JavaScript applications grow, small improvements in how you structure code can make a significant difference in readability and maintainability. Modern language features such as destructuring, optional chaining, nullish coalescing, and asynchronous functions help developers express their intentions clearly. Explore practical patterns that make everyday JavaScript development more predictable and efficient.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    date: "Oct 06, 2026",
    readTime: "6 min read",
    author: "Michael Chen",
    role: "Senior JavaScript Developer",
    initials: "MC",
    color: "bg-amber-500",
    avatarColor: "bg-amber-500",
    featured: true,
    tags: ["JavaScript", "ES2024", "Async Await", "Clean Code", "Programming"],
    content: [
      {
        heading: "Use Modern Syntax Thoughtfully",
        paragraphs: [
          "Destructuring makes it convenient to extract values from objects and arrays. Optional chaining helps safely access nested properties that may be missing.",
          "Use nullish coalescing when you want a fallback only for null or undefined rather than every falsy value.",
        ],
      },
      {
        heading: "Handle Asynchronous Work",
        paragraphs: [
          "Async functions and await make promise-based workflows easier to follow. Use try/catch for error handling and Promise.all when independent tasks can run concurrently.",
          "Choose abstractions that make intent clear rather than using every language feature simply because it exists.",
        ],
      },
    ],
  },

  {
    id: 5,
    slug: "rest-api-design",
    category: "Backend",
    title: "Designing REST APIs That Scale with Your Application",
    description:
      "A reliable API is the foundation of communication between frontend applications, databases, and external services. Poorly structured endpoints and inconsistent error responses can make even simple integrations frustrating. Discover how resource naming, HTTP methods, validation, pagination, and versioning help you design APIs that remain understandable as your application and user base grow.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    date: "Oct 04, 2026",
    readTime: "8 min read",
    author: "Daniel Brooks",
    role: "Backend Engineer",
    initials: "DB",
    color: "bg-rose-500",
    avatarColor: "bg-rose-500",
    featured: true,
    tags: ["REST API", "Backend", "Node.js", "HTTP", "API Design"],
    content: [
      {
        heading: "Design Predictable Resources",
        paragraphs: [
          "Use resource-oriented URLs and HTTP methods that match the intended operation. Keep naming consistent across endpoints.",
          "Return appropriate status codes and a stable response structure so clients can handle success and failure cases reliably.",
        ],
      },
      {
        heading: "Validation and Pagination",
        paragraphs: [
          "Validate incoming data on the server, return actionable error messages, and never rely solely on frontend validation.",
          "For large collections, implement pagination with clear limits and predictable ordering. Add API versioning when changes would break existing clients.",
        ],
      },
    ],
  },

  {
    id: 6,
    slug: "docker-for-developers",
    category: "DevOps",
    title: "Docker Essentials: From Local Development to Deployment",
    description:
      "An application that works on one developer's computer can behave differently on another machine or in production. Docker helps solve this problem by packaging applications and their dependencies into consistent environments. Learn how images, containers, volumes, and Docker Compose fit together in a workflow that makes local development and deployment easier to manage.",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b",
    date: "Oct 02, 2026",
    readTime: "6 min read",
    author: "Priya Sharma",
    role: "DevOps Engineer",
    initials: "PS",
    color: "bg-cyan-600",
    avatarColor: "bg-cyan-600",
    featured: false,
    tags: ["Docker", "DevOps", "Containers", "Docker Compose", "Deployment"],
    content: [
      {
        heading: "Images and Containers",
        paragraphs: [
          "An image defines the filesystem and configuration used to start a container. A container is a running instance of that image.",
          "Write focused Dockerfiles, use appropriate base images, and avoid including secrets or unnecessary build files in production images.",
        ],
      },
      {
        heading: "Using Docker Compose",
        paragraphs: [
          "Compose can define an application and its supporting services, such as a web server and database, in one configuration file.",
          "Use persistent volumes when data must survive container recreation, and configure environment variables carefully for each environment.",
        ],
      },
    ],
  },

  {
    id: 7,
    slug: "accessible-web-design",
    category: "Design",
    title: "Building Accessible Interfaces Without Sacrificing Design",
    description:
      "A beautiful interface should also be usable by people who navigate with keyboards, screen readers, and other assistive technologies. Accessibility is not an extra layer to add after the design is complete; it is part of building a thoughtful user experience. Explore semantic HTML, keyboard navigation, readable contrast, and practical ways to make modern interfaces more inclusive.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    date: "Sep 29, 2026",
    readTime: "5 min read",
    author: "Olivia Martin",
    role: "UX Engineer",
    initials: "OM",
    color: "bg-pink-500",
    avatarColor: "bg-pink-500",
    featured: false,
    tags: ["Accessibility", "UI Design", "UX", "Semantic HTML", "WCAG"],
    content: [
      {
        heading: "Start with Semantic HTML",
        paragraphs: [
          "Use headings in a logical order, real buttons for actions, and links for navigation. Semantic elements help assistive technologies communicate the structure of a page.",
          "Every meaningful image should have appropriate alternative text, while decorative images should not create unnecessary noise for screen readers.",
        ],
      },
      {
        heading: "Test Keyboard and Contrast",
        paragraphs: [
          "Make sure interactive controls can be reached and used with a keyboard, and provide a visible focus indicator.",
          "Check text contrast and form labels. Automated tools are helpful, but manual keyboard and screen-reader testing can uncover additional problems.",
        ],
      },
    ],
  },

  {
    id: 8,
    slug: "react-performance",
    category: "JavaScript",
    title: "React Performance: Practical Ways to Keep Apps Fast",
    description:
      "As a React application becomes more complex, unnecessary renders and expensive calculations can affect its responsiveness. The solution is not to memoize every component, but to understand what is causing the slowdown first. Learn how to profile React applications, organize state effectively, and use React.memo, useMemo, and useCallback when they provide measurable benefits.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    date: "Sep 26, 2026",
    readTime: "7 min read",
    author: "Noah Williams",
    role: "Frontend Engineer",
    initials: "NW",
    color: "bg-indigo-500",
    avatarColor: "bg-indigo-500",
    featured: false,
    tags: ["React", "Performance", "useMemo", "useCallback", "Optimization"],
    content: [
      {
        heading: "Measure Before Optimizing",
        paragraphs: [
          "Use the React Profiler and browser developer tools to identify components that render frequently or perform expensive work.",
          "Avoid adding memoization everywhere. First simplify state, keep props stable where useful, and remove unnecessary calculations.",
        ],
      },
      {
        heading: "Choose the Right Optimization",
        paragraphs: [
          "React.memo can skip some re-renders when props have not changed. useMemo can cache a calculation, while useCallback can preserve a function reference.",
          "These tools are most valuable when profiling shows a real problem or when stable references matter to a child component or dependency.",
        ],
      },
    ],
  },

  {
    id: 9,
    slug: "database-indexing",
    category: "Backend",
    title: "Database Indexing Explained with Real-World Examples",
    description:
      "When a database contains thousands or millions of records, searching through every row can become expensive. Indexes provide a way to locate matching data more efficiently, but they also consume storage and add overhead to writes. Understand how indexes work, which queries benefit from them, and how to use query plans to make informed performance decisions.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
    date: "Sep 23, 2026",
    readTime: "9 min read",
    author: "Fatima Ahmed",
    role: "Database Engineer",
    initials: "FA",
    color: "bg-orange-500",
    avatarColor: "bg-orange-500",
    featured: false,
    tags: ["Database", "SQL", "Indexing", "Query Optimization", "Performance"],
    content: [
      {
        heading: "How Indexes Help",
        paragraphs: [
          "An index stores searchable information about selected columns so the database can find matching records more efficiently.",
          "Indexes are especially useful for columns frequently used in filtering, joins, and ordering, depending on the query and database engine.",
        ],
      },
      {
        heading: "Balance Reads and Writes",
        paragraphs: [
          "Indexes take storage and must be maintained when records change. Adding indexes to every column can make inserts and updates more expensive.",
          "Inspect query plans and measure real workloads before deciding which indexes to create.",
        ],
      },
    ],
  },

  {
    id: 10,
    slug: "ai-powered-developer-tools",
    category: "Artificial Intelligence",
    title: "AI-Powered Developer Tools: A Practical Workflow",
    description:
      "AI coding assistants are changing how developers explore unfamiliar codebases, investigate bugs, write tests, and document their work. The biggest productivity gains come from integrating these tools into a disciplined engineering workflow rather than accepting every suggestion automatically. Discover how to provide better context, review generated code, protect sensitive information, and verify AI-assisted changes before shipping.",
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a",
    date: "Sep 20, 2026",
    readTime: "5 min read",
    author: "James Wilson",
    role: "Software Engineer",
    initials: "JW",
    color: "bg-purple-600",
    avatarColor: "bg-purple-600",
    featured: false,
    tags: [
      "Artificial Intelligence",
      "AI Coding",
      "Developer Tools",
      "Productivity",
      "Code Review",
    ],
    content: [
      {
        heading: "Use AI as a Development Partner",
        paragraphs: [
          "Provide relevant context, clear requirements, and small tasks. Ask for explanations and tests rather than accepting generated code without review.",
          "AI tools can speed up repetitive work, but they may produce incorrect APIs, overlook edge cases, or suggest insecure implementations.",
        ],
      },
      {
        heading: "Verify Before Shipping",
        paragraphs: [
          "Run tests, inspect diffs, check dependencies, and validate security-sensitive code. Never share secrets or private source code with tools unless permitted by your organization's policies.",
          "The strongest workflow combines AI assistance with code review, automated checks, and developer accountability.",
        ],
      },
    ],
  },
];
