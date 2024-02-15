/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],

  theme: {
    colors: {
      primary: "#ED3F40",
      light: "#E0DED9",
      dark: "#222222",

      white: "#FFFFFF",
      black: "#000000",
      gray: "#D6D4CF",
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
