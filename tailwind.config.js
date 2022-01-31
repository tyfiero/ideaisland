module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
        // custom: ["Sniglet", "sans-serif"],
      },
      colors: {
        blues: {
          50: "#e7f4fe",
          100: "#b6defc",
          200: "#85c7f9",
          300: "#54b1f7",
          400: "#239bf5",
          500: "#0a81dc",
          600: "#0864ab",
          700: "#06487a",
          800: "#032b49",
          900: "#010e18",
        },
        t: {
          bd: "#2549A5",
          bl: "#4EAEF7",
          pd: "#B25CC9",
          pl: "#EEC3FD",
        },
        clear: {
          bd: "RGBA(37, 73, 165, 0.3)",
          bl: "RGBA(78, 174, 247, 0.7)",
          pd: "RGBA(178, 92, 201, 0.3)",
          pl: "RGBA(238, 195, 253, 0.6)",
          w: "RGBA(182, 240, 255, 0.25)",
          w1: "RGBA(182, 240, 255, 0.3)",
          w2: "RGBA(182, 240, 255, 0.35)",
          w3: "RGBA(182, 240, 255, 0.4)",
          w4: "RGBA(182, 240, 255, 0.5)",
        },
      },
      animation: {
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("autoprefixer"),
  ],
};
