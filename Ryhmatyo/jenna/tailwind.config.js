/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        quick: ['Quicksand'],
        poppins: ['Poppins']
      }
    },
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


