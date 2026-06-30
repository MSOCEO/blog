interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function Avatar({
  src,
  alt = "avatar",
  size = 44,
  className = "",
}: AvatarProps) {
  const fallback = (
    <div
      style={{
        width: size,
        height: size,
        background: "var(--bg-card-alt)",
        color: "var(--text-muted)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-full)",
        fontSize: size * 0.4,
        fontWeight: 700,
      }}
    >
      {alt[0]?.toUpperCase() || "A"}
    </div>
  );

  if (!src) return fallback;

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ borderRadius: "var(--radius-full)", objectFit: "cover" }}
      className={className}
    />
  );
}
