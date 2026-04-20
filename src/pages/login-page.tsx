import { ChevronLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { ClipPathLinks } from "../components/ui/clip-path-links"

interface LoginPageProps {
  onBack: () => void
  onLoginSuccess: () => void
}

export function LoginPage({ onBack, onLoginSuccess }: LoginPageProps) {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#1c2e40]/80 hover:bg-black/3"
        >
          <ChevronLeft className="h-8 w-8 text-(--brocchure-moss)" aria-label="Back to website"  />
          <span className="text-sm font-bold text-[#1c2e40]/80">Go back</span>
        </button>

        <div className="">
          

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="mb-6">
          <div className="flex items-center justify-between">
          <p className="inline-flex items-center rounded-full bg-[#50827a]/10 px-3 py-1 text-xs font-semibold text-[#1c2e40]">
              Protected Dashboard
            </p>
            <Button className="mt-4 w-full sm:w-auto" onClick={onLoginSuccess}>
              Sign in to dashboard
            </Button>
          </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1c2e40] md:text-5xl">
              Sign in to manage your brochure uploads
            </h1>
            <p className="mt-4 max-w-xl text-sm text-[#1c2e40]/70">
              Access document analytics, active QR links, campaign performance,
              and upload management in one place.
            </p>
          </div>
            <ClipPathLinks />
          </div>
        </div>
      </div>
    </div>
  )
}

