# zero-decimal-currencies

This project is a TypeScript/JavaScript library designed to convert currency amounts into their smallest units, specifically handling zero-decimal currencies (like JPY) and three-decimal currencies (like KWD) to ensure compatibility with payment providers like Stripe.

## Project Overview

- **Purpose**: Get the smallest currency unit for any given currency amount, avoiding common rounding issues and handling zero-decimal/three-decimal cases.
- **Main Technologies**:
  - **Language**: TypeScript
  - **Bundler**: `tsup` (outputs ESM, CJS, and IIFE)
  - **Test Runner**: `ava` with `tsimp`
  - **Linting**: `eslint` with `typescript-eslint`
  - **Coverage**: `c8`
  - **Package Manager**: `pnpm`
- **Architecture**:
  - `src/index.ts`: Main entry point containing the conversion logic (`exec` default export) and a `display` helper.
  - `src/error-factory.ts`: Custom error class `ZeroDecimalError`.
  - `test.ts`: Comprehensive test suite using `ava`.

## Building and Running

The project uses `pnpm` for script execution.

- **Install Dependencies**:
  ```sh
  pnpm install
  ```
- **Build**:
  ```sh
  pnpm run build
  ```
  This generates the `dist/` directory with `index.js`, `index.mjs`, and `index.global.js`.
- **Run Tests**:
  ```sh
  pnpm test
  ```
- **Check Coverage**:
  ```sh
  pnpm run test:coverage
  ```
- **Lint Code**:
  ```sh
  pnpm run lint
  ```
- **Validate (Lint + Test)**:
  ```sh
  pnpm run validate
  ```
- **Clean Build Artifacts**:
  ```sh
  pnpm run clean
  ```

## Development Conventions

- **Commit Style**: This repository is **Commitizen friendly**. Use `pnpm run cz` (or `git cz` if installed globally) to create commits following conventional changelog standards.
- **Pre-commit Hooks**: The `validate` script runs automatically before every commit to ensure code quality and passing tests.
- **TypeScript**:
  - The project uses `strict: true` in `tsconfig.json`.
  - Source files are located in `src/`.
- **Testing**:
  - New features or bug fixes should be accompanied by tests in `test.ts` (or new test files).
  - Tests use `ava` and are executed via `tsimp` to support TypeScript directly.
- **Rounding Logic**:
  - Default behavior rounds according to `toFixed` rules.
  - An optional `noRound` parameter allows truncating decimals instead of rounding.
  - Zero-decimal currencies are handled by excluding all decimals.
  - Three-decimal currencies (e.g., BHD, KWD) are handled specifically, often appending a zero for Stripe compatibility in non-display mode.
