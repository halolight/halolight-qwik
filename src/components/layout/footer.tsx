import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { HeartIcon, GithubIcon } from "~/components/icons";
import { projectInfo } from "~/lib/project-info";

export const Footer = component$(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center justify-between gap-2 py-4 text-sm text-muted-foreground sm:flex-row">
          {/* 版权信息 */}
          <div class="flex items-center gap-1">
            <span>© {currentYear} {projectInfo.name}</span>
            <span class="hidden sm:inline">·</span>
            <span class="hidden sm:inline">All rights reserved</span>
          </div>

          {/* 作者信息 */}
          <div class="flex items-center gap-1">
            <span class="hidden sm:inline">Made with</span>
            <HeartIcon class="h-3.5 w-3.5 text-red-500 fill-red-500" />
            <span class="hidden sm:inline">by</span>
            <a
              href={`https://github.com/${projectInfo.author}`}
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {projectInfo.author}
            </a>
          </div>

          {/* 链接 */}
          <div class="flex items-center gap-3 text-xs">
            <a
              href="https://halolight.docs.h7ml.cn"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
            >
              在线文档
            </a>
            <Link
              href="/privacy"
              class="hover:text-primary transition-colors"
            >
              隐私政策
            </Link>
            <Link
              href="/terms"
              class="hover:text-primary transition-colors"
            >
              服务条款
            </Link>
            <a
              href={projectInfo.repo}
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors flex items-center gap-1"
            >
              <GithubIcon size={14} />
              GitHub
            </a>
          </div>
        </div>

        {/* 版本信息 */}
        <div class="border-t border-border/30 pt-3 mt-3">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <div class="flex items-center gap-4">
              <span>版本: {projectInfo.version}</span>
              <span>构建时间: {new Date().toLocaleString()}</span>
            </div>
            <div class="flex items-center gap-2">
              <span>Powered by Qwik</span>
              <span>·</span>
              <span>开源 · 免费</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});