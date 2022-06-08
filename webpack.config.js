const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GeneratePackageJsonPlugin = require("generate-package-json-webpack-plugin");

const dev = process.env.NODE_ENV === "development";

function scss() {
    const read = (path) => {
        return fs
            .readdirSync(path)
            .filter((f) => !f.startsWith("index"))
            .filter((f) => !f.includes("_"));
    };
    const mappings = {};
    const files = read("styles");

    const setMappings = (_files, prefix = "") => {
        _files.forEach((f) => {
            if (fs.statSync(`styles/${prefix}${f}`).isDirectory()) {
                return setMappings(read(`styles/${f}`), `${f}/`);
            }
            const k = `${f.split(".").slice(0, 1).pop()}`;
            mappings[`css/${prefix}${f}`] = `./styles/${prefix}${f}`;
            return;
        });
    };

    setMappings(files);
    return mappings;
}

const entries = dev ? {} : scss();
entries.snapatoms = ["./styles/index.scss"];

module.exports = {
    entry: entries,
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css?version=[chunkhash]",
        }),
    ],
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "[name].js?version=[chunkhash]",
    },
    module: {
        rules: [
            {
                test: /\.scss$/,

                use: [
                    dev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
        ],
    },
};
