const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  // mode: "development", // 'production' or 'development'
  entry: "./src/index.tsx",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // Path to serve static files from
    },
    open: true, // Open the default web browser
    port: 8080, // Specify the port to listen on
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [new Dotenv()],
};
