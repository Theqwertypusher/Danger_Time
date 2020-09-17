const path = require('path');

module.exports = {
  mode: "development",
  entry: "./client/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "./client"),
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3333',
      '/main': 'http://localhost:3333',
      '/auth': 'http://localhost:3333',
    },
    publicPath: "/build/",
  },
};
