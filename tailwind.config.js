/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand : "#667039",
        text_strong: "#4A6053",
        light_bg: "#D1E86C",
        stroke_strong: "#8F908C"
      }, 
      fontFamily: {
        manrope: ['Manrope_400Regular'],
        'manrope-medium': ['Manrope_500Medium'],
        'manrope-semibold': ['Manrope_600SemiBold'],
        'manrope-bold': ['Manrope_700Bold'],
        'manrope-extrabold': ['Manrope_800ExtraBold'],
      }, 
      fontSize: {
        h1: ["100px", { lineHeight: "120px" }],
        h2: ["60px", { lineHeight: "72px" }],
        h3: ["40px", { lineHeight: "48px" }],
        h4: ["30px", { lineHeight: "36px" }],
        h5: ["24px", { lineHeight: "28px" }],
        h6: ["20px", { lineHeight: "24px" }],
        body: ["16px", { lineHeight: "24px" }],
        small: ["14px", { lineHeight: "20px" }],
      }, 
      spacing: {
        xs: "8px",
        sm: "16px",
        md: "24px",
        lg: "32px",
        xl: "40px",
        "2xl": "48px",
        "3xl": "64px",
      }
    },
  },
  plugins: [],
}
