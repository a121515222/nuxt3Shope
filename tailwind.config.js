// @type {import('tailwindcss').Config}
const plugin = require("tailwindcss/plugin");
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
  safelist: ["opacity-0", "opacity-100"],
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
      },
      height: {
        "7/10": "70%"
      },
      width: {
        "9/10": "90%"
      },
      zIndex: {
        100: "100"
      },
      boxShadow: {
        "inner-border": "inset 0 0 0 1px rgba(0, 0, 0, 0.2)", // 淺色內邊框
        "inner-border-dark": "inset 0 0 0 1px rgba(255, 255, 255, 0.2)" // 深色內邊框
      },
      textShadow: {
        DEFAULT: "0 2px 2px var(--tw-shadow-color)"
      },
      objectPosition: {
        "center-bottom": "center bottom"
      },
      backgroundPosition: {
        "center-bottom": "center 70%"
      },
      keyframes: {
        scrollDown: {
          "0%": { transform: "translateY(5px)" },
          "100%": { transform: "translateY(16px)" }
        }
      },
      animation: {
        scrollDown: "scrollDown 1s ease-in-out infinite"
      }
    }
  },
  plugins: [
    require("flowbite/plugin"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value
          })
        },
        { values: theme("textShadow") }
      );
    })
  ]
};
