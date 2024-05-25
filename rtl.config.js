import path from "path";
import WebpackRTLPlugin from "webpack-rtl-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import RemovePlugin from "remove-files-webpack-plugin";

// eslint-disable-next-line no-undef
const distPath = path.resolve(__dirname, "src/assets/rtl");
const entries = { style: "./src/assets/sass/style.scss" };

export default {
  entry: entries,
  output: {
    // main output path in assets folder
    path: distPath,
    // output path based on the entries filename
    filename: "[name].js",
    // clean existing output folder
    clean: true,
  },
  resolve: {
    extensions: [".scss"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new WebpackRTLPlugin(),
    new RemovePlugin({
      after: {
        root: distPath,
        include: ["style.js", "style.css"],
        trash: true,
      },
    }),
  ],
};
