module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.ts$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    testRegex: "(/src/.*.(test|spec)).(jsx?|tsx?)$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    transformIgnorePatterns: ["/node_modules/(?!@gemeente-denhaag)/"],
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        "(tests/.*.mock).(jsx?|tsx?)$"
    ],
    verbose: true,
};
