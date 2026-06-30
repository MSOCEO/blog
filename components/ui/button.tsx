import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
}

function variantClass(v: ButtonVariant): string {
  switch (v) {
    case "primary":
      return "theme-btn theme-btn-primary";
    case "outline":
      return "theme-btn theme-btn-outline";
    case "ghost":
      return "theme-btn theme-btn-ghost";
  }
}

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${variantClass(variant)} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
