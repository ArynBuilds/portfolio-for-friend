import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

interface ContactLinksProps {
  /** "lg" for the hero (labelled), "icon" for the compact dock bar */
  variant?: "lg" | "icon";
  className?: string;
}

/**
 * Mail + LinkedIn. Two variants: labelled row for the hero, icon-only for the
 * dock bar. Inline SVG (no icon dependency) keeps the set coherent. Tap targets
 * are padded to 44px even when the glyph is small.
 */
export function ContactLinks({ variant = "lg", className }: ContactLinksProps) {
  const labelled = variant === "lg";

  return (
    <ul className={cn("flex items-center", labelled ? "gap-5" : "gap-1", className)}>
      <li>
        <a
          href={`mailto:${profile.email}`}
          className={cn(
            "group inline-flex items-center gap-2 rounded-full transition-colors duration-200",
            labelled ? "px-1 py-2 text-[0.95rem]" : "p-3"
          )}
          style={{ color: "inherit" }}
        >
          <MailIcon />
          {labelled && (
            <span className="border-b border-transparent group-hover:border-current">
              {profile.email}
            </span>
          )}
          {!labelled && <span className="sr-only">Email {profile.name}</span>}
        </a>
      </li>
      <li>
        <a
          href={profile.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group inline-flex items-center gap-2 rounded-full transition-colors duration-200",
            labelled ? "px-1 py-2 text-[0.95rem]" : "p-3"
          )}
          style={{ color: "inherit" }}
        >
          <LinkedInIcon />
          {labelled && (
            <span className="border-b border-transparent group-hover:border-current">
              {profile.linkedinLabel}
            </span>
          )}
          {!labelled && <span className="sr-only">{profile.name} on LinkedIn</span>}
        </a>
      </li>
    </ul>
  );
}

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.49 4.78 5.73V21H17.6v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9V9Z" />
    </svg>
  );
}
