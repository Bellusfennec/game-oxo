const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, "docs"),
    port: 8080,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};
