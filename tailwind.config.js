/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        'blinka': ['Blinka Serif', 'Georgia', 'serif'],
        'delight': ['Delight Sunset', 'cursive'],
        'inter': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'yaal': {
          50: '#f8f8f8',
          100: '#e0e0e0',
          200: '#cccccc',
          300: '#999999',
          400: '#666666',
          500: '#4d4d4d',
          600: '#333333',
          700: '#1a1a1a',
          800: '#000000',
          900: '#000000',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'geometric-move': 'geometricMove 20s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        geometricMove: {
          '0%, 100%': {
            transform: 'translateX(0) translateY(0) rotate(0deg)'
          },
          '33%': {
            transform: 'translateX(-20px) translateY(20px) rotate(1deg)'
          },
          '66%': {
            transform: 'translateX(20px) translateY(-20px) rotate(-1deg)'
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
} 