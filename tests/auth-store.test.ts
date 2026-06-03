import type { Session, User } from "@supabase/supabase-js";
import { beforeEach, describe, expect, it } from "vitest";

import {
  type AuthStoreApi,
  createAuthStore,
  defaultAuthState,
} from "@/stores/auth-store";

const user = { id: "user-1", email: "a@b.com" } as User;
const session = { access_token: "tok", user } as Session;

describe("createAuthStore", () => {
  let store: AuthStoreApi;

  beforeEach(() => {
    store = createAuthStore();
  });

  it("starts signed out by default", () => {
    expect(store.getState()).toMatchObject(defaultAuthState);
  });

  it("seeds initial state (server-validated user, no session yet)", () => {
    const seeded = createAuthStore({ user, session: null });
    expect(seeded.getState().user).toEqual(user);
    expect(seeded.getState().session).toBeNull();
  });

  it("derives user from session on setSession", () => {
    store.getState().setSession(session);
    expect(store.getState().session).toEqual(session);
    expect(store.getState().user).toEqual(user);
  });

  it("clears user and session on sign-out", () => {
    store.getState().setSession(session);
    store.getState().setSession(null);
    expect(store.getState().session).toBeNull();
    expect(store.getState().user).toBeNull();
  });

  it("isolates state between store instances", () => {
    const other = createAuthStore();
    store.getState().setSession(session);
    expect(other.getState().user).toBeNull();
  });
});
