import {
  $,
  createContextId,
  useComputed$,
  useContext,
  useContextProvider,
  useStore,
  type QRL,
  type Signal,
} from "@builder.io/qwik";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  permissions: string[];
};

export interface AccountWithToken extends AuthUser {
  token: string;
}

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
  accounts: AccountWithToken[];
  activeAccountId: number | null;
  loading: boolean;
};

export const AuthContext = createContextId<AuthState>("halolight.auth.context");

export const useAuthProvider = () => {
  const store = useStore<AuthState>({
    user: null,
    token: null,
    accounts: [],
    activeAccountId: null,
    loading: false,
  });
  useContextProvider(AuthContext, store);
  return store;
};

export type UseAuthReturn = {
  state: AuthState;
  isAuthenticated: Signal<boolean>;
  permissions: Signal<string[]>;
  login: QRL<(payload: { token: string; user: AuthUser; accounts?: AccountWithToken[] }) => void>;
  logout: QRL<() => void>;
  switchAccount: QRL<(accountId: number) => void>;
  hasPermission: QRL<(permission: string) => boolean>;
};

export const useAuth = (): UseAuthReturn => {
  const state = useContext(AuthContext);

  const isAuthenticated = useComputed$(() =>
    Boolean(state.token && state.user),
  );
  const permissions = useComputed$(() => state.user?.permissions ?? []);

  const login = $(({ token, user, accounts }: { token: string; user: AuthUser; accounts?: AccountWithToken[] }) => {
    state.token = token;
    state.user = user;
    state.activeAccountId = user.id;
    if (accounts) {
      state.accounts = accounts;
    }
    // Store token in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      if (accounts) {
        localStorage.setItem('auth_accounts', JSON.stringify(accounts));
      }
    }
  });

  const logout = $(() => {
    state.token = null;
    state.user = null;
    state.accounts = [];
    state.activeAccountId = null;
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_accounts');
    }
  });

  const switchAccount = $((accountId: number) => {
    const account = state.accounts.find((acc) => acc.id === accountId);
    if (!account) {
      console.error('Account not found:', accountId);
      return;
    }
    state.user = {
      id: account.id,
      name: account.name,
      email: account.email,
      permissions: account.permissions,
    };
    state.token = account.token;
    state.activeAccountId = account.id;

    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', account.token);
      localStorage.setItem('auth_user', JSON.stringify(state.user));
    }
  });

  const hasPermission = $((permission: string) => {
    const perms = state.user?.permissions ?? [];
    return perms.some(
      (p) =>
        p === "*" ||
        p === permission ||
        (p.endsWith(":*") && permission.startsWith(p.slice(0, -1))),
    );
  });

  return {
    state,
    isAuthenticated,
    permissions,
    login,
    logout,
    switchAccount,
    hasPermission,
  };
};
