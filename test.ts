import test from "ava";
import zeroDecimalCurrencies, { display } from "./src/index";

test("Real case", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(175459.09, "JPY");

  t.is(zeroDecimal, "175459");
  t.pass();
});

test("Test with zero decimal currency", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(1003.01, "JPY");

  t.is(zeroDecimal, "1003");
  t.pass();
});

test("Test with zero decimal currency 2", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(99, "JPY");

  t.is(zeroDecimal, "99");
  t.pass();
});

test("Test with zero decimal currency 3", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(100.0000000052, "JPY");

  t.is(zeroDecimal, "100");
  t.pass();
});

test("Test with zero decimal currency and display option", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(100.0000000052, "JPY", true);

  t.is(zeroDecimal, "100");
  t.pass();
});

test("Test with zero decimal currency and no rounding up", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(100.5100000052, "JPY", false, true);

  t.is(zeroDecimal, "100");
  t.pass();
});

test("Test with zero decimal currency and  rounding up", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(100.5100000052, "JPY", false);

  t.is(zeroDecimal, "101");
  t.pass();
});

test("Test with zero decimal currency and display option rounding up", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(100.5100000052, "JPY", true);

  t.is(zeroDecimal, "101");
  t.pass();
});

test("Test with no zero decimal currency", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(1003.01, "EUR");

  t.is(zeroDecimal, "100301");
  t.pass();
});

test("Test with no zero decimal currency no round", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(15.7784514, "EUR", false, true);

  t.is(zeroDecimal, "1577");
  t.pass();
});

test("Test with no zero decimal currency no round and display to customer", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(15.7784514, "EUR", true, true);

  t.is(zeroDecimal, "15.77");
  t.pass();
});

test("Test with no zero decimal currency with round", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(15.7784514, "EUR");

  t.is(zeroDecimal, "1578");
  t.pass();
});

test("Test with no zero decimal currency with roundand display to customer", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(15.7784514, "EUR", true);

  t.is(zeroDecimal, "15.78");
  t.pass();
});

test("Test with no zero decimal currency cientific notation long number no round", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(0.0000000052, "EUR");

  t.is(zeroDecimal, "0");
  t.pass();
});

test("Test with no zero decimal currency cientific notation long number no round and display to customer", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(0.0000000052, "EUR", true);

  t.is(zeroDecimal, "0.00");
  t.pass();
});

test("Test with no zero decimal currency cientific notation long number no round 2", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(1.0000000052, "EUR");

  t.is(zeroDecimal, "100");
  t.pass();
});

test("Test with no zero decimal currency cientific notation long number no round 3", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(14.1000000052, "EUR");

  t.is(zeroDecimal, "1410");
  t.pass();
});

test("Test display with no zero decimal currency", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(14.1000000052, "EUR");
  const disp = display(zeroDecimal, "EUR");
  t.is(disp, "14.10");
  t.pass();
});

test("Test display with zero decimal currency", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(100.5100000052, "JPY");
  const disp = display(zeroDecimal, "JPY");
  t.is(disp, "101");
  t.pass();
});

//for stripe, the least significant number needs to be zero for
//compatibilities
test("Test with three decimal currency", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(1003.01, "IQD");

  t.is(zeroDecimal, "1003010");
  t.pass();
});

test("Test with three decimal currency no round", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(15.7784514, "IQD", false, true);

  t.is(zeroDecimal, "15770");
  t.pass();
});

test("Test with three decimal currency no round and display to customer", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(15.7784514, "IQD", true, true);

  t.is(zeroDecimal, "15.778");
  t.pass();
});

test("Test with three decimal currency with round", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(15.7784514, "IQD");

  t.is(zeroDecimal, "15780");
  t.pass();
});

test("Test with three decimal currency with roundand display to customer", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(15.7784514, "IQD", true);

  t.is(zeroDecimal, "15.778");
  t.pass();
});

test("Test with three decimal currency cientific notation long number no round", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(0.0000000052, "IQD");

  t.is(zeroDecimal, "0");
  t.pass();
});

test("Test with three decimal currency cientific notation long number no round and display to customer", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(0.0000000052, "IQD", true);

  t.is(zeroDecimal, "0.000");
  t.pass();
});

test("Test with three decimal currency cientific notation long number no round 2", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(1.0000000052, "IQD");

  t.is(zeroDecimal, "1000");
  t.pass();
});

test("Test with three decimal currency cientific notation long number no round 3", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(14.1000000052, "IQD");

  t.is(zeroDecimal, "14100");
  t.pass();
});

test("Test display with three decimal currency", (t) => {
  const zeroDecimal = zeroDecimalCurrencies(14.1000000052, "IQD");
  const disp = display(zeroDecimal, "IQD");
  t.is(disp, "14.100");
  t.pass();
});
