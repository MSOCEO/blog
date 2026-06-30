import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { getSiteConfig } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { getTagColor } from "@/lib/utils";

export const metadata: Metadata = {
  title: "关于",
};

const SKILLS = [
  "Next.js", "TypeScript", "Tailwind CSS", "React",
  "Node.js", "GitHub", "Markdown", "Static Site",
  "Design", "Writing",
];

export default function AboutPage() {
  const config = getSiteConfig();

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "var(--text-3xl)",
          fontWeight: 700,
          marginBottom: "var(--space-xl)",
          color: "var(--text-primary)",
        }}
      >
        关于
      </h1>

      <Card>
        {/* Avatar + Name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-lg)",
            marginBottom: "var(--space-xl)",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "var(--radius-full)",
              background: "var(--color-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: 700,
              color: "white",
            }}
          >
            {config.author[0]}
          </div>
          <div>
            <h2
              style={{
                fontSize: "var(--text-xl)",
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              {config.author}
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-sm)",
                margin: "4px 0 0 0",
              }}
            >
              {config.description}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            marginBottom: "var(--space-xl)",
          }}
        >
          嗨，欢迎来到我的博客。这里记录我的技术探索、思考和创作。
          博客基于 Next.js 15 构建，使用极光 Aurora 混合主题——
          融合了 mrzym.top 的博客结构和 koel.dev 的深色质感。
        </p>

        {/* Skills */}
        <h3
          style={{
            fontSize: "var(--text-base)",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "var(--space-md)",
          }}
        >
          技能 & 工具
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-sm)",
          }}
        >
          {SKILLS.map((skill, i) => (
            <Badge key={skill} color={getTagColor(i)}>
              {skill}
            </Badge>
          ))}
        </div>

        {/* Social */}
        {config.social?.github && (
          <div style={{ marginTop: "var(--space-xl)" }}>
            <a
              href={config.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-btn theme-btn-outline"
              style={{ display: "inline-flex", fontSize: "var(--text-sm)" }}
            >
              GitHub →
            </a>
          </div>
        )}
      </Card>
    </div>
  );
}
