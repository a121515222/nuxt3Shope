// @type {import('tailwindcss').Config}
module.exports = {
  darkMode: "selector",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#036415", // 默认的 primary 颜色
          dark: "#005C12"
        },
        secondary: {
          DEFAULT: "#FCD058",
          dark: "#E3BC4F"
        },
        third: {
          DEFAULT: "#89c534"
        }
      },
      spacing: {
        "7/10": "70%"
      }
    }
  },
  plugins: [require("flowbite/plugin")]
};
