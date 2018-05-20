module.exports = wallaby => ({
  debug: true,
  workers: { initial: 2, regular: 1 },
  delays: { run: 500 },
  reportConsoleErrorAsError: true,
  env: {
    params: { env: "NODE_ENV=test" },
    type: "node"
  },
  testFramework: "jest",
  files: ["jest.config.js", "tsconfig.json", "src/**", "!tests/**/*.test.ts"],
  tests: ["tests/**/*.test.ts", "!node_modules/**"],
  compilers: {
    "**/*.ts": wallaby.compilers.typeScript({
      typescript: require("typescript")
    })
  },
  setup: w => {
    const jestConfig = require("./jest.config.js")
    w.testFramework.configure(jestConfig)
  }
})
