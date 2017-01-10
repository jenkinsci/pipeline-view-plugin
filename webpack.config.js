const path = require("path");
const webpack = require("webpack");

module.exports = {
    debug: false,
    cache: true,
    devtool: "source-map",
    entry: {
        app: path.join(__dirname, "app")
    },
    output: {
        path: path.join(__dirname, "build", "dist"),
        filename: "pipe.js",
        publicPath: "/plugin/pipeline-view/"
    },
    module: {
        preLoaders: [
            {
                test: /\.(jsx|js)?$/,
                loaders: ["eslint"],
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js|\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.eot$|\.woff$|\.woff2$|\.ttf$/,
                loader: "file"
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite?' + JSON.stringify({
                    name: '[path]_[hash]',
                    prefixize: true
                })
            },
            {
                test: /\.(c|le)ss$/,
                loader: "style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap!less?sourceMap"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            }
        }),
    ],
    resolve: {
        alias: {
            "rx": "rxjs"
        },
        root: [
            path.resolve(__dirname, "node_modules")
        ],
        extensions: ["", ".css", ".less", ".js", ".jsx"]
    },
    devServer: {
        port: 3000,
        host: "0.0.0.0",
        inline: true,
        proxy: {
            // Ugly hack to workaround Jenkins's static file URLs
            "*/plugin/pipeline-view/pipe.js": {
                target: "http://localhost:3000/",
                secure: false,
                rewrite: (req) => req.url = req.url.substring(req.url.indexOf("/plugin/pipeline-view/"))
            },
            "*": {
                target: process.env.JENKINS_URL || "http://localhost:8080/",
                secure: false
            }
        }
    }
};
