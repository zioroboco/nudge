module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testMatch: ["<rootDir>/tests/**/*.spec.ts"],
  transform: { "^.+\\.ts$": "ts-jest" },
  moduleFileExtensions: ["json", "js", "ts"]
}
