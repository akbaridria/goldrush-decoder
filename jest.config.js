/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    coveragePathIgnorePatterns: ["./dist/*"],
    maxWorkers: 5,
    testTimeout: 10000,
};
