<div align="center">
  <big><h1>Zero Decimal Currencies</h1></big>

  <p>
    <strong>The essential utility to handle currency conversions for Stripe and other payment providers.</strong>
  </p>

  <p>
    <a href="https://npmjs.org/package/zero-decimal-currencies">
      <img src="https://img.shields.io/npm/v/zero-decimal-currencies.svg?style=flat-square" alt="NPM Version">
    </a>
    <a href="https://npmjs.org/package/zero-decimal-currencies">
      <img src="https://img.shields.io/npm/dm/zero-decimal-currencies.svg?style=flat-square" alt="NPM Downloads">
    </a>
    <a href="http://opensource.org/licenses/MIT">
      <img src="https://img.shields.io/npm/l/zero-decimal-currencies.svg?style=flat-square" alt="License">
    </a>
    <a href="https://github.com/KelvinCampelo/zero-decimal-currencies/actions/workflows/coveralls.yml">
      <img src="https://img.shields.io/github/actions/workflow/status/KelvinCampelo/zero-decimal-currencies/coveralls.yml?style=flat-square" alt="Build Status">
    </a>
    <a href="https://coveralls.io/github/KelvinCampelo/zero-decimal-currencies">
      <img src="https://img.shields.io/coveralls/KelvinCampelo/zero-decimal-currencies.svg?style=flat-square" alt="Coverage">
    </a>
    <a href="http://commitizen.github.io/cz-cli/">
      <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square" alt="Commitizen Friendly">
    </a>
  </p>
</div>

---

## 🚀 Overview

`zero-decimal-currencies` is a lightweight, zero-dependency TypeScript library that solves a common headache in Fintech: **accurately converting currency amounts to their smallest units.**

Whether you are charging **$10.00 (1000 cents)** or **¥1000 (1000 JPY)**, this library ensures your payment payloads are formatted correctly for providers like **Stripe**, **Adyen**, or **PayPal**, preventing rounding errors and accidental overcharges.

### ✨ Key Features

- ✅ **Full Support for Zero-Decimal Currencies**: Automatically handles JPY, KRW, CLP, and more.
- ✅ **Three-Decimal Currency Logic**: Specialized handling for BHD, KWD, OMR, etc.
- ✅ **Stripe Ready**: Perfect for generating `amount` fields for Stripe PaymentIntents.
- ✅ **Precision Controls**: Built-in support for rounding vs. truncation (`noRound`).
- ✅ **Dual-Purpose**: Switch between **charge format** (smallest units) and **display format** (human-readable).
- ✅ **Modern & Type-Safe**: Written in TypeScript with ESM and CommonJS support.

---

## 📦 Installation

```sh
npm install zero-decimal-currencies
# or
pnpm add zero-decimal-currencies
# or
yarn add zero-decimal-currencies
```

---

## 🛠 Usage

### Basic Conversion (Default behavior)

By default, the library converts a human-readable amount into the **smallest unit** (integer string) expected by payment gateways.

```typescript
import smallestUnit from 'zero-decimal-currencies';

// 💵 Standard Currencies (2 decimals)
smallestUnit(10.50, 'USD'); // "1050"

// 💴 Zero-Decimal Currencies (0 decimals)
smallestUnit(100.51, 'JPY'); // "101" (rounded)

// 🇰🇼 Three-Decimal Currencies (3 decimals)
smallestUnit(15.778, 'KWD'); // "15780" (Stripe format)
```

### Advanced Options

```typescript
// display: true -> returns formatted string for UI
smallestUnit(100.01, 'EUR', true); // "100.01"

// noRound: true -> truncates instead of rounding
smallestUnit(15.7784, 'EUR', false, true); // "1577"
```

### API Reference

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `amount` | `number \| string` | Yes | The amount to convert. |
| `currency` | `string` | Yes | ISO 4217 currency code (e.g., `USD`, `JPY`). |
| `display` | `boolean` | No | If `true`, returns a formatted string for UI (e.g., `10.00`). Default: `false`. |
| `noRound` | `boolean` | No | If `true`, truncates decimals instead of rounding. Default: `false`. |

---

## 🌍 Supported Currencies

The library maintains internal lists for:
- **Zero-Decimal**: BIF, CLP, DJF, GNF, JPY, KMF, KRW, MGA, PYG, RWF, UGX, VND, VUV, XAF, XOF, XPF.
- **Three-Decimal**: BHD, IQD, JOD, KWD, LYD, OMR, TND.

---

## 🛠 Development

This repository uses **TypeScript** and **pnpm**.

```bash
pnpm install
pnpm run build     # Outputs ESM, CJS, and IIFE to /dist
pnpm test          # Runs Ava test suite
pnpm run validate  # Lint + Test
```

---

## 🤝 Contributors

Contributions are welcome! This repo is **Commitizen friendly**. Please follow the [Conventional Commits](https://www.conventionalcommits.org/) standard.

<table>
  <tr>
    <td align="center"><a href="https://github.com/KelvinCampelo"><img src="https://avatars.githubusercontent.com/u/7349839?s=100&v=4" width="100px;" alt="Kelvin Campelo"/><br /><sub><b>Kelvin Campelo</b></sub></a></td>
    <td align="center"><a href="https://github.com/MagdielCAS"><img src="https://avatars.githubusercontent.com/u/7864626?s=100&v=4" width="100px;" alt="Magdiel Campelo"/><br /><sub><b>Magdiel Campelo</b></sub></a></td>
  </tr>
</table>

---

## 📄 License

[MIT](http://opensource.org/licenses/MIT) © Kelvin Campelo
