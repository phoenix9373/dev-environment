const path = require("path") // path는 경로를 처리하는 기능을 제공함

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js", // entry에 추가한 'main' 이라는 문자열이 들어오는 방식
    path: path.resolve("./dist"), // output.path는 절대경로를 사용.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [path.resolve("./myloader.js")]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}