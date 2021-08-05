module.exports = {
  roots: ['<rootDir>/src','<rootDir>/test'],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  setupFiles: ['./src/config.ts'],
}
