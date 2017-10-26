const webpackConfig = require("./webpack.config.js");

delete webpackConfig.entry;

module.exports = config => config.set({

    basePath: __dirname,

    browsers: ["ChromeWithoutSecurity", "FirefoxWithoutSecurity"],

    captureTimeout: 60000,

    colors: true,

    coverageReporter: {
        dir: "build/coverage/",
        reporters: [
            { type: "html" },
            { type: "text" },
            { type: "text-summary" }
        ]
    },

    customLaunchers: {
        ChromeWithoutSecurity: {
            base: "Chrome",
            flags: ["--disable-web-security"]
        },
        FirefoxWithoutSecurity: {
            base: "Firefox",
            prefs: {
                "security.fileuri.strict_origin_policy": false
            }
        }
    },

    exclude: [],

    files: [
        "source/index.js",
        "test/web/**/*.js"
    ],

    frameworks: ["mocha", "chai", "sinon"],

    plugins: [
        require("karma-webpack"),
        require("istanbul-instrumenter-loader"),
        require("karma-chrome-launcher"),
        require("karma-firefox-launcher"),
        require("karma-mocha"),
        require("karma-chai"),
        require("karma-sinon"),
        require("karma-coverage"),
        require("karma-spec-reporter")
    ],

    preprocessors: {
        "source/**/*.js": ["webpack", "coverage"],
        "test/web/**/*.js": ["webpack"]
    },

    reporters: ["spec", "progress", "coverage"],

    singleRun: true,

    webpack: webpackConfig

});
