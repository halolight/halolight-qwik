export type NavItem = {
  label: string;
  href: string;
  badge?: string;
};

export const primaryNav: NavItem[] = [
  { label: "总览", href: "/" },
  { label: "实时分析", href: "/analytics" },
  { label: "客户旅程", href: "/journeys", badge: "New" },
  { label: "日历", href: "/calendar" },
  { label: "自动化编排", href: "/automation" },
  { label: "安全中心", href: "/security" },
  { label: "系统设置", href: "/settings" },
];

export const workspaceShortcuts = [
  { label: "HQ China", context: "主工作区" },
  { label: "Global Edge", context: "跨境业务" },
  { label: "AI Studio", context: "Beta" },
];

