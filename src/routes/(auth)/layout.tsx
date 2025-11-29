import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="relative min-h-screen lg:h-dvh overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Grid */}
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Animated Halos */}
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-blue-400/30 to-cyan-400/30 animate-pulse-slow" />
        <div class="absolute top-1/3 -right-32 w-80 h-80 rounded-full blur-3xl bg-gradient-to-br from-indigo-400/30 to-purple-400/30 animate-pulse-slower" />
        <div class="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-violet-400/20 to-pink-400/20 animate-pulse-slowest" />
      </div>

      <div class="relative flex min-h-screen lg:h-full flex-col lg:flex-row">
        {/* Left Panel */}
        <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700" />
          <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* Floating Dots */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              class="absolute w-2 h-2 rounded-full bg-white/20 animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}

          <div class="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
            {/* Logo Section */}
            <div class="animate-fade-in-up" style="animation-delay: 0.4s">
              <div class="flex items-center gap-3 mb-12 group cursor-pointer">
                <div class="relative h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
                  <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
                </div>
                <div>
                  <h2 class="text-2xl font-bold tracking-tight">Admin Pro</h2>
                  <p class="text-xs text-white/60">企业级管理系统</p>
                </div>
              </div>
            </div>

            {/* Welcome Text */}
            <h1 class="text-5xl xl:text-6xl font-bold mb-6 leading-tight animate-fade-in-up" style="animation-delay: 0.5s">
              欢迎回来
              <span class="inline-block ml-2 animate-wave">👋</span>
            </h1>
            <p class="text-lg text-white/70 max-w-md leading-relaxed mb-12 animate-fade-in-up" style="animation-delay: 0.6s">
              登录您的账户，开始管理您的业务数据和团队协作，体验高效的工作流程。
            </p>

            {/* Features List */}
            <div class="space-y-4">
              {[
                { icon: "🚀", text: "快速部署，即刻启动" },
                { icon: "📊", text: "实时数据分析与可视化" },
                { icon: "🔒", text: "企业级安全保障" },
                { icon: "⚡", text: "极致性能体验" },
              ].map((item, index) => (
                <div
                  key={item.text}
                  class="flex items-center gap-3 group animate-fade-in-left"
                  style={`animation-delay: ${0.7 + index * 0.1}s`}
                >
                  <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span class="text-white/90">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div class="flex-1 flex items-center justify-center p-3 sm:p-4 lg:px-10 lg:py-6">
          <Slot />
        </div>
      </div>
    </div>
  );
});
