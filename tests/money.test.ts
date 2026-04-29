import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import {
  addMoney,
  divMoney,
  formatMoney,
  mulMoney,
  roundMoney,
  subMoney,
  toMoney,
} from "@/lib/money";

describe("toMoney", () => {
  it("accepts string, number, and Decimal inputs", () => {
    expect(toMoney("12.34").toString()).toBe("12.34");
    expect(toMoney(12.34).toString()).toBe("12.34");
    expect(toMoney(new Decimal("12.34")).toString()).toBe("12.34");
  });

  it("throws on non-finite or nullish values", () => {
    expect(() => toMoney(NaN)).toThrow(TypeError);
    expect(() => toMoney(Infinity)).toThrow(TypeError);
    expect(() => toMoney(undefined as unknown as number)).toThrow(TypeError);
    expect(() => toMoney(null as unknown as number)).toThrow(TypeError);
  });
});

describe("roundMoney (half-to-even)", () => {
  it("rounds to even on .x5 boundary", () => {
    expect(roundMoney("0.125").toString()).toBe("0.12");
    expect(roundMoney("0.135").toString()).toBe("0.14");
    expect(roundMoney("2.345").toString()).toBe("2.34");
    expect(roundMoney("2.355").toString()).toBe("2.36");
  });

  it("rounds normally below/above the boundary", () => {
    expect(roundMoney("0.124").toString()).toBe("0.12");
    expect(roundMoney("0.126").toString()).toBe("0.13");
  });

  it("returns 2 decimal places for whole numbers when formatted", () => {
    expect(roundMoney(10).toFixed(2)).toBe("10.00");
  });
});

describe("addMoney / subMoney / mulMoney / divMoney", () => {
  it("avoids floating-point trap on 0.1 + 0.2", () => {
    expect(addMoney(0.1, 0.2).toString()).toBe("0.3");
  });

  it("sums variadic inputs", () => {
    expect(addMoney("1.10", "2.20", "3.30").toString()).toBe("6.6");
  });

  it("subtracts, multiplies, divides exactly", () => {
    expect(subMoney("1.30", "0.10").toString()).toBe("1.2");
    expect(mulMoney("1.05", 3).toString()).toBe("3.15");
    expect(divMoney("10.00", 4).toString()).toBe("2.5");
  });
});

describe("formatMoney", () => {
  it("formats Turkish lira in tr locale", () => {
    const out = formatMoney(1234.5, "TRY", "tr");
    expect(out).toContain("1.234,50");
    expect(out).toContain("₺");
  });

  it("formats USD in en locale", () => {
    expect(formatMoney(1234.5, "USD", "en")).toBe("$1,234.50");
  });

  it("rounds via half-to-even before formatting", () => {
    expect(formatMoney("2.345", "USD", "en")).toBe("$2.34");
    expect(formatMoney("2.355", "USD", "en")).toBe("$2.36");
  });
});
