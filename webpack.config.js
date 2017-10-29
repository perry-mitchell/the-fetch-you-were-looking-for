const path = require("path");
const { DefinePlugin } = require("webpack");

const ENV = process.env.BABEL_ENV;
const DIST = path.resolve(__dirname, "./dist");
const SOURCE = path.resolve(__dirname, "./source");

if (["node", "web", "react-native"].indexOf(ENV) === -1) {
    throw new Error(`Failed building: '${ENV}' is not a valid environment`);
}
const target = {
    node: "node",
    web: "web",
    "react-native": "web"
}[ENV];

const config = {

    entry: path.join(SOURCE, "index.js"),

    module: {
        rules: [
            {
                test: /iconv-loader/,
                use: "null-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },

    output: {
        filename: `universal-fetch.${ENV}.js`,
        path: DIST,
        library: "universalFetch",
        libraryTarget: "umd"
    },

    plugins: [
        new DefinePlugin({
            FETCH_ENV: JSON.stringify(ENV)
        })
    ],

    target

};

if (ENV === "node") {
    Object.assign(config, {
        externals: {
            http: "http",
            https: "https"
        }
    });
}

module.exports = config;
