const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const apiMocker = require('connect-api-mocker')

module.exports = {
  mode: 'development', // or production
  entry: {
    main: './src/app.js' // SPA의 경우, 하나의 엔트리 포인트를 갖는다.
  },
  output: { // webpack으로 build하고 난 후, 결과물
    filename: "[name].js", // output 파일 이름: entry의 property를 name으로 사용.
    path: path.resolve('./dist'), // 프로젝트의 절대경로
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: [/\.png$/, /\.jpg$/],
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        // env: process.env.NODE_ENV === 'development' ? '(개발용)' : '(개발용 아님)',
        env: process.env.NODE_ENV,
      }
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    overlay: true,
    stats: "errors-only",
    proxy: {
      "/api": 'http://localhost:8081' // '/api'로 시작하는 것은 다음 주소로 요청하는 설정
    },
    hot: true,
    before: (app, server, compiler) => {
      app.use(apiMocker('/api', 'mocks/api'))
    }
  }
}