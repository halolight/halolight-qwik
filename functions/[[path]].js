// CloudFlare Pages Functions 入口文件 - 处理SPA路由
export function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // 处理静态文件 - 让CloudFlare直接处理
  if (url.pathname.startsWith('/build/') ||
      url.pathname.startsWith('/assets/') ||
      url.pathname === '/' ||
      url.pathname.endsWith('.html') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.json')) {
    return next();
  }

  // 处理 SPA 路由 - 返回 index.html
  return next('/index.html');
}