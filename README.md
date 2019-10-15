<big><h1 align="center">zero-decimal-currencies</h1></big>

<p align="center">
  <a href="https://npmjs.org/package/zero-decimal-currencies">
    <img src="https://img.shields.io/npm/v/zero-decimal-currencies.svg" alt="NPM Version">
  </a>

  <a href="http://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/npm/l/zero-decimal-currencies.svg" alt="License">
  </a>

  <a href="https://github.com/KelvinCampelo/zero-decimal-currencies/issues">
    <img src="https://img.shields.io/github/issues/KelvinCampelo/zero-decimal-currencies.svg" alt="Github Issues">
  </a>

  <a href="https://travis-ci.org/KelvinCampelo/zero-decimal-currencies">
    <img src="https://img.shields.io/travis/KelvinCampelo/zero-decimal-currencies.svg" alt="Travis Status">
  </a>

  <a href="https://coveralls.io/github/KelvinCampelo/zero-decimal-currencies">
    <img src="https://img.shields.io/coveralls/KelvinCampelo/zero-decimal-currencies.svg" alt="Coveralls">
  </a>

  <a href="http://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen Friendly">
  </a>
  
</p>

<p align="center"><big>
Get the smallest currency unit even to a Zero Decimal Currency
</big></p>

## Features

Get the smallest currency unit even to a Zero Decimal Currency

This lib with convert the amount in the smallest currency unit (e.g., 100 cents to charge €1.00 or 100 to charge ¥100, a zero-decimal currency).

## Install

```sh
npm install zero-decimal-currencies
```

## Usage

```javascript
const smallestUnit = require('zero-decimal-currencies');
//or import smallUnit from 'zero-decimal-currencies';

let amount = smallestUnit(100.01, 'JPY'); //you dont want to display ¥100.01 to your customer, nether charge 100 times the correct amount
console.log(amount); //'100'

let amount2 = smallestUnit(100.01, 'JPY', true); //even display set to true, will be nice to zero-decimal currencies
console.log(amount2); //'100'

let amount3 = smallestUnit(100.51, 'JPY'); //by default will round up with zero-decimal currencies
console.log(amount3); //'101'

let amount4 = smallestUnit(100.01, 'EUR'); //non zero-decimal currency, not useful to display, but useful to charge in Stripe
console.log(amount4); //'10001'

let amount5 = smallestUnit(100.01, 'EUR', true); //non zero-decimal currency, useful to display, but not useful to charge in Stripe
console.log(amount5); //'100.01'

let amount6 = smallestUnit(15.7784514, 'EUR'); //round is default, using toFixed rules
console.log(amount6); //'1578'

let amount7 = smallestUnit(15.7784514, 'EUR', false, true); //the last parameter is a noRound option, that always get the 2 first decimals even a big decimal (that js put in cientific notation)
console.log(amount7); //'1577'
```

## Author

Kelvin Campelo kelvsousa@gmail.com https://github.com/KelvinCampelo

## License

- **MIT** : http://opensource.org/licenses/MIT

## Contributing

Contributions are highly welcome! This repo is commitizen friendly — please read about it [here](http://commitizen.github.io/cz-cli/).
