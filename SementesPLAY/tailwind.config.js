module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00FFD0', // Exemplo de cor neon gamer
        secondary: '#1A1A2E',
        glass: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        gamer: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gamer': 'linear-gradient(135deg, #232526 0%, #1A1A2E 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}; 