# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Halolight Qwik 是一个基于 Qwik + Qwik City 的现代化中文后台管理系统，具备可恢复性架构和极致性能。

- **在线预览**: https://halolight-qwik.h7ml.cn
- **GitHub**: https://github.com/halolight/halolight-qwik

## 技术栈速览

- **核心框架**: Qwik 1.17 + Qwik City
- **构建工具**: Vite
- **路由**: Qwik City 文件路由
- **样式**: Tailwind CSS 3.4
- **类型**: TypeScript 5.9

## 常用命令

```bash
pnpm start        # 启动开发服务器
pnpm build        # 生产构建
pnpm preview      # 预览构建产物
pnpm qwik add     # 添加集成 (Tailwind, Netlify 等)
```

## 架构

### Qwik 核心概念

```tsx
import { component$, useSignal } from "@builder.io/qwik";

// $ 后缀表示懒加载边界
export default component$(() => {
  const count = useSignal(0);

  return <button onClick$={() => count.value++}>Count: {count.value}</button>;
});
```

### 目录结构

```
src/
├── routes/           # 文件路由
│   ├── index.tsx     # / 路由
│   ├── layout.tsx    # 布局组件
│   └── [...404]/     # 404 页面
├── components/       # 可复用组件
├── root.tsx          # 应用根
├── entry.ssr.tsx     # SSR 入口
└── global.css        # 全局样式
```

### Qwik 特殊语法

- `component$()` - 定义组件（懒加载边界）
- `$()` - 定义懒加载函数
- `useSignal()` - 响应式状态
- `useStore()` - 响应式对象
- `useTask$()` - 副作用（类似 useEffect）
- `useVisibleTask$()` - 仅客户端执行的任务

### 代码规范

- **$ 后缀**: 所有需要序列化的函数必须使用 $ 后缀
- **组件定义**: 使用 `component$()` 包装
- **事件处理**: 使用 `onClick$` 而非 `onClick`

## 环境变量

| 变量名           | 说明           | 默认值      |
| ---------------- | -------------- | ----------- |
| `VITE_API_URL`   | API 基础 URL   | `/api`      |
| `VITE_MOCK`      | 启用 Mock 数据 | `true`      |
| `VITE_APP_TITLE` | 应用标题       | `Admin Pro` |

## 新增功能开发指南

### 添加新页面

在 `src/routes/` 下创建文件：

```tsx
// src/routes/dashboard/index.tsx
import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <main>Dashboard</main>;
});

export const head: DocumentHead = {
  title: "Dashboard",
};
```

### 添加新组件

```tsx
// src/components/Button.tsx
import { component$, Slot } from "@builder.io/qwik";

export const Button = component$(() => {
  return (
    <button class="px-4 py-2 bg-blue-600 text-white rounded">
      <Slot />
    </button>
  );
});
```

## 注意事项

- **序列化限制**: $ 函数中只能访问可序列化的值
- **闭包陷阱**: 避免在 $ 函数中捕获非序列化数据
- **SSR 优先**: 默认服务端渲染，客户端仅加载交互代码
