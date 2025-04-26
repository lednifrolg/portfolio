# Terminal Page

A React application that simulates a terminal interface for a personal portfolio.

## Features

- Terminal-like interface with typing animation
- Bootup sequence animation
- Responsive design
- Context-based state management

## Technologies

- React 19
- TypeScript
- Vite
- ESLint
- Prettier
- Husky
- lint-staged

## Development

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

### Development Server

To start the development server with hot module replacement (HMR):

```bash
npm run dev
# or
yarn dev
```

The development server will start at `http://localhost:5173` by default.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

### Code Quality Tools

This project uses several tools to ensure code quality:

#### ESLint

ESLint is configured to check for code quality issues. Run the linter with:

```bash
npm run lint
# or
yarn lint
```

#### Prettier

Prettier is used for consistent code formatting. Format your code with:

```bash
npm run format
# or
yarn format
```

Check if your code is properly formatted without modifying it:

```bash
npm run format:check
# or
yarn format:check
```

#### Husky and lint-staged

The project uses Husky to run pre-commit hooks and lint-staged to run linters on staged files before each commit. This ensures that only properly formatted and linted code is committed.

When you commit your changes, the pre-commit hook will automatically:
1. Run ESLint on staged TypeScript/JavaScript files
2. Run Prettier on all staged files
