const customConfigTailwindCSS = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        lg: '17px',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      screens: { sm: '576px', md: '770px', lg: '980px', xl: '1200px' },
    },
  },
  plugins: [],
}

module.exports = customConfigTailwindCSS
