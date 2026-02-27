# zero-decimal-currencies

## Build and Test Commands
- Install dependencies: `pnpm install`
- Build project: `pnpm run build`
- Run tests: `pnpm test`
- Lint code: `pnpm run lint`
- Validate (Lint + Test): `pnpm run validate`
- Run coverage: `pnpm run test:coverage`

## Project Guidelines
- **Type Safety**: The project is written in TypeScript and uses strict mode. Always maintain proper types.
- **Formatting**: Adhere to the existing ESLint configuration.
- **Modern Standards**: The project uses ESM by default and is built for modern Node.js environments (>=18).
- **Testing**: New features or bug fixes must include tests in `test.ts`.
- **Commits**: Follow conventional commit standards (Commitizen friendly).
