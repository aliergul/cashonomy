"use client";

import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "zustand";

import { createClient } from "@/lib/supabase/client";
import {
  type AuthStore,
  type AuthStoreApi,
  createAuthStore,
} from "@/stores/auth-store";

const AuthStoreContext = createContext<AuthStoreApi | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
  /** Server-validated user used to seed the store before hydration. */
  initialUser: User | null;
};

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  // Lazy initializer runs once per provider instance, so each request gets its
  // own store without sharing client state across server-rendered requests.
  const [store] = useState<AuthStoreApi>(() =>
    createAuthStore({ user: initialUser, session: null }),
  );

  useEffect(() => {
    const supabase = createClient();
    // Fires `INITIAL_SESSION` immediately, then on every auth change, keeping
    // the store in sync across sign-in/out and token refresh (incl. other tabs).
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      store.getState().setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [store]);

  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  );
}

export function useAuthStore<T>(selector: (store: AuthStore) => T): T {
  const store = useContext(AuthStoreContext);
  if (!store) {
    throw new Error("useAuthStore must be used within an <AuthProvider>");
  }
  return useStore(store, selector);
}
