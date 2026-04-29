import Decimal from "decimal.js";

Decimal.set({ rounding: Decimal.ROUND_HALF_EVEN });

export const MONEY_DP = 2;

export type MoneyInput = string | number | Decimal;

export function toMoney(value: MoneyInput): Decimal {
  if (value === null || value === undefined) {
    throw new TypeError("toMoney: value is null or undefined");
  }
  if (value instanceof Decimal) {
    if (!value.isFinite()) {
      throw new TypeError("toMoney: value is not finite");
    }
    return value;
  }
  if (typeof value === "number" && !Number.isFinite(value)) {
    throw new TypeError("toMoney: value is not finite");
  }
  const d = new Decimal(value);
  if (!d.isFinite()) {
    throw new TypeError("toMoney: value is not finite");
  }
  return d;
}

export function addMoney(...values: MoneyInput[]): Decimal {
  return values.reduce<Decimal>((acc, v) => acc.plus(toMoney(v)), new Decimal(0));
}

export function subMoney(a: MoneyInput, b: MoneyInput): Decimal {
  return toMoney(a).minus(toMoney(b));
}

export function mulMoney(a: MoneyInput, b: MoneyInput): Decimal {
  return toMoney(a).times(toMoney(b));
}

export function divMoney(a: MoneyInput, b: MoneyInput): Decimal {
  return toMoney(a).dividedBy(toMoney(b));
}

export function roundMoney(value: MoneyInput): Decimal {
  return toMoney(value).toDecimalPlaces(MONEY_DP, Decimal.ROUND_HALF_EVEN);
}

export function formatMoney(
  value: MoneyInput,
  currency: string,
  locale: "tr" | "en" = "tr",
): string {
  const rounded = roundMoney(value);
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: MONEY_DP,
    maximumFractionDigits: MONEY_DP,
  });
  return formatter.format(Number(rounded.toFixed(MONEY_DP)));
}
