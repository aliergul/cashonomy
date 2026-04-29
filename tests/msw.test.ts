import { describe, expect, it } from "vitest";

describe("msw integration", () => {
  it("intercepts fetch via configured handlers", async () => {
    const res = await fetch("https://example.test/ping");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});
