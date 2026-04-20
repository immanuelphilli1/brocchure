import { useMemo, useState } from "react"
import { DashboardPage } from "./pages/dashboard-page"
import { LandingPage } from "./pages/landing-page"
import { LoginPage } from "./pages/login-page"

function App() {
  const [openLegal, setOpenLegal] = useState<null | "privacy" | "terms">(null)
  const [activeView, setActiveView] = useState<"landing" | "dashboard">("landing")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const pricing = useMemo(
    () => [
      { days: 1, price: 10 },
      { days: 2, price: 12 },
      { days: 3, price: 15 },
      { days: 4, price: 18 },
      { days: 5, price: 22 },
      { days: 6, price: 25 },
      { days: 7, price: 30 },
      // { days: 14, price: 50 },
      // { days: 30, price: 100 },
    ],
    [],
  )

  if (activeView === "dashboard") {
    if (!isAuthenticated) {
      return (
        <LoginPage
          onBack={() => setActiveView("landing")}
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      )
    }

    return (
      <DashboardPage
        onLogout={() => setIsAuthenticated(false)}
        onGoHome={() => setActiveView("landing")}
      />
    )
  }

  return (
    <LandingPage
      pricing={pricing}
      openLegal={openLegal}
      onOpenLegal={setOpenLegal}
      onCloseLegal={() => setOpenLegal(null)}
      onGoToDashboard={() => setActiveView("dashboard")}
    />
  )
}

export default App
