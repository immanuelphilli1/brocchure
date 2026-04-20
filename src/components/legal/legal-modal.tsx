import { useEffect } from "react"
import { X } from "lucide-react"

type LegalType = "privacy" | "terms"

interface LegalModalProps {
  type: LegalType | null
  onClose: () => void
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!type) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [type, onClose])

  if (!type) return null

  return (
    <div
      className="fixed inset-0 z-100 bg-[#1c2e40]/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={type === "privacy" ? "Privacy Policy" : "Terms of Use"}
        className="mx-auto mt-8 max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-[#1c2e40]">
              {type === "privacy" ? "Privacy Policy" : "Terms of Use"}
            </h3>
            <p className="text-xs text-[#1c2e40]/60">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-[#1c2e40]/70 hover:bg-black/4"
            aria-label="Close legal modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[calc(90vh-84px)] space-y-5 overflow-y-auto px-5 py-4 text-sm leading-relaxed text-[#1c2e40]/75">
          {type === "privacy" ? (
            <>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">1. Scope</h4>
                <p>
                  This Privacy Policy explains how Brocchure collects, uses,
                  stores, and discloses personal information when you upload
                  documents, generate QR codes, and share content with your
                  clients, friends, or event participants.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">
                  2. Information We Collect
                </h4>
                <p>
                  We may collect account and contact data (such as name, email,
                  and phone), billing metadata, uploaded document data, technical
                  usage data (IP, browser, device, logs), and QR interaction
                  analytics (such as scans and access timestamps).
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">
                  3. How We Use Information
                </h4>
                <p>
                  We use information to provide and secure the service, generate
                  and host QR-accessible documents, process purchases, provide
                  support, improve performance, enforce platform rules, and comply
                  with legal obligations.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">
                  4. Data Retention and Document Expiry
                </h4>
                <p>
                  Your documents are retained for the access period you purchase.
                  Following your use date, inactive documents are automatically
                  removed after 30 days of inactivity, unless a longer retention
                  period is required by law or needed for dispute resolution,
                  fraud prevention, or security review.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">
                  5. Sharing and Disclosure
                </h4>
                <p>
                  We do not sell personal data. We may share limited data with
                  service providers that support hosting, payments, analytics, and
                  customer support, and with authorities when legally required.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">6. Security</h4>
                <p>
                  Brocchure applies reasonable administrative, technical, and
                  organizational safeguards to protect data. No online system is
                  completely risk-free; you are responsible for avoiding sensitive
                  or prohibited content uploads unless explicitly permitted by your
                  own compliance requirements.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">7. Your Rights</h4>
                <p>
                  Depending on your jurisdiction, you may request access,
                  correction, deletion, portability, or restriction of your
                  personal data. Contact us using the details in the footer to
                  submit privacy requests.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">
                  1. Acceptance of Terms
                </h4>
                <p>
                  By using Brocchure, you agree to these Terms of Use. If you do
                  not agree, do not use the service.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">
                  2. Service Description
                </h4>
                <p>
                  Brocchure allows users to upload documents and generate QR code
                  access for time-bound sharing. Access duration is based on the
                  purchased plan (1-7 days).
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">
                  3. User Responsibilities
                </h4>
                <p>
                  You are responsible for all uploaded content, rights and
                  permissions for distribution, and compliance with applicable law.
                  You must not upload unlawful, infringing, harmful, deceptive, or
                  malicious content.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">
                  4. Billing and Access Periods
                </h4>
                <p>
                  Pricing is tied to selected duration. Purchased periods define
                  service availability for each document share. Failure to complete
                  payment may delay activation or limit access.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">
                  5. Availability and Changes
                </h4>
                <p>
                  We may update, improve, suspend, or discontinue features at any
                  time. We aim for reliable uptime but do not guarantee
                  uninterrupted availability.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">
                  6. Intellectual Property
                </h4>
                <p>
                  You retain ownership of your content. Brocchure retains rights in
                  the platform, software, and branding. You grant us a limited
                  license to host and deliver your content for the purpose of
                  providing the service.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-[#1c2e40]">
                  7. Liability and Termination
                </h4>
                <p>
                  To the extent permitted by law, Brocchure is not liable for
                  indirect or consequential losses. We may suspend or terminate
                  access for misuse, security risk, non-payment, or breach of
                  these Terms.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

