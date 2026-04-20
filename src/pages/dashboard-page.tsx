import { useEffect, useId, useMemo, useState } from "react"
import BrocchureLogo from "../assets/Brochure-Logo.svg"
import { Button } from "../components/ui/button"
import { cn } from "../lib/utils"
import {
  LayoutGrid,
  Search,
  X,
} from "lucide-react"

function todayIsoDate(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

interface DashboardPageProps {
  onLogout: () => void
  onGoHome: () => void
}

const paymentOptions = [
  { value: "card", label: "Credit or debit card" },
  { value: "paypal", label: "PayPal" },
  { value: "paystack", label: "Mobile Money" },
] as const

const durationOptions = [
  { value: "1", label: "1 day" },
  { value: "2", label: "2 days" },
  { value: "3", label: "3 days" },
  { value: "4", label: "4 days" },
  { value: "5", label: "5 days" },
  { value: "6", label: "6 days" },
  { value: "7", label: "7 days" },
  { value: "14", label: "14 days" },
  { value: "30", label: "30 days" },
] as const

type RecentUploadMock = {
  id: string
  title: string
  durationLabel: string
  date: string
  /** One image URL per page (or rendered PDF page images from your backend). */
  pages: string[]
}

/** Mock uploads: each “page” is an image URL; swap for signed PDF page URLs or blob URLs from your API. */
const recentUploadsData: RecentUploadMock[] = [
  {
    id: "town-right",
    title: "Town Right Doc",
    durationLabel: "2 days",
    date: "10/04/2026",
    pages: [
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "pizza-menu",
    title: "Pizza Shop Menu",
    durationLabel: "7 days",
    date: "10/01/2026",
    pages: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "wedding",
    title: "Wedding Program Collection",
    durationLabel: "3 days",
    date: "21/09/2025",
    pages: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522673602040-be62fb37a721?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80",
    ],
  },
]

type DocumentRowStatus = "active" | "inactive"

type DocumentRow = {
  id: string
  name: string
  date: string
  scans: string
  price: string
  duration: string
  status: DocumentRowStatus
  /** Mock: reuse a recent upload’s page images in the preview pane (replace with file IDs from your API). */
  previewSourceUploadId: RecentUploadMock["id"]
}

const documentListData: DocumentRow[] = [
  { id: "d1", name: "Wedding Program Collection", date: "10/04/2026", scans: "2.2k", price: "$120", duration: "7 days", status: "active", previewSourceUploadId: "wedding" },
  { id: "d2", name: "Funeral Service Program", date: "10/04/2026", scans: "22k", price: "$120", duration: "7 days", status: "active", previewSourceUploadId: "town-right" },
  { id: "d3", name: "Corporate Event Brochure", date: "10/04/2026", scans: "2.2k", price: "$120", duration: "7 days", status: "inactive", previewSourceUploadId: "pizza-menu" },
  { id: "d4", name: "Town Hall Newsletter", date: "08/04/2026", scans: "890", price: "$45", duration: "3 days", status: "active", previewSourceUploadId: "town-right" },
  { id: "d5", name: "Restaurant Week Menu", date: "05/04/2026", scans: "5.1k", price: "$90", duration: "14 days", status: "inactive", previewSourceUploadId: "pizza-menu" },
  { id: "d6", name: "Charity Gala Program", date: "02/04/2026", scans: "1.4k", price: "$75", duration: "7 days", status: "active", previewSourceUploadId: "wedding" },
  { id: "d7", name: "School Playbill", date: "28/03/2026", scans: "640", price: "$30", duration: "2 days", status: "inactive", previewSourceUploadId: "town-right" },
  { id: "d8", name: "Conference Agenda Pack", date: "22/03/2026", scans: "9.8k", price: "$200", duration: "30 days", status: "active", previewSourceUploadId: "pizza-menu" },
  { id: "d9", name: "Baptism Service Leaflet", date: "18/03/2026", scans: "410", price: "$25", duration: "1 day", status: "inactive", previewSourceUploadId: "wedding" },
  { id: "d10", name: "Summer Festival Map", date: "12/03/2026", scans: "12k", price: "$150", duration: "14 days", status: "active", previewSourceUploadId: "town-right" },
  { id: "d11", name: "Product Launch One-Pager", date: "01/03/2026", scans: "3.3k", price: "$60", duration: "7 days", status: "inactive", previewSourceUploadId: "pizza-menu" },
  { id: "d12", name: "Memorial Tribute Booklet", date: "26/02/2026", scans: "780", price: "$55", duration: "5 days", status: "active", previewSourceUploadId: "wedding" },
]

type DocListFilter = "all" | DocumentRowStatus

const docListFilterTabs: { value: DocListFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
]

type ActivePreview =
  | { kind: "recent"; uploadId: string }
  | { kind: "list"; documentId: string }

export function DashboardPage({ onLogout, onGoHome }: DashboardPageProps) {
  const [activePreview, setActivePreview] = useState<ActivePreview | null>(null)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const [docListFilter, setDocListFilter] = useState<DocListFilter>("all")
  const [docSearch, setDocSearch] = useState("")
  const [documentTitle, setDocumentTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [paymentType, setPaymentType] = useState<(typeof paymentOptions)[number]["value"]>("card")
  const [campaignDays, setCampaignDays] = useState<(typeof durationOptions)[number]["value"]>("7")
  const [qrUseStartDate, setQrUseStartDate] = useState(() => todayIsoDate())

  const titleId = useId()
  const fileId = useId()
  const paymentId = useId()
  const durationId = useId()
  const qrDateId = useId()
  const qrModalTitleId = useId()

  const modalBlockingOpen = uploadOpen || qrOpen

  useEffect(() => {
    if (!modalBlockingOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if (qrOpen) {
        setQrOpen(false)
        return
      }
      if (uploadOpen) {
        setUploadOpen(false)
        setDocumentTitle("")
        setFile(null)
        setPaymentType("card")
        setCampaignDays("7")
        setQrUseStartDate(todayIsoDate())
      }
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [modalBlockingOpen, qrOpen, uploadOpen])

  function resetUploadForm() {
    setDocumentTitle("")
    setFile(null)
    setPaymentType("card")
    setCampaignDays("7")
    setQrUseStartDate(todayIsoDate())
  }

  function closeUploadModal() {
    setUploadOpen(false)
    resetUploadForm()
  }

  function closeQrModal() {
    setQrOpen(false)
  }

  function onSubmitUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !qrUseStartDate.trim()) return
    // Wire to API when available (include qrUseStartDate + campaignDays for active QR window)
    closeUploadModal()
  }

  const docSearchId = useId()

  const previewDisplay = useMemo(() => {
    if (activePreview == null) return null
    if (activePreview.kind === "recent") {
      const upload = recentUploadsData.find((u) => u.id === activePreview.uploadId)
      if (!upload) return null
      return { viewerKey: upload.id, title: upload.title, pages: upload.pages }
    }
    const row = documentListData.find((d) => d.id === activePreview.documentId)
    if (!row) return null
    const upload = recentUploadsData.find((u) => u.id === row.previewSourceUploadId)
    if (!upload) return null
    return { viewerKey: row.id, title: row.name, pages: upload.pages }
  }, [activePreview])

  const filteredDocuments = useMemo(() => {
    let rows = documentListData
    if (docListFilter !== "all") {
      rows = rows.filter((d) => d.status === docListFilter)
    }
    const q = docSearch.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((d) => {
      const hay = [
        d.name,
        d.date,
        d.scans,
        d.price,
        d.duration,
        d.status,
      ]
        .join(" ")
        .toLowerCase()
      return hay.includes(q)
    })
  }, [docListFilter, docSearch])

  return (
    <div className="min-h-screen  px-4 md:px-6">
      <div className="mx-auto max-w-[1400px] overflow-hidden ">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <button onClick={onGoHome} className="flex cursor-pointer items-center gap-2">
            <img src={BrocchureLogo} alt="Brocchure" className="h-14 w-28" />
            </button>


          <div className="flex items-center gap-2">
            <Button className="bg-[#1c2e40] text-white hover:bg-[#1c2e40]/90 cursor-pointer" size="sm" onClick={onLogout}>
              Log out
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:p-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-black/10 bg-[#fbfcfe] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-medium text-[#1c2e40]">
                  Welcome, John Doe!
                </div>
                <span className="text-sm text-[#1c2e40]/65">Today {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>

              <div className="w-full">
                <button
                  type="button"
                  onClick={() => setUploadOpen(true)}
                  className="w-full cursor-pointer rounded-xl bg-[#50827a] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#50827a]/90"
                >
                  Upload your document
                </button>
              </div>
            </div>

{/* Recent uploads */}
            <div className="rounded-2xl border border-black/10 bg-white p-4">
              <h3 className="text-xl font-semibold text-[#1c2e40]">Recent uploads</h3>
              <p className="mb-4 text-sm text-[#1c2e40]/60">View your recent uploads</p>

              <div className="grid gap-3 sm:grid-cols-3">
                {recentUploadsData.map((card) => {
                  const selected =
                    activePreview?.kind === "recent" && activePreview.uploadId === card.id
                  const thumb = card.pages[0]
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setActivePreview({ kind: "recent", uploadId: card.id })}
                      className={cn(
                        "relative h-40 w-full overflow-hidden rounded-xl border text-left transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-[#50827a]/40 focus-visible:ring-offset-2",
                        selected
                          ? "border-[#50827a] shadow-md shadow-[#50827a]/20"
                          : "border-black/10 hover:border-black/20 hover:shadow-sm",
                      )}
                    >
                      <img
                        src={thumb}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
                      <span className="absolute left-2 top-2 rounded-lg bg-white/90 px-2 py-1 text-xs font-semibold text-[#1c2e40] shadow-sm">
                        {card.durationLabel}
                      </span>
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <p className="text-sm font-semibold drop-shadow-sm">{card.title}</p>
                        <p className="text-xs text-white/90">{card.date}</p>
                        <p className="mt-1 text-[11px] font-medium text-[#b8e0d8]">
                          {selected ? "Showing in preview →" : "Click to preview document"}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="hidden md:block rounded-2xl border border-black/10 bg-white p-4">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div
                  className="flex flex-wrap gap-2"
                  role="tablist"
                  aria-label="Filter documents by status"
                >
                  {docListFilterTabs.map((tab) => {
                    const selected = docListFilter === tab.value
                    return (
                      <button
                        key={tab.value}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setDocListFilter(tab.value)}
                        className={cn(
                          "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                          tab.value === "active" && selected && "border-[#50827a] bg-[#50827a] text-white",
                          tab.value === "inactive" && selected && "border-red-900 bg-red-900 text-white",
                          tab.value === "all" && selected && "border-[#1c2e40] bg-[#1c2e40] text-white",
                          !selected && "border-black/10 bg-white text-[#1c2e40]/80 hover:bg-black/3",
                        )}
                      >
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
                <div className="relative min-w-0 sm:max-w-[220px] sm:shrink-0">
                  <label htmlFor={docSearchId} className="sr-only">
                    Search documents
                  </label>
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#1c2e40]/45" />
                  <input
                    id={docSearchId}
                    type="search"
                    value={docSearch}
                    onChange={(e) => setDocSearch(e.target.value)}
                    placeholder="Search docs…"
                    autoComplete="off"
                    className="w-full rounded-full border border-black/10 bg-[#fbfcfe] py-2 pl-9 pr-3 text-xs text-[#1c2e40] placeholder:text-[#1c2e40]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#50827a]/30"
                  />
                </div>
              </div>

              {/* ~3 rows visible; scroll for the rest */}
              <div className="max-h-67 space-y-3 overflow-y-auto overscroll-contain pr-1 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">
                {filteredDocuments.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-black/15 bg-[#fbfcfe] px-3 py-8 text-center text-sm text-[#1c2e40]/60">
                    No documents match your filters or search.
                  </p>
                ) : (
                  filteredDocuments.map((row) => {
                    const rowPreviewSelected =
                      activePreview?.kind === "list" && activePreview.documentId === row.id
                    return (
                    <div
                      key={row.id}
                      className="flex items-center justify-between gap-2 rounded-xl border border-black/10 p-3"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="grid h-10 w-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-black/3">
                          <LayoutGrid className="h-4 w-4 text-[#1c2e40]/70" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-sm font-semibold text-[#1c2e40]">{row.name}</p>
                            <span
                              className={cn(
                                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white",
                                row.status === "active" ? "bg-[#50827a]/90" : "bg-red-900/90",
                              )}
                            >
                              {row.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#1c2e40]/60">
                            {row.date} • {row.scans} scans
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold text-[#1c2e40]">
                          {row.price} / {row.duration}
                        </p>
                        <button
                          type="button"
                          onClick={() => setActivePreview({ kind: "list", documentId: row.id })}
                          className={cn(
                            "mt-1 rounded-lg px-3 py-1 text-xs text-white transition-colors",
                            rowPreviewSelected
                              ? "bg-[#50827a] ring-2 ring-[#50827a]/40 ring-offset-1 ring-offset-white"
                              : "bg-[#1c2e40] hover:bg-[#1c2e40]/90",
                          )}
                        >
                          View
                        </button>
                      </div>
                    </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
          <aside className="flex min-h-0 flex-col rounded-3xl border border-black/10 bg-[#e8d4a8] p-3 lg:min-h-[420px] lg:max-h-[calc(100vh-8rem)]">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[22px] border border-black/10 bg-[#fbfcfe] shadow-inner shadow-black/5">
              <div className="flex shrink-0 items-center justify-between gap-2 border-b border-black/10 px-4 py-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[#1c2e40]/50">
                    Document preview
                  </p>
                  <p className="text-sm font-semibold text-[#1c2e40]">
                    {previewDisplay?.title ?? "No document selected"}
                  </p>
                </div>
                {previewDisplay ? (
                  <span className="shrink-0 rounded-full bg-[#50827a]/15 px-2.5 py-1 text-xs font-medium text-[#50827a]">
                    {previewDisplay.pages.length} page{previewDisplay.pages.length === 1 ? "" : "s"}
                  </span>
                ) : null}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3">
                {previewDisplay ? (
                  <div className="mx-auto flex max-w-xl flex-col gap-4 pb-4">
                    {previewDisplay.pages.map((src, pageIndex) => (
                      <figure
                        key={`${previewDisplay.viewerKey}-${pageIndex}`}
                        className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-md shadow-black/10"
                      >
                        <img
                          src={src}
                          alt={`${previewDisplay.title} — page ${pageIndex + 1}`}
                          className="block w-full object-contain"
                          loading="lazy"
                        />
                        <figcaption className="border-t border-black/8 bg-[#f6f7f9] px-2 py-1 text-center text-[10px] font-medium text-[#1c2e40]/55">
                          Page {pageIndex + 1} of {previewDisplay.pages.length}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 px-4 text-center">
                    <p className="text-sm font-medium text-[#1c2e40]">Nothing to preview yet</p>
                    <p className="max-w-[220px] text-xs text-[#1c2e40]/60">
                      Pick a recent upload card or tap View on a row in your document list to scroll the full document here.
                    </p>
                  </div>
                )}
              </div>

              <div className="shrink-0 border-t border-black/10 px-4 py-3">
                <button
                  type="button"
                  onClick={() => setQrOpen(true)}
                  className="w-full rounded-xl bg-[#1c2e40] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1c2e40]/90"
                >
                  View QR Code
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {uploadOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeUploadModal()
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-lg rounded-2xl border border-black/10 bg-[#fbfcfe] p-6 shadow-xl shadow-black/15"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 id={titleId} className="text-lg font-semibold text-[#1c2e40]">
                  Upload document
                </h2>
                <p className="mt-1 text-sm text-[#1c2e40]/65">
                  Add your brochure or program, choose how you pay, and set how long it stays active.
                </p>
              </div>
              <button
                type="button"
                onClick={closeUploadModal}
                className="rounded-lg p-2 text-[#1c2e40]/70 transition-colors hover:bg-black/6 hover:text-[#1c2e40]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={onSubmitUpload}>
              <div>
                <label htmlFor={fileId} className="mb-1.5 block text-sm font-medium text-[#1c2e40]">
                  Document file <span className="text-red-600">*</span>
                </label>
                <input
                  id={fileId}
                  name="document"
                  type="file"
                  required
                  accept=".pdf,application/pdf,image/*"
                  className={cn(
                    "block w-full cursor-pointer rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-[#1c2e40]",
                    "file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#50827a]/15 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[#1c2e40]",
                  )}
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                {file ? (
                  <p className="mt-1.5 text-xs text-[#1c2e40]/55">Selected: {file.name}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="doc-title" className="mb-1.5 block text-sm font-medium text-[#1c2e40]">
                  Display title
                </label>
                <input
                  id="doc-title"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  placeholder="e.g. Spring gala program"
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-[#1c2e40] placeholder:text-[#1c2e40]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#50827a]/30"
                />
              </div>

              <div>
                <label htmlFor={qrDateId} className="mb-1.5 block text-sm font-medium text-[#1c2e40]">
                  Date you want to use the QR (Start date)<span className="text-red-600">*</span>
                </label>
                <input
                  id={qrDateId}
                  type="date"
                  required
                  value={qrUseStartDate}
                  onChange={(e) => setQrUseStartDate(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-[#1c2e40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#50827a]/30"
                />
                <p className="mt-1 text-xs text-[#1c2e40]/55">
                  The active QR will be valid from this date for the active period you choose below.
                </p>
              </div>

              <div>
                <span id={paymentId} className="mb-1.5 block text-sm font-medium text-[#1c2e40]">
                  Payment type
                </span>
                <div className="space-y-2 rounded-xl border border-black/10 bg-white p-3" role="group" aria-labelledby={paymentId}>
                  {paymentOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-[#1c2e40] hover:bg-black/3"
                    >
                      <input
                        type="radio"
                        name="paymentType"
                        value={opt.value}
                        checked={paymentType === opt.value}
                        onChange={() => setPaymentType(opt.value)}
                        className="h-4 w-4 accent-[#50827a]"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor={durationId} className="mb-1.5 block text-sm font-medium text-[#1c2e40]">
                  Active period
                </label>
                <select
                  id={durationId}
                  value={campaignDays}
                  onChange={(e) =>
                    setCampaignDays(e.target.value as (typeof durationOptions)[number]["value"])
                  }
                  className="w-full cursor-pointer rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-[#1c2e40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#50827a]/30"
                >
                  {durationOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={closeUploadModal}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!file || !qrUseStartDate.trim()}>
                  Continue to payment
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {qrOpen ? (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeQrModal()
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={qrModalTitleId}
            className="relative w-full max-w-md rounded-2xl border border-black/10 bg-[#fbfcfe] p-6 shadow-xl shadow-black/15"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <p id={qrModalTitleId} className="text-lg font-medium text-[#1c2e40]">
                hi
              </p>
              <button
                type="button"
                onClick={closeQrModal}
                className="rounded-lg p-2 text-[#1c2e40]/70 transition-colors hover:bg-black/6 hover:text-[#1c2e40]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <Button type="button" variant="outline" onClick={closeQrModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

