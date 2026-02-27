import ZeroDecimalError from "./error-factory.js";
import { VALID_CURRENCIES, type CurrencyCode } from "./currencies.js";

export type { CurrencyCode };

export const ZERO_DECIMAL_CURRENCIES: string[] = [
  "BIF",
  "CLP",
  "DJF",
  "GNF",
  "JPY",
  "KMF",
  "KRW",
  "MGA",
  "PYG",
  "RWF",
  "UGX",
  "VND",
  "VUV",
  "XAF",
  "XOF",
  "XPF",
];
export const THREE_DECIMAL_CURRENCIES: string[] = [
  "BHD",
  "IQD",
  "JOD",
  "KWD",
  "LYD",
  "OMR",
  "TND",
];

function toFixedNoRound(num: number, fixed: number): number {
  const factor = Math.pow(10, fixed);
  // eliminate binary float truncation errors by rounding to a high precision first
  const cleanVal = Math.round(num * factor * 10000) / 10000;
  const result = Math.trunc(cleanVal) / factor;
  return isNaN(result) ? 0 : result;
}

function toFixedRound(num: number, fixed: number, precision: number): string {
  const big = num * Math.pow(10, precision);
  const bigNoRound = toFixedNoRound(big, fixed);
  const noRound = toFixedNoRound(num, fixed);

  const digits = bigNoRound.toString().length - noRound.toString().length;
  const shouldRoundUp = bigNoRound % noRound >= Math.pow(10, digits) / 2;

  const result = noRound + (shouldRoundUp ? 1 : 0);
  return result.toString();
}

export function getCurrencyInfo(currencyCode: string): { decimals: number } {
  const code = currencyCode.toUpperCase();
  if (ZERO_DECIMAL_CURRENCIES.includes(code)) return { decimals: 0 };
  if (THREE_DECIMAL_CURRENCIES.includes(code)) return { decimals: 3 };
  return { decimals: 2 };
}

export function isValidCurrency(currencyCode: string): boolean {
  return VALID_CURRENCIES.includes(currencyCode.toUpperCase() as CurrencyCode);
}

export function toStripeUnit(amount: number | string, currency: string): string {
  return exec(amount, currency, false, false);
}

export function fromSmallestUnit(amount: number | string, currency: string): number {
  const amountNum = parseFloat(amount.toString());
  if (isNaN(amountNum)) {
    throw new ZeroDecimalError("The amount cannot be parsed to Float");
  }
  
  const { decimals } = getCurrencyInfo(currency);
  
  // For three-decimal currencies, Stripe's convention (and this lib's default) 
  // appends a zero (effectively multiplying by 1000 vs 100 for some others, 
  // but to reverse Stripe-compatible three-decimal amounts, we divide by 1000).
  if (decimals === 3) {
     return amountNum / 1000;
  }
  
  return amountNum / Math.pow(10, decimals);
}

export function display(
  amount: number | string,
  currency: string,
  options?: { locale?: string }
): string {
  try {
    const amountNum = parseFloat(amount.toString());

    if (isNaN(amountNum)) {
      throw new ZeroDecimalError("The amount cannot be parsed to Float");
    }

    let value: number;
    let decimals: number;
    const code = currency.toUpperCase();

    if (ZERO_DECIMAL_CURRENCIES.includes(code)) {
      value = amountNum;
      decimals = 0;
    } else if (THREE_DECIMAL_CURRENCIES.includes(code)) {
      value = amountNum / 1000;
      decimals = 3;
    } else {
      value = amountNum / 100;
      decimals = 2;
    }

    if (options?.locale) {
      return new Intl.NumberFormat(options.locale, {
        style: 'currency',
        currency: code,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
    }

    return value.toFixed(decimals);
  } catch (error) {
    console.error(error);
    throw new ZeroDecimalError("Error displaying amount");
  }
}

export default function exec(
  amount: number | string,
  currency: string,
  displayMode: boolean = false,
  noRound: boolean = false
): string {
  try {
    const amountNum = parseFloat(amount.toString());

    if (isNaN(amountNum)) {
      throw new ZeroDecimalError("The amount cannot be parsed to Float");
    }

    const code = currency.toString().toUpperCase();

    if (ZERO_DECIMAL_CURRENCIES.includes(code)) {
      // Exclude all decimals
      return noRound
        ? toFixedNoRound(amountNum, 0).toString()
        : toFixedRound(amountNum, 0, 2);
    } else if (THREE_DECIMAL_CURRENCIES.includes(code)) {
      if (noRound) {
        return displayMode
          ? toFixedNoRound(amountNum, 3).toString()
          : toFixedNoRound(amountNum, 3)
              .toString()
              .replace(".", "")
              .replace(/.$/, "0");
      } else {
        if (amountNum < 0.001) {
          return displayMode ? "0.000" : "0";
        }

        const amountFixed = displayMode ? amountNum.toFixed(3) : amountNum.toFixed(2);

        return displayMode
          ? amountFixed
          : amountFixed.toString().replace(".", "") + "0";
      }
    } else {
      if (noRound) {
        return displayMode
          ? toFixedNoRound(amountNum, 2).toString()
          : toFixedNoRound(amountNum, 2).toString().replace(".", "");
      } else {
        return amountNum < 0.01
          ? displayMode
            ? "0.00"
            : "0"
          : displayMode
          ? amountNum.toFixed(2)
          : amountNum.toFixed(2).toString().replace(".", "");
      }
    }
  } catch (error) {
    console.error(error);
    throw new ZeroDecimalError("Error processing amount");
  }
}
