import { site } from "@/lib/content";

/**
 * Wordmark + glyph. The glyph is a stylized "sift": three bars of decreasing
 * noise resolving into one clean signal line — the product thesis in a mark.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-2.5 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="28" height="28" rx="7" fill="#0c111d" stroke="#1e2940" />
        <path d="M7 9h14" stroke="#46557a" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M9 14h10" stroke="#2dd4bf" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 19h4" stroke="#5eead4" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="font-display text-[17px] font-medium tracking-tight text-mist">
        {site.name}
      </span>
    </a>
  );
}
