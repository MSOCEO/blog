"use client";

import { useState } from "react";
import { Nav } from "./nav";
import ThemeToggle from "./theme-toggle";
import Link from "next/link";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="theme-header-glass"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: "var(--header-height)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width-wide)",
          margin: "0 auto",
          padding: "0 var(--space-xl)",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "-0.5px",
          }}
        >
          <span style={{ color: "var(--color-accent)" }}>叙</span>溯
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-sm)",
          }}
        >
          <Nav className="hidden md:flex" />
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-primary)",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "4px 8px",
            }}
            aria-label="菜单"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          style={{
            background: "var(--bg-header)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border-default)",
            padding: "var(--space-md) var(--space-xl)",
          }}
        >
          <Nav className="flex-col" />
        </div>
      )}
    </header>
  );
}
