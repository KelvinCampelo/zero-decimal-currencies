import test from 'ava';
import 'babel-core/register';

import zeroDecimalCurrencies from '../src/lib/';

test('Test with zero decimal currency', t => {
  var zeroDecimal = zeroDecimalCurrencies(1003.01, 'JPY');

  t.is(zeroDecimal, '1003');
  t.pass();
});

test('Test with zero decimal currency 2', t => {
  var zeroDecimal = zeroDecimalCurrencies(99, 'JPY');

  t.is(zeroDecimal, '99');
  t.pass();
});

test('Test with zero decimal currency 3', t => {
  var zeroDecimal = zeroDecimalCurrencies(100.0000000052, 'JPY');

  t.is(zeroDecimal, '100');
  t.pass();
});

test('Test with zero decimal currency and display option', t => {
  var zeroDecimal = zeroDecimalCurrencies(100.0000000052, 'JPY', true);

  t.is(zeroDecimal, '100');
  t.pass();
});

test('Test with zero decimal currency and no rounding up', t => {
  var zeroDecimal = zeroDecimalCurrencies(100.5100000052, 'JPY', false, true);

  t.is(zeroDecimal, '100');
  t.pass();
});

test('Test with zero decimal currency and  rounding up', t => {
  var zeroDecimal = zeroDecimalCurrencies(100.5100000052, 'JPY', false);

  t.is(zeroDecimal, '101');
  t.pass();
});

test('Test with zero decimal currency and display option rounding up', t => {
  var zeroDecimal = zeroDecimalCurrencies(100.5100000052, 'JPY', true);

  t.is(zeroDecimal, '101');
  t.pass();
});

test('Test with no zero decimal currency', t => {
  var zeroDecimal = zeroDecimalCurrencies(1003.01, 'EUR');

  t.is(zeroDecimal, '100301');
  t.pass();
});

test('Test with no zero decimal currency no round', t => {
  var zeroDecimal = zeroDecimalCurrencies(15.7784514, 'EUR', false, true);

  t.is(zeroDecimal, '1577');
  t.pass();
});

test('Test with no zero decimal currency no round and display to customer', t => {
  var zeroDecimal = zeroDecimalCurrencies(15.7784514, 'EUR', true, true);

  t.is(zeroDecimal, '15.77');
  t.pass();
});

test('Test with no zero decimal currency with round', t => {
  var zeroDecimal = zeroDecimalCurrencies(15.7784514, 'EUR');

  t.is(zeroDecimal, '1578');
  t.pass();
});

test('Test with no zero decimal currency with roundand display to customer', t => {
  var zeroDecimal = zeroDecimalCurrencies(15.7784514, 'EUR', true);

  t.is(zeroDecimal, '15.78');
  t.pass();
});

test('Test with no zero decimal currency cientific notation long number no round', t => {
  var zeroDecimal = zeroDecimalCurrencies(0.0000000052, 'EUR');

  t.is(zeroDecimal, '0');
  t.pass();
});

test('Test with no zero decimal currency cientific notation long number no round and display to customer', t => {
  var zeroDecimal = zeroDecimalCurrencies(0.0000000052, 'EUR', true);

  t.is(zeroDecimal, '0.00');
  t.pass();
});

test('Test with no zero decimal currency cientific notation long number no round 2', t => {
  var zeroDecimal = zeroDecimalCurrencies(1.0000000052, 'EUR');

  t.is(zeroDecimal, '100');
  t.pass();
});

test('Test with no zero decimal currency cientific notation long number no round 3', t => {
  var zeroDecimal = zeroDecimalCurrencies(14.1000000052, 'EUR');

  t.is(zeroDecimal, '1410');
  t.pass();
});
