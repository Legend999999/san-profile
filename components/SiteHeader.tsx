"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "#home", label: "سەرەتا" },
  { href: "#services", label: "خزمەتگوزارییەکان" },
  { href: "#projects", label: "پڕۆژەکان" },
  { href: "#process", label: "چۆنیەتی کارکردن" },
  { href: "#about", label: "دەربارە" },
  { href: "#contact", label: "پەیوەندی" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-shell">
        <Link className="agency-brand" href="#home" onClick={() => setOpen(false)}>
          <span className="brand-symbol" aria-hidden="true">KW</span>
          <span>کورد وێبسایت</span>
        </Link>

        <nav className="desktop-nav" aria-label="منوی سەرەکی">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#contact">
          گفتوگۆی سەرەتایی
        </a>

        <button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? "داخستنی منو" : "کردنەوەی منو"}
          className="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${open ? "open" : ""}`} id="mobile-menu">
        <nav aria-label="منوی مۆبایل">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="button primary" href="#contact" onClick={() => setOpen(false)}>
            گفتوگۆی سەرەتایی
          </a>
        </nav>
      </div>
    </header>
  );
}
