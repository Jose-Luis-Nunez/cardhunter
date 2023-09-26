module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    roots: ['<rootDir>/tests/utils'],
    modulePathIgnorePatterns: ['node_modules'],
    transform: {
        '^.+\\.js$': 'babel-jest', // Use babel-jest to transform JavaScript files
    },
    modulePaths: ['<rootDir>/tests'],
};
