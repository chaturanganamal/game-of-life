const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = (env, arg) => {
  const config = {
    entry: "./src/index.tsx",
    output: {
      path: path.join(process.cwd(), "docs"),
      filename: "[name].[chunkhash].js",
      crossOriginLoading: false
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
      rules: [{
        test: /\.scss$/,
        loader: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: { modules: 'global' }
        }, {
          loader: "sass-loader",
          options: { includePaths: ["./node_modules"] }
        }]
      }, {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./src/template.html" })
    ],
    devServer: {
      port: 4200,
      historyApiFallback: true
    },
  };

  if (arg.mode === 'production') {
    config.plugins = config.plugins.concat([
      new CleanWebpackPlugin()
    ]);
  }

  return config;
};
