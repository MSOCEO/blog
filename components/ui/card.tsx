import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`theme-card ${hover ? "" : "hover:transform-none hover:shadow-none"} ${className}`.trim()}
      style={{ padding: "var(--space-xl)" }}
    >
      {children}
    </div>
  );
}
