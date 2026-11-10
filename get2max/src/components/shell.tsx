"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
  ArrowUp,
  Sprout,
} from "lucide-react";
import { useDemo } from "@/lib/store";
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const { error } = useDemo();
  useEffect(() => {
    let preference = false;
    try {
      preference = localStorage.getItem("get2max-theme") === "dark";
    } catch {}
    document.documentElement.dataset.theme = preference ? "dark" : "light";
    // Synchronize the toggle with the stored browser preference after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(preference);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("get2max-theme", next ? "dark" : "light");
    } catch {}
  };
  const nav = [
    ["Explore", "/categories"],
    ["Resources", "/resources"],
    ["Courses", "/courses"],
    ["My Goals", "/goals"],
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="logo" aria-label="get2max home">
            get<span>2</span>max<span className="logo-dot">.</span>
            <ArrowUpRight size={20} strokeWidth={2.8} />
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={path.startsWith(href) ? "active" : ""}
                aria-current={path.startsWith(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button theme-button"
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              href="/dashboard"
              className="button button-dark dashboard-link"
            >
              My dashboard
              <ArrowUpRight size={15} />
            </Link>
            <button
              className="icon-button mobile-menu-toggle"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {[...nav, ["Dashboard", "/dashboard"]].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </nav>
        )}
      </header>
      {error && (
        <div className="storage-warning" role="status">
          {error}
        </div>
      )}
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="footer-main">
          <div>
            <Link href="/" className="logo">
              get<span>2</span>max<span className="logo-dot">.</span>
              <ArrowUpRight size={20} />
            </Link>
            <p>A little better, every day.</p>
          </div>
          <div className="footer-links">
            <Link href="/categories">Explore categories</Link>
            <Link href="/courses">Find a course</Link>
            <Link href="/goals">Set a goal</Link>
            <Link href="/dashboard">
              Your dashboard
              <ArrowRight size={14} />
            </Link>
          </div>
          <button
            className="back-top icon-button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp size={19} />
          </button>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} get2max. Made for your next chapter.
          </span>
          <span>
            <Sprout size={13} /> Single-user demo · Progress saved in this
            browser
          </span>
        </div>
      </footer>
    </>
  );
}
