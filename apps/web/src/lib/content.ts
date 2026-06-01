/**
 * Central content/copy for the DataSift AI marketing site.
 *
 * Keeping copy in one typed module (rather than scattered through JSX) makes it
 * trivial to review messaging, hand edits to a non-engineer (Himanshi), and
 * later swap to a CMS without touching layout code.
 *
 * IMPORTANT — intellectual honesty: copy here describes the product VISION and
 * the single validated proof point (the Wyoming concept). It must not claim
 * live capabilities that are not yet built. See memory/decisions-2026-06-01.
 */

export const site = {
  name: "DataSift AI",
  domain: "datasiftai.ai",
  tagline: "Government data, turned into queryable intelligence.",
  email: "himanshitomar@icloud.com",
  description:
    "DataSift AI extracts public government data trapped in broken portals, PDFs, and un-exportable charts — then normalizes it into one trustworthy, queryable layer.",
};

export const nav = [
  { label: "Problem", href: "#problem" },
  { label: "How it works", href: "#solution" },
  { label: "Trust", href: "#trust" },
  { label: "Who it's for", href: "#audience" },
  { label: "Team", href: "#team" },
];

export const hero = {
  eyebrow: "Public-health data infrastructure",
  titleLead: "The data exists.",
  titleEmph: "Nobody can use it.",
  body: "Every state collects youth health data — substance use, mental health, violence. It's public, funded, and important. But it's trapped in broken portals, un-exportable charts, and scanned PDFs. DataSift AI sets it free: extracted, normalized, and ready to query.",
  primaryCta: { label: "Request early access", href: "#waitlist" },
  secondaryCta: { label: "See how it works", href: "#solution" },
  stats: [
    { value: "50", label: "states, 50 formats" },
    { value: "20 yrs", label: "of trend depth" },
    { value: "7", label: "health series, one schema" },
  ],
};

export const problem = {
  eyebrow: "The problem",
  title: "Funded, public, and practically unreachable.",
  body: "The people who need this data most — researchers, counselors, health directors, grant writers — are the least equipped to scrape it. They all hit the same wall.",
  cards: [
    {
      stat: "3,000+",
      label: "County health departments",
      note: "Each publishing data in its own format, on its own portal.",
    },
    {
      stat: "13,000+",
      label: "School districts",
      note: "Sitting on annual survey data they can barely analyze.",
    },
    {
      stat: "50",
      label: "States, 50 different formats",
      note: "No standard schema. No way to compare across lines.",
    },
  ],
};

export const solution = {
  eyebrow: "How it works",
  title: "Three steps. Any government source. Real intelligence.",
  steps: [
    {
      no: "01",
      title: "Discover & extract",
      body: "Point the agent at a government data source. It reads the page structure and pulls the data out — HTML tables, dynamic JS charts, scanned PDFs — with every value traced back to its origin.",
    },
    {
      no: "02",
      title: "Normalize & unify",
      body: "Heterogeneous sources are cleaned into one schema, with the methodology behind each number kept attached — so you always know what you're looking at.",
    },
    {
      no: "03",
      title: "Query & act",
      body: "Ask in plain language — “Which counties show rising vaping rates post-2020?” Get answers, cited insight reports, and grant-ready exports.",
    },
  ],
};

export const trust = {
  eyebrow: "Why researchers will trust it",
  title: "Comparable only when it's actually comparable.",
  body: "Most tools would happily put a Wyoming number next to an Ohio number and call it a comparison. But different surveys ask different questions in different years. Forcing them together produces confident, wrong conclusions — unacceptable in public health.",
  points: [
    {
      title: "Provenance on every number",
      body: "Source, survey, year, and the original value travel with each data point. Nothing is unverifiable.",
    },
    {
      title: "Methodology kept attached",
      body: "We preserve which instrument, question, and population produced a figure — not just the figure.",
    },
    {
      title: "Honest comparisons",
      body: "The platform compares like-for-like, and tells you plainly when two figures should not be compared.",
    },
  ],
};

export const audience = {
  eyebrow: "Who it's for",
  title: "Built for researchers first. Designed for everyone stuck behind the wall.",
  segments: [
    {
      tag: "Beachhead",
      title: "Academic & policy research",
      body: "Labs, think tanks, and policy institutes who need clean, citable data fast — and currently lose hours to manual retrieval.",
      active: true,
    },
    {
      tag: "Next",
      title: "Public health & education",
      body: "County health departments and school districts with real budgets for data tools and grant reporting.",
      active: false,
    },
    {
      tag: "Vision",
      title: "Horizontal infrastructure",
      body: "Every agency — justice, housing, environment, labor — has the same problem. Public health is the wedge.",
      active: false,
    },
  ],
};

export const team = {
  eyebrow: "The team",
  title: "A rare overlap: lived the problem, built the fix.",
  members: [
    {
      name: "Himanshi Singh Tomar",
      role: "Founder · Product, Research & GTM",
      bullets: [
        "Research Assistant, UW Legal Judgments Lab",
        "Trained data analyst: R, Qualtrics, NVivo, survey design",
        "Co-author, American Psychology-Law Society 2026",
        "Deferred a full-time data analyst offer to build this",
      ],
      initials: "HT",
    },
    {
      name: "Ashish Kumar",
      role: "Co-Founder · Engineering & Infrastructure",
      bullets: [
        "CS, Arizona State University",
        "SWE at Digital Convergence Technologies",
        "Built backend systems, secure APIs, data infrastructure",
        "Prototyped the Wyoming extraction concept end-to-end",
      ],
      initials: "AK",
    },
  ],
};

export const waitlist = {
  eyebrow: "Early access",
  title: "Get the data you need, without the wall.",
  body: "We're onboarding a first cohort of researchers and analysts. Tell us where you work and what data you fight with — you'll be first in line.",
};

/**
 * Illustrative trend data for the hero visualization.
 *
 * NOTE: shaped to resemble real Wyoming youth-health trends for demonstration.
 * Labeled "illustrative" in the UI. Replace with live, provenance-backed data
 * once the extraction pipeline (Phase 1) is built.
 */
export type Series = {
  name: string;
  color: string;
  /** yearly values, indexed against `years` */
  values: number[];
};

export const chart = {
  startYear: 2004,
  years: Array.from({ length: 19 }, (_, i) => 2004 + i),
  series: [
    { name: "Vaping", color: "#5EEAD4", values: [0, 0, 0, 0, 2, 3, 4, 6, 9, 12, 14, 17, 21, 24, 27, 26, 23, 22, 24] },
    { name: "Alcohol", color: "#8AB4FF", values: [41, 40, 38, 37, 35, 33, 32, 30, 28, 27, 25, 24, 23, 22, 21, 19, 18, 18, 17] },
    { name: "Marijuana", color: "#F4B860", values: [19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 23, 23, 22, 22, 21, 21, 22, 22] },
    { name: "Depression", color: "#C792EA", values: [22, 22, 23, 23, 24, 24, 25, 26, 27, 28, 29, 30, 31, 33, 34, 36, 38, 39, 40] },
  ] as Series[],
};
