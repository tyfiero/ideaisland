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
          50: "HSL(var(--colorDark1HslBase), 95%)",
          100: "HSL(var(--colorDark1HslBase), 85%)",
          200: "HSL(var(--colorDark1HslBase), 75%)",
          300: "HSL(var(--colorDark1HslBase), 65%)",
          400: "HSL(var(--colorDark1HslBase), 55%)",
          500: "HSL(var(--colorDark1HslBase), 45%)",
          600: "HSL(var(--colorDark1HslBase), 35%)",
          700: "HSL(var(--colorDark1HslBase), 25%)",
          800: "HSL(var(--colorDark1HslBase), 15%)",
          900: "HSL(var(--colorDark1HslBase), 5%)",
        },
        pinks: {
          50: "HSL(var(--colorLight1HslBase), 95%)",
          100: "HSL(var(--colorLight1HslBase), 85%)",
          200: "HSL(var(--colorLight1HslBase), 75%)",
          300: "HSL(var(--colorLight1HslBase), 65%)",
          400: "HSL(var(--colorLight1HslBase), 55%)",
          500: "HSL(var(--colorLight1HslBase), 45%)",
          600: "HSL(var(--colorLight1HslBase), 35%)",
          700: "HSL(var(--colorLight1HslBase), 25%)",
          800: "HSL(var(--colorLight1HslBase), 15%)",
          900: "HSL(var(--colorLight1HslBase), 5%)",
        },
        t: {
          bpop: "var(--colorPop)",
          bd: "var(--colorDark2)",
          bl: "var(--colorDark1)",
          pd: "var(--colorLight2)",
          pm: "var(--colorLight3)",
          pl: "var(--colorLight1)",
        },
        clear: {
          bd: "RGBA(37, 73, 165, 0.3)",
          bl: "RGBA(78, 174, 247, 0.9)",
          pd: "RGBA(178, 92, 201, 0.3)",
          pl5: "hsla(var(--colorLight1base),0.9)",
          pl4: "hsla(var(--colorLight1base),0.7)",
          pl3: "hsla(var(--colorLight1base),0.5)",
          pl2: "hsla(var(--colorLight1base),0.3)",
          pl1: "hsla(var(--colorLight1base),0.1)",

          pm5: "hsla(var(--colorLight3base), 0.9)",
          pm4: "hsla(var(--colorLight3base), 0.7)",
          pm3: "hsla(var(--colorLight3base), 0.5)",
          pm2: "hsla(var(--colorLight3base), 0.3)",
          pm1: "hsla(var(--colorLight3base), 0.1)",

          pd5: "hsla(var(--colorLight2base), 0.9)",
          pd4: "hsla(var(--colorLight2base), 0.7)",
          pd3: "hsla(var(--colorLight2base), 0.5)",
          pd2: "hsla(var(--colorLight2base), 0.3)",
          pd1: "hsla(var(--colorLight2base), 0.1)",

          bl5: "hsla(var(--colorDark1base), 0.9)",
          bl4: "hsla(var(--colorDark1base), 0.7)",
          bl3: "hsla(var(--colorDark1base), 0.5)",
          bl2: "hsla(var(--colorDark1base), 0.3)",
          bl1: "hsla(var(--colorDark1base), 0.1)",

          bd5: "hsla(var(--colorDark2base), 0.9)",
          bd4: "hsla(var(--colorDark2base), 0.7)",
          bd3: "hsla(var(--colorDark2base), 0.5)",
          bd2: "hsla(var(--colorDark2base), 0.3)",
          bd1: "hsla(var(--colorDark2base), 0.1)",
        
          bpop5: "hsla(var(--colorPopbase), 0.9)",
          bpop4: "hsla(var(--colorPopbase), 0.7)",
          bpop3: "hsla(var(--colorPopbase), 0.5)",
          bpop2: "hsla(var(--colorPopbase), 0.3)",
          bpop1: "hsla(var(--colorPopbase), 0.1)",

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
      },
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      scale: {
        '-1': '-1'
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
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
