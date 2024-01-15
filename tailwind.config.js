const tailwindcolors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        pink: {
          DEFAULT: "#ec4899",
        },
        orange: {
          DEFAULT: "#f97316",
        },
        gray: {
          d1000: "#1f1f1f",
        },
      },
    },
    // colors: {
    //   ...tailwindcolors,
    //   _pink: {
    //     DEFAULT: '#ec4899'
    //   },
    //   _orange: {
    //     DEFAULT: '#f97316'
    //   },
    //   _gray: {
    //     d1000: "#1f1f1f",
    //   },
    // },
  },
  plugins: [],
};
