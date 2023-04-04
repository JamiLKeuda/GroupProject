/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['D:/vscode/webd/GroupProject/Ryhmatyo/shop.html',],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'postcss-loader'],
        },
        {
          test: /\.jsx?$/,
          use: ['babel-loader', 'astroturf/loader'],
        }
      ]
    }
  }


