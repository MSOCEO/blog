interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function Badge({ children, color, className = "" }: BadgeProps) {
  return (
    <span
      className={`theme-tag ${className}`}
      style={
        color
          ? {
              background: `${color}22`,
              color: color,
            }
          : {
              background: "var(--bg-card-alt)",
              color: "var(--text-secondary)",
            }
      }
    >
      {children}
    </span>
  );
}
