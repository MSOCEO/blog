import Link from "next/link";

interface PagerProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function Pager({
  currentPage,
  totalPages,
  basePath = "/posts",
}: PagerProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "var(--space-md)",
      }}
    >
      {currentPage > 1 && (
        <Link
          href={`${basePath}/${currentPage === 2 ? "" : `${currentPage - 1}/`}`}
          className="theme-btn theme-btn-outline"
          style={{ padding: "8px 20px", fontSize: "var(--text-sm)" }}
        >
          ← 上一页
        </Link>
      )}
      <span style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
        {currentPage} / {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={`${basePath}/${currentPage + 1}/`}
          className="theme-btn theme-btn-outline"
          style={{ padding: "8px 20px", fontSize: "var(--text-sm)" }}
        >
          下一页 →
        </Link>
      )}
    </nav>
  );
}
