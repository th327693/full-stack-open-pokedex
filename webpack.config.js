const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const { webpack,DefinePlugin } = require("webpack");
const { exec } = require('child_process')
const gitCommand = 'git rev-parse HEAD'

let commit_hash = ''

const config = async (env, argv) => {
  try {
    console.log("argv", argv);
    await exec(gitCommand, { cwd: process.cwd() }, (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error : ${error.message}`);
          return;
      }
      if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
      }
  
      const latestCommitHash = stdout.trim();
      console.log(`newest hash : ${latestCommitHash}`);
      commit_hash = latestCommitHash
    });
    return {
      entry: "./src/index.jsx",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader",
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: "style-loader",
              },
              {
                loader: "css-loader",
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ["*", ".js", ".jsx"],
      },
      devServer: {
        historyApiFallback: true,
      },
      plugins: [
        new HtmlWebPackPlugin({
          template: "./public/index.html",
          filename: "./index.html",
        }),
        new DefinePlugin({
          COMMIT_HASH: JSON.stringify(commit_hash)
        }),
      ],
    };
  }
  catch(e) {
    throw e
  }
};
module.exports = config;
