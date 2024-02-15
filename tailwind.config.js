/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],

  theme: {
    colors: {
      primary: "#ED3F40",
      light: "#D6D4CE",
      dark: "#121212",

      white: "#FFFFFF",
      black: "#000000",
      gray: "#9C9B98",
      transparent: "transparent",
    },

    extend: {
      fontFamily: {
        regular: "Poppins_400Regular",
        medium: "Poppins_500Medium",
        semibold: "Poppins_600SemiBold",
        bold: "Poppins_700Bold",
      },
    },
  },

  plugins: [],
};
