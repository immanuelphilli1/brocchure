import BrocchureLogo from "../assets/Brochure-Logo.svg"
import { Hero } from "../components/blocks/hero"
import { Button } from "../components/ui/button"
import { LegalModal } from "../components/legal/legal-modal"
import {
  ArrowRight,
  Check,
  Clock,
  Globe,
  Mail,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  QrCode,
  Shield,
  Sparkles,
  Upload,
} from "lucide-react"

interface LandingPageProps {
  pricing: Array<{ days: number; price: number }>
  openLegal: "privacy" | "terms" | null
  onOpenLegal: (value: "privacy" | "terms") => void
  onCloseLegal: () => void
  onGoToDashboard: () => void
}

export function LandingPage({
  pricing,
  openLegal,
  onOpenLegal,
  onCloseLegal,
  onGoToDashboard,
}: LandingPageProps) {
  return (
    <div className="min-h-screen">
      <header className="fixed left-0 top-0 z-50 w-full">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a
            href="#top"
            className="rounded-full border border-black/10 bg-white/70 px-3 shadow-sm backdrop-blur hover:bg-white"
          >
            <img src={BrocchureLogo} alt="Brocchure" className="h-14 " />
          </a>
          <div className="group hidden md:inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 shadow-sm backdrop-blur hover:bg-white">
            <nav className="hidden items-center gap-1 md:flex">
              {[
                { href: "#how-it-works", label: "How it works" },
                { href: "#features", label: "Features" },
                { href: "#about", label: "About" },
                { href: "#pricing", label: "Pricing" },
                { href: "#faq", label: "FAQ" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm text-[#1c2e40]/75 hover:bg-black/4 hover:text-[#1c2e40]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-[#50827a] cursor-pointer rounded-full text-white hover:bg-[#50827a]/90"
              onClick={onGoToDashboard}
            >
              Upload a doc
            </Button>
          </div>
        </div>
      </header>

      <main>
        <Hero />

        <section id="how-it-works" className="relative py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-2xl pt-20">
              <h2 className="text-3xl font-bold tracking-tight text-[#1c2e40] md:text-6xl">
                Share your brochure like a <span className="text-[#50827a]">link</span> without a link.
              </h2>
              <p className="mt-4 text-[#1c2e40]/70">
                Brocchure turns your document into a simple QR code your clients
                can scan instantly. Great for events, storefronts, real estate,
                and quick handoffs.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: Upload,
                  title: "Upload",
                  desc: "Drop in a PDF or brochure. We host it for your chosen duration.",
                },
                {
                  icon: QrCode,
                  title: "Get your QR code",
                  desc: "Print it, add it to a sign, or share it on screen.",
                },
                {
                  icon: Shield,
                  title: "Stay tidy",
                  desc: "Documents are removed 30 days after inactivity after the use date.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-black/4">
                      <item.icon className="h-5 w-5 text-[#50827a]" />
                    </div>
                    <div className="text-lg font-semibold text-[#1c2e40]">
                      {item.title}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#1c2e40]/70">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="relative border-t border-black/10 bg-white/40 pb-28 pt-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-[#1c2e40] md:text-6xl">
                  Built for <span className="text-[#e3c18a]">fast handoffs</span>
                </h2>
                <p className="mt-4 text-[#1c2e40]/70">
                  Everything is designed around one job: make it effortless to
                  share the right document with the right people, right now.
                </p>
              </div>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-black/3 px-4 py-2 text-sm font-medium text-[#1c2e40] hover:bg-black/5"
              >
                See plans <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: Sparkles,
                  title: "Fast setup",
                  desc: "Upload, choose a duration, and get a QR code instantly. No complex sharing flows.",
                },
                {
                  icon: Clock,
                  title: "Time-boxed access",
                  desc: "Pricing is by day (1–7 days), ideal for events, launches, and limited-time offers.",
                },
                {
                  icon: Shield,
                  title: "Auto cleanup",
                  desc: "After the use date, we remove documents automatically after 30 days of inactivity.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-black/10 bg-[#50827a]/10 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e3c18a]/35">
                      <f.icon className="h-5 w-5 text-[#1c2e40]" />
                    </div>
                    <div className="text-lg font-semibold text-[#1c2e40]">
                      {f.title}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#1c2e40]/70">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="relative py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-[#1c2e40]/80 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#50827a]" />
                  About brocchure
                </p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#1c2e40] md:text-6xl">
                  A cleaner way to <span className="text-[#50827a]">share</span> what matters.
                </h2>
                <p className="mt-4 text-[#1c2e40]/70">
                  We built Brocchure for people who share brochures at weddings, funerals and memorials, conferences and
                  trade shows, and community events. When you&apos;re coordinating a
                  crowd, links get lost, files are awkward to forward, and
                  printing stacks is expensive. A QR code is simple, universal,
                  and immediate.
                </p>
                <p className="mt-4 text-[#1c2e40]/70">
                  Brocchure keeps things lightweight: your document is available
                  for the time you choose, then it naturally expires, plus we
                  remove inactive documents automatically.
                </p>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white p-3 shadow-sm">
                <div className="grid gap-3 rounded-2xl bg-black/2 p-5 sm:grid-cols-2">
                  {[
                    { k: "Made for", v: "Online sharing" },
                    { k: "Best for", v: "PDF brochures" },
                    { k: "Access", v: "1–7 days" },
                    { k: "Cleanup", v: "Auto removal" },
                  ].map((s) => (
                    <div
                      key={s.k}
                      className="rounded-2xl border border-black/10 bg-white p-4"
                    >
                      <div className="text-xs font-medium text-[#1c2e40]/60">
                        {s.k}
                      </div>
                      <div className="mt-1 text-base font-semibold text-[#1c2e40]">
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:col-span-2 md:grid-cols-4">
                {[
                  {
                    title: "Weddings",
                    desc: "Invites, schedules, menus, and RSVP info—perfect for tables and signage.",
                    img: "https://images.unsplash.com/photo-1742581659446-6260fc707e7d?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.1.0",
                  },
                  {
                    title: "Funerals & memorials",
                    desc: "Programs, order of service, and remembrance notes—shared respectfully and simply.",
                    img: "https://images.unsplash.com/photo-1695634281181-b2357af34c61?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.1.0",
                  },
                  {
                    title: "Events & promotions",
                    desc: "Flyers, promo decks, vendor menus—scan to view, no app needed.",
                    img: "https://images.unsplash.com/photo-1712903276879-9de15f1b9e81?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.1.0",
                  },
                  {
                    title: "Conferences",
                    desc: "One QR for your agenda, speaker bios, or product brochure—easy handoff on the floor.",
                    img: "https://images.unsplash.com/photo-1695634365196-55e0eb4e4dee?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.1.0",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
                  >
                    <div className="aspect-16/10 w-full overflow-hidden bg-black/2">
                      <img
                        src={card.img}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-semibold text-[#1c2e40]">
                        {card.title}
                      </div>
                      <div className="mt-1 text-sm text-[#1c2e40]/70">
                        {card.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => location.assign("#pricing")}>
                  Pick a duration
                </Button>
                <Button variant="outline" onClick={() => location.assign("#faq")}>
                  Read the FAQ
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="relative border-t border-black/10 bg-white/40 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-[#1c2e40] md:text-6xl">
                  Simple pricing for <span className="text-[#50827a]">short-lived</span> sharing
                </h2>
                <p className="mt-4 text-[#1c2e40]/70">
                  Choose the number of days you need. Perfect for campaigns,
                  events, and time-boxed offers.
                </p>
              </div>
              <Button variant="outline" onClick={onGoToDashboard}>
                Start an upload
              </Button>
            </div>

            <div className="mt-10 lg:hidden">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-medium text-[#1c2e40]">Plans</div>
                <div className="text-xs text-[#1c2e40]/60">Swipe</div>
              </div>
              <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {pricing.map((plan) => (
                  <div
                    key={plan.days}
                    className="w-[82%] shrink-0 snap-center rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur sm:w-[44%]"
                  >
                    <div className="text-sm text-[#1c2e40]/70">
                      {plan.days} day{plan.days === 1 ? "" : "s"}
                    </div>
                    <div className="mt-2 text-4xl font-semibold tracking-tight text-[#1c2e40]">
                      ${plan.price}
                    </div>
                    <div className="mt-1 text-sm text-[#1c2e40]/60">
                      ${Math.round((plan.price / plan.days) * 100) / 100}/day
                      average
                    </div>

                    <ul className="mt-5 space-y-2 text-sm text-[#1c2e40]/70">
                      {[
                        "Upload 1 document",
                        "Instant QR code share",
                        "Mobile-friendly viewer",
                      ].map((t) => (
                        <li key={t} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-[#50827a]" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 hidden items-end justify-between gap-3 lg:flex">
              {pricing.map((plan, idx) => {
                const center = (pricing.length - 1) / 2
                const dist = Math.abs(idx - center)
                const scale = 1.08 - dist * 0.04
                const lift = dist * 10

                return (
                  <div
                    key={plan.days}
                    style={{
                      transform: `translateY(${lift}px) scale(${scale})`,
                    }}
                    className="basis-0 grow rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur transition-transform duration-300 hover:scale-105 hover:bg-[#50827a]/10"
                  >
                    <div className="text-xs font-medium text-[#1c2e40]/70">
                      {plan.days} day{plan.days === 1 ? "" : "s"}
                    </div>
                    <div className="mt-2 text-3xl font-semibold tracking-tight text-[#1c2e40]">
                      ${plan.price}
                    </div>
                    <div className="mt-1 text-xs text-[#1c2e40]/60">
                      ${Math.round((plan.price / plan.days) * 100) / 100}/day avg
                    </div>

                    <ul className="mt-4 space-y-1.5 text-xs text-[#1c2e40]/70">
                      {["1 document", "QR share", "Mobile viewer"].map((t) => (
                        <li key={t} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 text-[#50827a]" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 text-sm text-[#1c2e40]/75 shadow-sm">
              <div className="font-semibold text-[#1c2e40]">Retention policy</div>
              <p className="mt-2">
                After your selected use date, your document remains available
                during the active period.{" "}
                <span className="text-[#1c2e40]">
                  30 days after inactivity after the use date, the document is
                  removed automatically.
                </span>
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="relative py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-[#1c2e40] md:text-4xl">
                FAQ
              </h2>
              <p className="mt-4 text-[#1c2e40]/70">
                Everything you need to know to start sharing.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-1">
              {[
                {
                  q: "What can I upload?",
                  a: "Any brochure-style document (PDFs work great).",
                },
                {
                  q: "Do my clients need an app?",
                  a: "No—just scan the QR code with their phone camera.",
                },
                {
                  q: "How long does the link stay active?",
                  a: "For the duration you purchase (1–7 days).",
                },
                {
                  q: "What happens after it expires?",
                  a: "It becomes inactive, and we automatically remove the document after 30 days of inactivity after the use date.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-colors open:bg-black/2"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#1c2e40]">
                    <span>{item.q}</span>
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-black/10 bg-white text-[#1c2e40]/80">
                      <Plus className="h-4 w-4 group-open:hidden" />
                      <Minus className="hidden h-4 w-4 group-open:block" />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#1c2e40]/70">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-black/10 bg-white py-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center gap-3">
                  <img src={BrocchureLogo} alt="" className="h-20" />
                </div>
                <p className="mt-4 max-w-xs text-sm text-[#1c2e40]/65">
                  Upload your document, share by QR, and let Brocchure handle
                  temporary access and cleanup.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#1c2e40]">Product</h3>
                <div className="mt-3 flex flex-col gap-2 text-sm text-[#1c2e40]/70">
                  <a href="#how-it-works" className="hover:text-[#1c2e40]">
                    How it works
                  </a>
                  <a href="#features" className="hover:text-[#1c2e40]">
                    Features
                  </a>
                  <a href="#pricing" className="hover:text-[#1c2e40]">
                    Pricing
                  </a>
                  <a href="#faq" className="hover:text-[#1c2e40]">
                    FAQ
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#1c2e40]">Company</h3>
                <div className="mt-3 flex flex-col gap-2 text-sm text-[#1c2e40]/70">
                  <a href="#about" className="hover:text-[#1c2e40]">
                    About
                  </a>
                  <button
                    type="button"
                    onClick={() => onOpenLegal("privacy")}
                    className="cursor-pointer text-left hover:text-[#1c2e40]"
                  >
                    Privacy policy
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenLegal("terms")}
                    className="cursor-pointer text-left hover:text-[#1c2e40]"
                  >
                    Terms of use
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#1c2e40]">Contact</h3>
                <div className="mt-3 space-y-2 text-sm text-[#1c2e40]/70">
                  <a
                    href="mailto:immanuel@parcelra.com"
                    className="flex items-center gap-2 hover:text-[#1c2e40]"
                  >
                    <Mail className="h-4 w-4" />
                    immanuel@parcelra.com
                  </a>
                  <a
                    href="tel:+233240169695"
                    className="flex items-center gap-2 hover:text-[#1c2e40]"
                  >
                    <Phone className="h-4 w-4" />
                    +233 (024) 016-9695
                  </a>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {[
                    { icon: Globe, label: "Website" },
                    { icon: MessageCircle, label: "Community" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      aria-label={social.label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/70 text-[#1c2e40]/80 shadow-sm backdrop-blur hover:bg-black/4"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 text-sm text-[#1c2e40]/60 md:flex-row md:items-center md:justify-between">
              <p>Copyright {new Date().getFullYear()} brocchure. All rights reserved.</p>
              <a
                href="#top"
                className="rounded-full px-3 py-1.5 text-[#1c2e40]/70 hover:bg-black/4 hover:text-[#1c2e40]"
              >
                Back to top
              </a>
            </div>
          </div>
        </footer>

        <LegalModal type={openLegal} onClose={onCloseLegal} />
      </main>
    </div>
  )
}

