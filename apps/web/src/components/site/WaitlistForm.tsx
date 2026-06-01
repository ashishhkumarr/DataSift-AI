"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Early-access capture. Posts to /api/waitlist. Kept intentionally small:
 * email + role, optional note. Server validates and stores (see route handler).
 */
export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(body.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-mint/30 bg-mint/5 p-8 text-center">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-mint/15 text-mint">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display text-xl text-mist">You&apos;re on the list.</p>
        <p className="mt-1.5 text-sm text-fog">
          We&apos;ll reach out as we onboard the first cohort. Thanks for helping us build this.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Work email"
          className="rounded-xl border border-line bg-ink px-4 py-3 text-sm text-mist outline-none transition placeholder:text-fog-2 focus:border-mint/60 focus:ring-2 focus:ring-mint/20"
        />
        <select
          name="role"
          required
          defaultValue=""
          className="rounded-xl border border-line bg-ink px-4 py-3 text-sm text-mist outline-none transition focus:border-mint/60 focus:ring-2 focus:ring-mint/20"
        >
          <option value="" disabled>
            I am a…
          </option>
          <option value="researcher">Researcher / academic</option>
          <option value="public-health">Public health / gov</option>
          <option value="education">School / district</option>
          <option value="nonprofit">Nonprofit / policy</option>
          <option value="other">Other</option>
        </select>
      </div>
      <input
        type="text"
        name="note"
        placeholder="What data do you fight with most? (optional)"
        className="rounded-xl border border-line bg-ink px-4 py-3 text-sm text-mist outline-none transition placeholder:text-fog-2 focus:border-mint/60 focus:ring-2 focus:ring-mint/20"
      />
      {/* honeypot: bots fill hidden fields, humans don't */}
      <input type="text" name="company_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 inline-flex items-center justify-center rounded-xl bg-mint px-5 py-3 text-sm font-semibold text-ink transition hover:bg-mint-bright disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Request early access"}
      </button>

      {status === "error" && <p className="text-sm text-red-400">{message}</p>}
      <p className="text-xs text-fog-2">No spam. We&apos;ll only email about access. Unsubscribe anytime.</p>
    </form>
  );
}
