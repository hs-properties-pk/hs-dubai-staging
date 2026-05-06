/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["TenorSans", "sans-serif"],
        custom2: ["Urbanist", "sans-serif"],
        custom3: ["Satoshi", "sans-serif"],
        custom4: ["WingSong", "sans-serif"],
      },
      backgroundImage: {
        "radial-custom": "radial-gradient(#78350f, #fde047)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#d3a956",
        secondary: "#606060",
      },
      animation: {
        scroll: "scroll 60s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-250px * 14))" },
        },
      },
    },
  },
  plugins: [],
};
