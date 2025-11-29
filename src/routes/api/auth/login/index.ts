import type { RequestHandler } from "@builder.io/qwik-city";

const VALID_EMAIL =
  import.meta.env.VITE_DEMO_EMAIL || "admin@halolight.h7ml.cn";
const VALID_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD || "123456";

// Mock accounts for multi-account switching
const mockAccounts = [
  {
    id: 1,
    name: "主账号（管理员）",
    email: "admin@halolight.h7ml.cn",
    permissions: ["dashboard:*", "users:*", "analytics:*", "settings:*"],
    token: "mock-token-admin",
  },
  {
    id: 2,
    name: "日常运营账号",
    email: "ops@halolight.h7ml.cn",
    permissions: ["dashboard:view", "users:view", "analytics:view"],
    token: "mock-token-ops",
  },
  {
    id: 3,
    name: "内容编辑账号",
    email: "editor@halolight.h7ml.cn",
    permissions: ["dashboard:view", "documents:*"],
    token: "mock-token-editor",
  },
];

export const onPost: RequestHandler = async ({ json, parseBody }) => {
  const body = (await parseBody()) as {
    email?: string;
    password?: string;
  };

  const email = body.email?.trim();
  const password = body.password ?? "";

  if (!email || !password) {
    json(400, { success: false, message: "邮箱和密码必填" });
    return;
  }

  if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
    json(401, { success: false, message: "凭证校验失败" });
    return;
  }

  const mainAccount = mockAccounts[0];

  json(200, {
    success: true,
    message: "登录成功，已模拟签发 Token",
    token: mainAccount.token,
    user: {
      id: mainAccount.id,
      name: mainAccount.name,
      email: mainAccount.email,
      permissions: mainAccount.permissions,
    },
    accounts: mockAccounts,
  });
};
