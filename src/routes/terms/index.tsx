import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article class="prose prose-slate max-w-none">
        <h1 class="text-3xl font-bold tracking-tight">服务条款</h1>
        <p class="text-muted-foreground">最后更新日期:2024年11月28日</p>

        <section class="mt-8">
          <h2 class="text-xl font-semibold">1. 服务说明</h2>
          <p class="text-muted-foreground leading-relaxed">
            欢迎使用 HaloLight 后台管理系统(以下简称"本服务")。本服务由 HaloLight 团队提供,
            旨在为用户提供高效、安全的企业级后台管理解决方案。在使用本服务之前,请您仔细阅读并理解本服务条款的全部内容。
          </p>
        </section>

        <section class="mt-8">
          <h2 class="text-xl font-semibold">2. 用户账户</h2>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">2.1 账户注册</h4>
              <p class="text-muted-foreground text-sm leading-relaxed">
                用户在使用本服务前需要注册账户。注册时,您需要提供真实、准确、完整的个人信息,
                并在信息发生变化时及时更新。您有责任维护账户的安全性,并对账户下的所有活动负责。
              </p>
            </div>
            <div>
              <h4 class="font-medium mb-2">2.2 账户安全</h4>
              <p class="text-muted-foreground text-sm leading-relaxed">
                您应当妥善保管账户密码,不得将账户借给他人使用。如发现账户被盗用或存在安全漏洞,
                请立即通知我们。因账户管理不善导致的损失由用户自行承担。
              </p>
            </div>
          </div>
        </section>

        <section class="mt-8">
          <h2 class="text-xl font-semibold">3. 服务使用规范</h2>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">3.1 合法使用</h4>
              <p class="text-muted-foreground text-sm leading-relaxed">
                您同意仅将本服务用于合法目的,不得利用本服务从事任何违反法律法规、侵害他人权益的活动。
              </p>
            </div>
            <div>
              <h4 class="font-medium mb-2">3.2 禁止行为</h4>
              <ul class="text-muted-foreground text-sm space-y-2 list-disc pl-6">
                <li>未经授权访问或试图访问本服务的任何部分或功能</li>
                <li>干扰或破坏本服务的正常运行</li>
                <li>传播病毒、木马或其他恶意软件</li>
                <li>收集或存储其他用户的个人信息</li>
                <li>进行任何可能损害本服务或其他用户利益的行为</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="mt-8">
          <h2 class="text-xl font-semibold">4. 知识产权</h2>
          <p class="text-muted-foreground leading-relaxed">
            本服务中的所有内容,包括但不限于文字、图片、音频、视频、软件、程序代码等,
            均受相关知识产权法律的保护。未经书面许可,您不得复制、修改、传播或以其他方式使用本服务的任何内容。
          </p>
        </section>

        <section class="mt-8">
          <h2 class="text-xl font-semibold">5. 免责声明</h2>
          <p class="text-muted-foreground leading-relaxed">
            本服务按"现状"提供,我们不对服务的适用性、可靠性、准确性作任何明示或暗示的保证。
            在法律允许的最大范围内,我们不对因使用本服务而产生的任何直接、间接、附带、特殊或后果性损害负责。
          </p>
        </section>

        <section class="mt-8">
          <h2 class="text-xl font-semibold">6. 服务变更与终止</h2>
          <p class="text-muted-foreground leading-relaxed">
            我们保留随时修改、暂停或终止本服务的权利,且无需事先通知。如果我们对服务条款进行重大修改,
            我们将通过适当方式通知您。继续使用本服务将视为您接受修改后的条款。
          </p>
        </section>

        <section class="mt-8">
          <h2 class="text-xl font-semibold">7. 联系我们</h2>
          <p class="text-muted-foreground leading-relaxed">
            如果您对本服务条款有任何疑问,请通过以下方式联系我们:
          </p>
          <ul class="list-none text-muted-foreground space-y-1 mt-4">
            <li>邮箱: support@halolight.h7ml.cn</li>
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
  title: "服务条款 · HaloLight Qwik",
  meta: [
    {
      name: "description",
      content: "HaloLight 服务条款 - 了解使用本服务的规则和限制",
    },
  ],
};
