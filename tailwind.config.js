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
        pinks: {
          50: "#fcf4ff",
          100: "#f9e8ff",
          200: "#eec3fd",
          300: "#eaacfb",
          400: "#df7bf7",
          500: "#ce48ed",
          600: "#ce48ed",
          700: "#981ead",
          800: "#7e1a8e",
          900: "#691b74",
        },
        t: {
          bpop: "#00fff8",
          bd: "#2549A8",
          bl: "#4EAEF7",
          pd: "#be0081",
          pm: "#d662bf",
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
          snow: "RGBA(255, 255, 255, 0.6)",
        },
      },
      animation: {
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
        'gradient-x':'gradient-x 5s ease infinite',
            'gradient-y':'gradient-y 5s ease infinite',
            'gradient-xy':'gradient-xy 5s ease infinite',
            'gradient-xy-slow':'gradient-xy 15s ease infinite',

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
        'gradient-y': {
          '0%, 100%': {
              'background-size':'400% 400%',
              'background-position': 'center top'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'center center'
          }
      },
      'gradient-x': {
          '0%, 100%': {
              'background-size':'200% 200%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'right center'
          }
      },
      'gradient-xy': {
          '0%, 100%': {
              'background-size':'400% 400%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'right center'
          }
      }
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      scale: {
        '-1': '-1'
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-scrollbar"),
    require("autoprefixer"),
  ],
  variants: {
    scrollbar: ['rounded']
}
};
