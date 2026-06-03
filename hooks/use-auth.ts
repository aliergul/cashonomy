"use client";

import { useAuthStore } from "@/components/shared/auth-provider";

/** The currently authenticated user, or `null` when signed out. */
export const useUser = () => useAuthStore((s) => s.user);

/** The active Supabase session, or `null` when signed out. */
export const useSession = () => useAuthStore((s) => s.session);

/** Convenience flag for gating UI on authentication state. */
export const useIsAuthenticated = () => useAuthStore((s) => s.user !== null);
