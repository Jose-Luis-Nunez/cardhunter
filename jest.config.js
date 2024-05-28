module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        '/node_modules/',
        '/playwright-tests/' // Pfad zu deinem Playwright-Testordner
    ],
    moduleFileExtensions: ['js', 'jsx'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
};
