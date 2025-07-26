module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'sas-green': {
          700: '#1a5632',
          800: '#0e4224',
          900: '#092c17',
        },
        'sas-yellow': '#f2c94c',
        'sas-gold': '#d4af37',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}