const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
  },
};
