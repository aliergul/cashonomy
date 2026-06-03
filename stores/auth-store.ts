import type { Session, User } from "@supabase/supabase-js";
import { createStore } from "zustand/vanilla";

export type AuthState = {
  user: User | null;
  session: Session | null;
};

export type AuthActions = {
  /**
   * Replaces the current auth snapshot. `user` is always derived from the
   * session so the two can never drift apart. Called on every Supabase
   * `onAuthStateChange` event (sign-in, sign-out, token refresh).
   */
  setSession: (session: Session | null) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultAuthState: AuthState = {
  user: null,
  session: null,
};

/**
 * Per-request store factory. A fresh store is created for every
 * {@link AuthProvider} instance so server-rendered requests never share
 * client state (Zustand + App Router pattern).
 */
export function createAuthStore(initState: AuthState = defaultAuthState) {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setSession: (session) => set({ session, user: session?.user ?? null }),
  }));
}

export type AuthStoreApi = ReturnType<typeof createAuthStore>;
