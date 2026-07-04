import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import ChatWidget from "../chat/ChatWidget";
import RouteSEO from "../RouteSEO";
import ErrorBoundary from "../ErrorBoundary";
import MobileStickyCTA from "../MobileStickyCTA";
import { useLanguage } from "../../context/LanguageContext";

function focusMainContent(event) {
  event.preventDefault();
  const main = document.getElementById("main-content");
  if (!main) return;
  main.focus({ preventScroll: true });
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  main.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
}

export default function Layout() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <RouteSEO />
      <a href="#main-content" className="skip-link" onClick={focusMainContent}>
        {t("common.skipToMain")}
      </a>
      <ScrollToTop />
      <Header />
      <main
        id="main-content"
        className="flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
        tabIndex={-1}
      >
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <ChatWidget />
      <MobileStickyCTA />
    </div>
  );
}
