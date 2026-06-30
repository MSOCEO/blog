"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "文章", href: "/posts/" },
  { label: "归档", href: "/archive/" },
  { label: "标签", href: "/tags/" },
  { label: "花园", href: "/garden/" },
  { label: "碎念", href: "/murmurs/" },
  { label: "友链", href: "/friends/" },
  { label: "关于", href: "/about/" },
];

interface NavProps {
  className?: string;
}

export function Nav({ className = "" }: NavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`${className}`}
      style={{
        display: "flex",
        gap: "2px",
      }}
    >
      {NAV_ITEMS.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`theme-nav-link ${isActive ? "active" : ""}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
