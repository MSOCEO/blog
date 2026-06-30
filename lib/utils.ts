import { format, parseISO } from "date-fns";
import { zhCN } from "date-fns/locale";

export function formatDate(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, "yyyy 年 M 月 d 日", { locale: zhCN });
  } catch {
    return dateStr;
  }
}

export function formatDateShort(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, "MM-dd", { locale: zhCN });
  } catch {
    return dateStr;
  }
}

export function formatDateISO(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, "yyyy-MM-dd");
  } catch {
    return dateStr;
  }
}

export function getYear(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, "yyyy");
  } catch {
    return dateStr.slice(0, 4);
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
}

export function getTagColor(index: number): string {
  const colors = [
    "#E91E8C",
    "#4ADE80",
    "#A78BFA",
    "#22D3EE",
    "#F472B6",
    "#FBBF24",
    "#60A5FA",
    "#FB7185",
  ];
  return colors[index % colors.length];
}
