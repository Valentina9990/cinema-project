/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest", // Use ts-jest to handle TypeScript files
  testEnvironment: "node", // Use Node.js environment for Express APIs
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"], // Match test files
  moduleFileExtensions: ["ts", "js", "json", "node"], // Support TypeScript files
};
