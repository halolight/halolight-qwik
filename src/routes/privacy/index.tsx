import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article class="prose prose-slate max-w-none">
        <h1 class="text-3xl font-bold tracking-tight">隐私政策</h1>
        <p class="text-muted-foreground">最后更新日期:2024年1月1日</p>

        <section class="mt-8">
          <h2 class="text-xl font-semibold">1. 引言</h2>
          <p class="text-muted-foreground leading-relaxed">
            欢迎使用 HaloLight(以下简称"本服务"或"我们")。我们非常重视您的隐私和个人信息保护。
            本隐私政策将向您说明我们如何收集、使用、存储和保护您的个人信息,
            以及您享有的相关权利。请您在使用本服务前仔细阅读本政策。
          </p>
        </section>

        <section class="mt-8">
          <h2 class="text-xl font-semibold">2. 信息收集</h2>
          <p class="text-muted-foreground leading-relaxed">我们可能收集以下类型的信息:</p>
          <ul class="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
            <li>
              <strong>账户信息:</strong>
              当您注册账户时,我们会收集您的姓名、电子邮件地址、密码等基本信息。
            </li>
            <li>
              <strong>使用数据:</strong>
              我们会自动收集您使用服务的相关数据,包括访问时间、浏览页面、点击操作等。
            </li>
            <li>
              <strong>设备信息:</strong>
              我们可能收集您的设备类型、操作系统、浏览器类型、IP地址等技术信息。
            </li>
            <li>
              <strong>Cookie 和类似技术:</strong>
              我们使用 Cookie 和类似技术来提升用户体验和分析服务使用情况。
            </li>
          </ul>
        </section>

        <section class="mt-8">
          <h2 class="text-xl font-semibold">3. 信息使用</h2>
          <p class="text-muted-foreground leading-relaxed">我们收集的信息将用于以下目的:</p>
          <ul class="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
            <li>提供、维护和改进我们的服务</li>
            <li>处理您的请求和交易</li>
            <li>发送服务相关的通知和更新</li>
            <li>分析服务使用情况以优化用户体验</li>
            <li>检测和防止欺诈或其他非法活动</li>
            <li>遵守法律法规要求</li>
          </ul>
        </section>

        <section class="mt-8">
          <h2 class="text-xl font-semibold">4. 信息共享</h2>
          <p class="text-muted-foreground leading-relaxed">
            我们不会出售您的个人信息。我们仅在以下情况下共享您的信息:
          </p>
          <ul class="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
            <li>经您明确同意</li>
            <li>与为我们提供服务的合作伙伴共享(受保密协议约束)</li>
            <li>为遵守法律要求或响应合法的政府请求</li>
            <li>为保护我们、用户或公众的权利、财产或安全</li>
          </ul>
        </section>

        <section class="mt-8">
          <h2 class="text-xl font-semibold">5. 联系我们</h2>
          <p class="text-muted-foreground leading-relaxed">
            如果您对本隐私政策有任何疑问或建议,请通过以下方式联系我们:
          </p>
          <ul class="list-none text-muted-foreground space-y-1 mt-4">
            <li>电子邮件: privacy@halolight.h7ml.cn</li>
            <li>网站: https://halolight.docs.h7ml.cn</li>
          </ul>
        </section>

        <div class="mt-12 pt-6 border-t border-border">
          <Link href="/login" class="text-primary hover:underline">
            返回登录
          </Link>
        </div>
      </article>
    </div>
  );
});

export const head: DocumentHead = {
  title: "隐私政策 · HaloLight Qwik",
  meta: [
    {
      name: "description",
      content: "HaloLight 隐私政策 - 了解我们如何收集、使用和保护您的个人信息",
    },
  ],
};
