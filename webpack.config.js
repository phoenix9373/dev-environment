const path = require("path"); // path는 경로를 처리하는 기능을 제공함
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const banner = require("./banner");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js", // entry에 추가한 'main' 이라는 문자열이 들어오는 방식
    path: path.resolve("./dist"), // output.path는 절대경로를 사용.
  },
  devServer: {
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [path.resolve("./myloader.js")],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: [/\.jpg$/, /\.png$/],
        use: {
          loader: "url-loader",
          options: {
            publicPath: "./dist/", // prefix를 output 경로로 지정.
            name: "[name].[ext]?[hash]", // 파일을 output에 복사할 때, 파일명 형식
            limit: 5000,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
    }),
    new webpack.BannerPlugin({
      banner,
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
  ],
};
