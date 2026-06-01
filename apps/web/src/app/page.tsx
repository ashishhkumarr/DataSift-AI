import { Logo } from "@/components/site/Logo";
import { SeriesChart } from "@/components/site/SeriesChart";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import {
  audience,
  hero,
  nav,
  problem,
  site,
  solution,
  team,
  trust,
  waitlist,
} from "@/lib/content";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-mint">
      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div id="top">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-fog transition hover:text-mist"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#waitlist"
            className="rounded-lg bg-mint px-4 py-2 text-sm font-semibold text-ink transition hover:bg-mint-bright"
          >
            Request access
          </a>
        </div>
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div className="fade-up">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <h1 className="mt-5 font-display text-5xl leading-[1.05] tracking-tight text-mist sm:text-6xl">
                {hero.titleLead}
                <br />
                <span className="text-gradient italic">{hero.titleEmph}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog">{hero.body}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={hero.primaryCta.href}
                  className="rounded-xl bg-mint px-6 py-3 text-sm font-semibold text-ink transition hover:bg-mint-bright"
                >
                  {hero.primaryCta.label}
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="rounded-xl border border-line px-6 py-3 text-sm font-semibold text-mist transition hover:border-mint/50 hover:text-mint"
                >
                  {hero.secondaryCta.label}
                </a>
              </div>

              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
                {hero.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-3xl text-mist">{s.value}</dt>
                    <dd className="mt-1 text-xs leading-snug text-fog-2">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Hero visualization */}
            <div className="fade-up rounded-2xl border border-line card-glow p-5 shadow-2xl shadow-black/40 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-mist">Wyoming youth health · unified view</p>
                  <p className="text-xs text-fog-2">Substance use & mental health, % of students</p>
                </div>
                <span className="rounded-full border border-mint/30 bg-mint/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-mint">
                  Illustrative
                </span>
              </div>
              <SeriesChart />
              <p className="mt-4 border-t border-line-soft pt-3 text-xs text-fog-2">
                What 20 years of trapped survey data looks like once it&apos;s extracted and normalized into one queryable source.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Problem ---------- */}
        <section id="problem" className="border-t border-line/60 bg-ink-2/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <Eyebrow>{problem.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight text-mist">
                {problem.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-fog">{problem.body}</p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {problem.cards.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-line card-glow p-6 transition hover:border-mint/40"
                >
                  <p className="font-display text-4xl text-gradient">{c.stat}</p>
                  <p className="mt-3 font-medium text-mist">{c.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fog-2">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Solution ---------- */}
        <section id="solution" className="border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <Eyebrow>{solution.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight text-mist">
                {solution.title}
              </h2>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
              {solution.steps.map((step) => (
                <div key={step.no} className="bg-ink-2 p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-mint/30 bg-mint/10 font-mono text-sm font-semibold text-mint">
                      {step.no}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl text-mist">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Trust / comparability ---------- */}
        <section id="trust" className="border-t border-line/60 bg-ink-2/40">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Eyebrow>{trust.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight text-mist">
                {trust.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-fog">{trust.body}</p>
            </div>

            <div className="grid gap-4 self-center">
              {trust.points.map((p) => (
                <div
                  key={p.title}
                  className="flex gap-4 rounded-2xl border border-line card-glow p-5"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mint/10 text-mint">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-medium text-mist">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fog-2">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Audience ---------- */}
        <section id="audience" className="border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <Eyebrow>{audience.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight text-mist">
                {audience.title}
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {audience.segments.map((seg) => (
                <div
                  key={seg.title}
                  className={`rounded-2xl border p-6 transition ${
                    seg.active
                      ? "border-mint/50 bg-mint/[0.06]"
                      : "border-line card-glow hover:border-mint/30"
                  }`}
                >
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                      seg.active ? "bg-mint text-ink" : "border border-line text-fog-2"
                    }`}
                  >
                    {seg.tag}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-mist">{seg.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{seg.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Team ---------- */}
        <section id="team" className="border-t border-line/60 bg-ink-2/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <Eyebrow>{team.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight text-mist">
                {team.title}
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {team.members.map((m) => (
                <div key={m.name} className="rounded-2xl border border-line card-glow p-7">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-mint/30 bg-mint/10 font-display text-lg text-mint">
                      {m.initials}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-mist">{m.name}</h3>
                      <p className="text-sm text-fog-2">{m.role}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {m.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-sm text-fog">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mint" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Waitlist ---------- */}
        <section id="waitlist" className="border-t border-line/60">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                {waitlist.eyebrow}
              </span>
            </div>
            <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight text-mist sm:text-5xl">
              {waitlist.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fog">{waitlist.body}</p>

            <div className="mx-auto mt-10 max-w-xl text-left">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-line/60 bg-ink-2/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <Logo />
          <div className="flex flex-col items-center gap-1 text-sm text-fog-2 sm:items-end">
            <div className="flex items-center gap-4">
              <a href={`https://${site.domain}`} className="transition hover:text-mist">
                {site.domain}
              </a>
              <a href={`mailto:${site.email}`} className="transition hover:text-mist">
                {site.email}
              </a>
            </div>
            <p className="text-xs text-fog-2">
              © {new Date().getFullYear()} {site.name}. Public data, set free.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
