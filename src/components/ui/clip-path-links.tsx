import { type ElementType, type MouseEvent } from "react"
import { FaApple, FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { SiGoogle } from "react-icons/si"
import { useAnimate } from "framer-motion"

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)"
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)"
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)"
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)"

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
}

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
}

type Side = "left" | "right" | "top" | "bottom"

interface LinkBoxProps {
  Icon?: ElementType
  href: string
  imgSrc?: string
  className?: string
  label: string
}

const LinkBox = ({ Icon, href, imgSrc, className, label }: LinkBoxProps) => {
  const [scope, animate] = useAnimate()

  const getNearestSide = (e: MouseEvent<HTMLAnchorElement>): Side => {
    const box = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY

    const distances: Array<{ side: Side; proximity: number }> = [
      { side: "left", proximity: Math.abs(box.left - x) },
      { side: "right", proximity: Math.abs(box.right - x) },
      { side: "top", proximity: Math.abs(box.top - y) },
      { side: "bottom", proximity: Math.abs(box.bottom - y) },
    ]

    distances.sort((a, b) => a.proximity - b.proximity)
    return distances[0].side
  }

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e)
    void animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    })
  }

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e)
    void animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-16 w-full place-content-center bg-white text-[#1c2e40] sm:h-20"
      aria-label={label}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={label}
          className={className ?? "max-h-10 object-contain"}
        />
      ) : Icon ? (
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      ) : null}

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-[#1c2e40] text-white transition-colors duration-300"
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={label}
            className={className ?? "max-h-10 object-contain"}
          />
        ) : Icon ? (
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : null}
      </div>
    </a>
  )
}

export const ClipPathLinks = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-sm backdrop-blur">
      <div className="grid grid-cols-2 divide-x divide-black/10 border-b border-black/10">
        <LinkBox Icon={SiGoogle} href="#" label="Google OAuth" />
        <LinkBox Icon={FaFacebook} href="#" label="GitHub OAuth" />
      </div>
      <div className="grid grid-cols-4 divide-x divide-black/10 border-b border-black/10">
        <LinkBox Icon={FaTwitter} href="#" label="Twitter" />
        <LinkBox Icon={FaLinkedin} href="#" label="LinkedIn" />
        <LinkBox Icon={FaApple} href="#" label="Community Chat" />
        <LinkBox Icon={FaGithub} href="#" label="Web Portal" />
      </div>
    </div>
  )
}

