"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.display = display;
var _errorFactory = _interopRequireDefault(require("./error-factory.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ZERO_DECIMAL_CURRENCIES = ["BIF", "CLP", "DJF", "GNF", "JPY", "KMF", "KRW", "MGA", "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF", "XPF"];
function toFixedNoRound(num, fixed) {
  var factor = Math.pow(10, fixed);
  var result = Math.trunc(num * factor) / factor; // Truncate to desired decimal places
  return isNaN(result) ? 0 : result; // Handle cases where num is NaN or Infinity
}
function toFixedRound(num, fixed, precision) {
  var big = num * Math.pow(10, precision);
  var bigNoRound = toFixedNoRound(big, fixed);
  var noRound = toFixedNoRound(num, fixed);
  var digits = bigNoRound.toString().length - noRound.toString().length;
  var shouldRoundUp = bigNoRound % noRound >= Math.pow(10, digits) / 2;
  var result = noRound + (shouldRoundUp ? 1 : 0);
  return result.toString();
}
function display(amount, currency) {
  try {
    var amountNum = parseFloat(amount.toString());
    if (isNaN(amountNum)) {
      throw new _errorFactory["default"]("The amount cannot be parsed to Float");
    }
    return ZERO_DECIMAL_CURRENCIES.includes(currency.toUpperCase()) ? amountNum.toFixed(0) : (amountNum / 100).toFixed(2);
  } catch (error) {
    console.error(error);
    throw new _errorFactory["default"]("Error displaying amount");
  }
}
function exec(amount, currency) {
  var display = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var noRound = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  try {
    var amountNum = parseFloat(amount.toString());
    if (isNaN(amountNum)) {
      throw new _errorFactory["default"]("The amount cannot be parsed to Float");
    }
    if (ZERO_DECIMAL_CURRENCIES.includes(currency.toString().toUpperCase())) {
      // Exclude all decimals
      return noRound ? toFixedNoRound(amountNum, 0).toString() : toFixedRound(amountNum, 0, 2);
    } else {
      if (noRound) {
        return display ? toFixedNoRound(amountNum, 2).toString() : toFixedNoRound(amountNum, 2).toString().replace(".", "");
      } else {
        return amountNum < 0.01 ? display ? "0.00" : "0" : display ? amountNum.toFixed(2) : amountNum.toFixed(2).toString().replace(".", "");
      }
    }
  } catch (error) {
    console.error(error);
    throw new _errorFactory["default"]("Error processing amount");
  }
}
var _default = exports["default"] = exec;