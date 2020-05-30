
var BundleTracker = require("webpack-bundle-tracker");
module.exports = {
    context: __dirname,
    entry: "./src/",
    mode: "development",

    output: {
        path: require("path").resolve("../static/assets/bundles/"),
        filename: "[name].js",

    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: ["node_modules"],
    },

    plugins: [
        new BundleTracker({
            path: __dirname,
            filename: "./webpack-stats.json"
        })
    ],

    module: {
        rules: [
            {

                test: /\.tsx?$/, //? para que x sea solo si existe, expresion regular /\. para llegar al . algo
                exclude: /node_modules/,
                loader: 'ts-loader',  // babel-loader si estamos en javascript

                /*options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                    ]
                }*/
            },
            {
                test: /\.svg/,
                loader: 'file-loader'

            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'

            },
        ]
    }
};