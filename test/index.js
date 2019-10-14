import test from 'ava';
import 'babel-core/register';

import zeroDecimalCurrencies from '../src/lib/';

test('zeroDecimalCurrencies', (t) => {
  t.is(zeroDecimalCurrencies(), true);
});
