import { getSiteConfig } from "@/lib/config";

export function Footer() {
  const config = getSiteConfig();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-default)",
        padding: "var(--space-2xl) var(--space-xl)",
        textAlign: "center",
        color: "var(--text-muted)",
        fontSize: "var(--text-xs)",
      }}
    >
      <p style={{ margin: 0 }}>
        &copy; {new Date().getFullYear()} {config.name} &middot; Powered by{" "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--color-accent)" }}
        >
          Next.js
        </a>{" "}
        &amp;{" "}
        <a
          href="https://github.com/MSOCEO/xusu"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--color-accent)" }}
        >
          Xusu
        </a>
      </p>
      {config.social?.github && (
        <p style={{ margin: "8px 0 0 0" }}>
          <a
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-muted)" }}
          >
            GitHub
          </a>
        </p>
      )}
    </footer>
  );
}
