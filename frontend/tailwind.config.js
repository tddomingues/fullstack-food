/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      white: "#FFFFFF",
      black: "#0C0D0F",
      red: "#E03131",
      orange: "#E8590C",
      yellow: "#FCC419",
      green: "#23DB42",
      teal: "#89DD13",
      cyan: "#3BC9DB",
      blue: "#25BEFF",
      indigo: "#4263Eb",
      purple: "#7E5CEF",
      pink: "#FE5895",
      gray100: "#FAFAFA",
      gray200: "#E9ECEF",
      gray300: "#DEE2E6",
      gray400: "#CED4DA",
      gray500: "#A4ACB4",
      gray600: "#64666B",
      gray700: "#424449",
      gray800: "#1D1E21",
      gray900: "#141518",
      primary: "#F83600",
      secondary: "#FE8C00",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
