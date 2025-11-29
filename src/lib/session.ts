import type { AuthUser } from "~/stores/auth";

export const AUTH_TOKEN_COOKIE = "halolight_token";
export const AUTH_USER_COOKIE = "halolight_user";

export const serializeUser = (user: AuthUser) => JSON.stringify(user);

export const parseUser = (value?: string | null): AuthUser | null => {
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    return null;
  }
};


