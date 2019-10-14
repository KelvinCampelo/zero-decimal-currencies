import ZeroDecimalError from './error-factory';

const ZERO_DECIMAL_CURRENCIES = [
  'BIF',
  'CLP',
  'DJF',
  'GNF',
  'JPY',
  'KMF',
  'KRW',
  'MGA',
  'PYG',
  'RWF',
  'UGX',
  'VND',
  'VUV',
  'XAF',
  'XOF',
  'XPF',
];

function toFixedNoRound(num, fixed) {
  var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

function toFixedRound(num, fixed, precision) {
  var big = num * (10 ** precision);
  var bigNoRound = Number(toFixedNoRound(big, fixed).toString());
  var noRound = Number(toFixedNoRound(num, fixed).toString());
  return noRound + (bigNoRound % noRound >= (10 ** (Math.log(bigNoRound % noRound) * Math.LOG10E + 1 | 0))/2);
}

export default function(amount, currency, display, noRound) {
  try {
    if (!amount) {
      throw new ZeroDecimalError(`The amount value is required`);
    }
    if (!currency) {
      throw new ZeroDecimalError(`The currency value is required`);
    }
    //test if number can be converted to float
    if (!isNaN(amount) && amount) {
      amount = parseFloat(amount.toString());
    } else {
      throw new ZeroDecimalError(`The amount cannot be parsed to Float`);
    }

    //test if amount is number
    if (!!!(Number(amount) === amount)) {
      throw new ZeroDecimalError(`The amount cannot be parsed to Float`);
    }

    if (ZERO_DECIMAL_CURRENCIES.includes(currency.toString().toUpperCase())) {
      //exclude all decimals
      return toFixedRound(amount, 0, 2);
    } else {
      if (noRound) {
        return display
          ? toFixedRound(amount, 2, 2).toString()
          : toFixedRound(amount, 2, 2)
              .toString()
              .replace('.', '');
      } else {
        let amountFixed = amount;
        if (amount < 0.01) {
          return display ? '0.00' : '0';
        }

        amountFixed = amount.toFixed(2);

        return display ? amountFixed : amountFixed.toString().replace('.', '');
      }
    }
  } catch (error) {
    console.log(error);
    throw new ZeroDecimalError();
  }
}
