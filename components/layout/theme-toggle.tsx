"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
  }, []);

  function toggle() {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setIsDark(html.classList.contains("dark"));
  }

  return (
    <button
      onClick={toggle}
      style={{
        background: "none",
        border: "none",
        color: "var(--text-secondary)",
        cursor: "pointer",
        padding: "6px 8px",
        borderRadius: "var(--radius-sm)",
        fontSize: "1.1rem",
        transition: "color var(--transition-fast)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "var(--text-secondary)")
      }
      aria-label={isDark ? "切换到亮色模式" : "切换到暗色模式"}
    >
      {isDark ? "☀" : "🌙"}
    </button>
  );
}
