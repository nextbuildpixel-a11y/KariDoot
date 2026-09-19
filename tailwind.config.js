/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linen: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F3EDE2',
          300: '#E7E2DA',
          DEFAULT: '#FAF7F2',
        },
        terracotta: {
          50: '#FDF4F0',
          100: '#FBECE7',
          200: '#F6D2C4',
          300: '#EEAF98',
          400: '#DE7C57',
          500: '#C85A32',
          600: '#A64522',
          700: '#843419',
          800: '#642714',
          900: '#461C0F',
          DEFAULT: '#C85A32',
        },
        forest: {
          50: '#F4F7F5',
          100: '#EBF2EE',
          200: '#D2E1D8',
          300: '#A5C4B2',
          400: '#679B7C',
          500: '#2D5A43',
          600: '#224433',
          700: '#1A3427',
          800: '#13261D',
          900: '#0D1A13',
          DEFAULT: '#2D5A43',
        },
        stone: {
          border: '#E7E2DA',
          muted: '#8C857B',
        },
        charcoal: {
          DEFAULT: '#1F2937',
          muted: '#4B5563',
          light: '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Bengali', 'sans-serif'],
        serif: ['Lora', 'Merriweather', 'serif'],
      },
      boxShadow: {
        'earthy': '0 4px 20px -2px rgba(45, 90, 67, 0.08), 0 2px 6px -1px rgba(200, 90, 50, 0.06)',
        'earthy-lg': '0 10px 30px -4px rgba(45, 90, 67, 0.12), 0 4px 12px -2px rgba(200, 90, 50, 0.08)',
        'earthy-xl': '0 20px 40px -6px rgba(45, 90, 67, 0.16), 0 8px 16px -4px rgba(200, 90, 50, 0.10)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
