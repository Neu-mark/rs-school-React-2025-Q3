/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pokemon: {
          primary: '#3B82F6',
          secondary: '#1E40AF',
          accent: '#F59E0B',
          success: '#10B981',

          error: '#EF4444',
          warning: '#F59E0B',
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      fontFamily: {
        pokemon: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        pokemon:
          '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
        'pokemon-lg':
          '0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05)',
      },
    },
  },
  plugins: [],
};