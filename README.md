# Halolight Qwik | Admin Pro

[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/halolight/halolight-qwik/blob/main/LICENSE)
[![Qwik](https://img.shields.io/badge/Qwik-1.17-%23AC7EF4.svg)](https://qwik.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-%233178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-%2306B6D4.svg)](https://tailwindcss.com/)

基于 Qwik + Qwik City 的现代化中文后台管理系统，具备可恢复性(Resumability)、零 JS 首屏加载、极致性能。实现遵循根仓 `CLAUDE.md` 规范，可与 Next.js / Vue 参考实现保持一致的 IA、Mock 数据及认证流程。

- 在线预览：<https://halolight-qwik.h7ml.cn>
- GitHub：<https://github.com/halolight/halolight-qwik>

## 🚀 项目亮点

### 🎯 核心功能

- **📊 可拖拽仪表盘**：基于 GridStack.js 的拖拽布局系统，支持添加/删除/拖拽/调整大小
- **📈 智能组件**：统计卡片、折线图、柱状图、饼图等 9 种组件类型
- **🎨 主题系统**：Tailwind + CSS 变量实现明暗主题切换
- **🔐 完整认证**：登录/注册/忘记密码/重置密码流程
- **📱 响应式**：完美适配桌面、平板、移动端

### 🛠 技术特色

- **可恢复性架构**：服务端渲染状态可直接恢复，无需重新执行
- **零 Hydration**：客户端无需重新执行代码，极致性能
- **O(1) 启动时间**：无论应用多大，启动时间恒定
- **延迟加载一切**：组件、事件处理器、样式都按需加载

## 📊 功能详情

### 可拖拽仪表盘系统

- **拖拽布局**：自由拖拽组件，实时保存布局
- **响应式适配**：4个断点（lg/md/sm/xs）自动适配
- **本地持久化**：布局自动保存到 localStorage
- **编辑模式**：一键切换编辑/预览模式
- **组件管理**：支持添加、删除、调整大小

### 组件类型（9种）

- **统计卡片**：收入、用户、留存率、安全拦截
- **图表组件**：折线图、柱状图、饼图（自研SVG实现）
- **功能组件**：最近用户、通知公告、任务管理、日历、快捷操作

### 数据系统

- **Mock数据**：完整的模拟数据体系
- **实时更新**：支持数据实时刷新
- **类型安全**：TypeScript全程类型检查

## 🏗️ 项目结构

```
src/
├── components/
│   ├── dashboard/      # 可拖拽仪表盘组件
│   ├── icons/          # 轻量 SVG 图标
│   ├── layout/         # Sidebar、TopBar、ThemeToggle
│   └── widgets/        # 仪表盘组件（统计、图表等）
├── lib/
│   └── mock/           # 仪表盘 & 工作流 Mock 数据
├── routes/
│   ├── layout.tsx      # 全局布局 + 主题驱动
│   ├── index.tsx       # 可拖拽仪表盘首页
│   ├── auth/           # 认证相关页面
│   ├── analytics/      # 各业务模块占位
│   └── ...             # 其它路由
├── stores/             # 状态管理（Dashboard Store）
├── types/              # TypeScript 类型定义
└── global.css          # Tailwind + 设计令牌 + 仪表盘样式
```

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器 (http://localhost:5173)
pnpm start

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 代码检查
pnpm lint
```

## 🎯 使用指南

### 仪表盘操作

1. **进入编辑模式**：点击右上角"编辑布局"按钮
2. **拖拽组件**：拖动组件标题栏移动位置
3. **调整大小**：拖拽组件右下角调整尺寸
4. **添加组件**：点击"添加组件"选择新组件
5. **删除组件**：点击组件右上角的×按钮
6. **保存布局**：退出编辑模式自动保存

### 主题切换

- 点击顶部导航栏的主题切换按钮
- 支持自动跟随系统主题

## 🔧 技术栈

| 类别      | 技术                                   |
| --------- | -------------------------------------- |
| 核心框架  | Qwik 1.17 + Qwik City                  |
| 类型系统  | TypeScript 5.9                         |
| 构建工具  | Vite 7 + PNPM 10                       |
| 样式      | Tailwind CSS 3.4 + CSS Variables       |
| 拖拽布局  | GridStack.js 12.3                      |
| 表单/动作 | `routeAction$`、Qwik Form              |
| 数据      | Mock.js（仿真数据置于 `src/lib/mock`） |

## 📈 开发进度

### ✅ 已完成（60%）

- [x] 基础架构和路由系统
- [x] 认证系统（登录/注册/忘记密码）
- [x] 主题系统（明暗切换）
- [x] 可拖拽仪表盘核心功能
- [x] 9种组件类型实现
- [x] 响应式布局适配
- [x] 本地存储持久化
- [x] 状态管理系统

### 🔄 进行中（30%）

- [ ] ECharts图表库集成
- [ ] TabBar多页签系统
- [ ] Command Menu全局搜索
- [ ] 日历功能页面
- [ ] 消息通知系统

### 📋 待规划（10%）

- [ ] 多种主题皮肤扩展
- [ ] 动画和过渡效果
- [ ] PWA离线能力
- [ ] WebSocket实时通信
- [ ] 用户管理系统
- [ ] 文件管理系统

## 🌟 技术亮点

### GridStack.js 深度集成

- **框架无关**：纯JavaScript实现，完美适配Qwik
- **性能优异**：CSS transform实现流畅动画
- **功能完整**：拖拽、缩放、响应式、持久化

### Qwik 架构优势

- **可恢复性**：SSR状态直接恢复，无需重新执行
- **细粒度加载**：组件级代码分割，按需加载
- **零JS首屏**：服务端渲染，客户端零JavaScript执行

### 响应式设计

- **多断点适配**：lg/md/sm/xs四个断点
- **移动端优化**：触摸友好的交互体验
- **弹性布局**：12列网格系统

## 🤝 贡献指南

欢迎贡献代码和提出建议！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

[MIT](LICENSE) License - 详见 [LICENSE](LICENSE) 文件

---

**⭐ 如果这个项目对你有帮助，请给个Star支持一下！**

## 目录结构

```
src/
├── components/
│   ├── icons/        # 轻量 SVG 图标
│   └── layout/       # Sidebar、TopBar、ThemeToggle
├── lib/
│   └── mock/         # 仪表盘 & 工作流 Mock 数据
├── routes/
│   ├── layout.tsx    # 全局布局 + 主题驱动
│   ├── index.tsx     # Dashboard
│   ├── auth/         # 认证相关页面
│   ├── analytics/    # 各业务模块占位
│   └── ...           # 其它路由
└── global.css        # Tailwind + 设计令牌
```

## 快速开始

```bash
pnpm install
pnpm start        # 启动开发服务器 (http://localhost:5173)
pnpm build        # Qwik 全量构建
pnpm preview      # 预览生产构建
pnpm lint         # ESLint 校验
```

## 技术栈

| 类别      | 技术                                   |
| --------- | -------------------------------------- |
| 类别      | 技术                                   |
| ------    | ------                                 |
| 核心框架  | Qwik 1.17 + Qwik City                  |
| 类型系统  | TypeScript 5.9                         |
| 构建工具  | Vite 7 + PNPM 10                       |
| 样式      | Tailwind CSS 3.4 + CSS Variables       |
| 表单/动作 | `routeAction$`、Qwik Form              |
| 数据      | Mock.js（仿真数据置于 `src/lib/mock`） |

## 为什么选择 Qwik

- **可恢复性**：服务端渲染的状态可在客户端直接恢复，无需重新执行
- **零 Hydration**：不像传统框架需要在客户端重新执行代码
- **O(1) 启动时间**：无论应用多大，启动时间恒定
- **延迟加载一切**：组件、事件处理器、样式都按需加载

## 许可证

[MIT](LICENSE)
