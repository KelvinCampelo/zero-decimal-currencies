import ZeroDecimalError from "./error-factory.js";

const ZERO_DECIMAL_CURRENCIES: string[] = [
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
const THREE_DECIMAL_CURRENCIES: string[] = [
  "BHD",
  "IQD",
  "JOD",
  "KWD",
  "LYD",
  "OMR",
  "TND",
];

function toFixedNoRound(num: number, fixed: number): number {
  const factor: number = Math.pow(10, fixed);
  const result = Math.trunc(num * factor) / factor; // Truncate to desired decimal places
  return isNaN(result) ? 0 : result; // Handle cases where num is NaN or Infinity
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

function display(amount: number | string, currency: string): string {
  try {
    const amountNum = parseFloat(amount.toString());

    if (isNaN(amountNum)) {
      throw new ZeroDecimalError("The amount cannot be parsed to Float");
    }

    if (ZERO_DECIMAL_CURRENCIES.includes(currency.toUpperCase())) {
      return amountNum.toFixed(0);
    } else if (
      THREE_DECIMAL_CURRENCIES.includes(currency.toString().toUpperCase())
    ) {
      return (amountNum / 1000).toFixed(3);
    } else {
      return (amountNum / 100).toFixed(2);
    }
  } catch (error) {
    console.error(error);
    throw new ZeroDecimalError("Error displaying amount");
  }
}

function exec(
  amount: number | string,
  currency: string,
  display: boolean = false,
  noRound: boolean = false
): string {
  try {
    const amountNum = parseFloat(amount.toString());

    if (isNaN(amountNum)) {
      throw new ZeroDecimalError("The amount cannot be parsed to Float");
    }

    if (ZERO_DECIMAL_CURRENCIES.includes(currency.toString().toUpperCase())) {
      // Exclude all decimals
      return noRound
        ? toFixedNoRound(amountNum, 0).toString()
        : toFixedRound(amountNum, 0, 2);
    } else if (
      THREE_DECIMAL_CURRENCIES.includes(currency.toString().toUpperCase())
    ) {
      if (noRound) {
        return display
          ? toFixedNoRound(amountNum, 3).toString()
          : toFixedNoRound(amountNum, 3)
              .toString()
              .replace(".", "")
              .replace(/.$/, "0");
      } else {
        if (amountNum < 0.001) {
          return display ? "0.000" : "0";
        }

        const amountFixed = display ? amountNum.toFixed(3) : amountNum.toFixed(2);

        return display
          ? amountFixed
          : amountFixed.toString().replace(".", "") + "0";
      }
    } else {
      if (noRound) {
        return display
          ? toFixedNoRound(amountNum, 2).toString()
          : toFixedNoRound(amountNum, 2).toString().replace(".", "");
      } else {
        return amountNum < 0.01
          ? display
            ? "0.00"
            : "0"
          : display
          ? amountNum.toFixed(2)
          : amountNum.toFixed(2).toString().replace(".", "");
      }
    }
  } catch (error) {
    console.error(error);
    throw new ZeroDecimalError("Error processing amount");
  }
}

export { display };
export default exec;
