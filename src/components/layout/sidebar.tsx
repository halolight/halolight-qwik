import {
  $,
  component$,
  type QwikIntrinsicElements,
  type Signal,
} from "@builder.io/qwik";
import clsx from "clsx";
import { Link, useLocation } from "@builder.io/qwik-city";
import { primaryNav, workspaceShortcuts } from "~/lib/navigation";
import { SparkIcon } from "~/components/icons";

type SidebarProps = {
  isOpen: Signal<boolean>;
};

export const Sidebar = component$<SidebarProps>(({ isOpen }) => {
  const location = useLocation();
  const close = $(() => {
    isOpen.value = false;
  });

  const linkClass = (href: string): QwikIntrinsicElements["a"]["class"] => {
    const active =
      href === "/"
        ? location.url.pathname === "/"
        : location.url.pathname.startsWith(href);
    return clsx(
      "flex items-center justify-between rounded-xl px-4 py-2 text-sm font-medium transition",
      active
        ? "bg-primary/10 text-primary-foreground/90 ring-1 ring-primary/50"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
    );
  };

  return (
    <>
      <div
        class={[
          "fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition lg:hidden",
          isOpen.value ? "opacity-100" : "pointer-events-none opacity-0",
        ]}
        onClick$={close}
      />
      <aside
        class={[
          "fixed inset-y-0 left-0 z-40 w-80 border-r border-border/60 bg-card/95 px-5 py-6 backdrop-blur-xl transition-transform",
          "lg:static lg:w-72 lg:translate-x-0",
          isOpen.value ? "translate-x-0" : "-translate-x-full",
        ]}
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <SparkIcon size={18} />
            </div>
            <div>
              <p class="text-sm uppercase tracking-[0.35em] text-muted-foreground">
                HaloLight
              </p>
              <p class="text-lg font-semibold">Control Center</p>
            </div>
          </div>
          <button
            class="rounded-full border border-border/60 p-1 text-muted-foreground transition hover:text-foreground lg:hidden"
            onClick$={close}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div class="mt-8 space-y-6">
          <div>
            <p class="section-title mb-3">导航</p>
            <nav class="space-y-2">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  class={linkClass(item.href)}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span class="rounded-full bg-primary/10 px-2 text-xs text-primary">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p class="section-title mb-3">工作区</p>
            <div class="space-y-2">
              {workspaceShortcuts.map((workspace) => (
                <button
                  key={workspace.label}
                  class="w-full rounded-2xl border border-dashed border-border/70 px-4 py-3 text-left transition hover:border-primary/50 hover:bg-primary/5"
                >
                  <p class="text-sm font-semibold text-foreground">
                    {workspace.label}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {workspace.context}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div class="mt-8 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-4">
          <p class="text-sm font-semibold text-primary-foreground/80">
            实时状态
          </p>
          <p class="text-2xl font-bold text-foreground">99.996%</p>
          <p class="text-xs text-muted-foreground">Edge Network SLA</p>
          <button class="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary">
            查看状态页
          </button>
        </div>
      </aside>
    </>
  );
});
