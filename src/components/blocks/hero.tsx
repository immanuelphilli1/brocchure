import {
  BentoCell,
  BentoGrid,
  ContainerScale,
  ContainerScroll,
} from "./hero-gallery-scroll-animation"
import { Button } from "../ui/button"

const IMAGES = [
  // Weddings (invites / stationery)
  "https://images.unsplash.com/photo-1742581659446-6260fc707e7d?auto=format&fit=crop&w=2400&q=80&ixlib=rb-4.1.0",
  // Event brochures / flyers
  "https://images.unsplash.com/photo-1712903276879-9de15f1b9e81?auto=format&fit=crop&w=2400&q=80&ixlib=rb-4.1.0",
  // Brochure mockups (good stand-in for programs)
  "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1544813545-4827b64fcacb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0",
]

export function Hero() {
  return (
    <section id="top" className="relative">
      <ContainerScroll className="h-[320vh]">
        <BentoGrid className="sticky left-0 top-0 z-0 h-svh w-full p-4">
          {IMAGES.map((imageUrl, index) => (
            <BentoCell
              key={imageUrl + index}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/10"
            >
              <img
                className="size-full object-cover object-center"
                src={imageUrl}
                alt=""
                loading="lazy"
              />
            </BentoCell>
          ))}
        </BentoGrid>

        <ContainerScale className="relative w-full md:w-fit z-10 px-6 text-center">
          <p className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1 text-xs text-[#1c2e40]/80 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#50827a]" />
            {/* Upload a document. Share a QR. Done. */}
          </p>
          <h1 className="mx-auto max-w-2xl text-balance text-5xl font-semibold tracking-tight text-[#1c2e40] md:text-6xl">
            Turn any document into a{" "}
            <span className="text-[#50827a]">shareable QR code</span> in minutes.
          </h1>
          <p className="mx-auto my-6 max-w-xl text-pretty text-sm text-[#1c2e40]/70 md:text-base">
            Brocchure lets you upload a brochure, menu, pitch deck, or PDF and
            share it instantly with friends and clients—no app required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button className="px-5" onClick={() => location.assign("#pricing")}>
              See pricing
            </Button>
            <Button
              variant="outline"
              className="px-5"
              onClick={() => location.assign("#how-it-works")}
            >
              How it works
            </Button>
          </div>
        </ContainerScale>
      </ContainerScroll>
    </section>
  )
}

