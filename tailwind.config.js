/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", 
    "./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors:{
      primary: '#F28627',
      secondary: '#FFFFFF',
      terciary: '#888888',
      cuarto: "#d9d9d9",
      accent: '#f26513',
      success: '#2D882D',
      warning: '#F2C94C',
      danger: '#D9534F',
      light: '#F8F9FA',
      dark: '#343A40',
      backgroundLight: '#FFFFFF',
      backgroundDark: '#1C1C1E',
      textLight: '#212529',
      textDark: '#E1E1E1',
      primaryDisabled: '#D3A286',

    },
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
    },
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1600px',
      '4xl': '1920px',
    },
  },
  plugins: [],
}

