/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ethereal Twilight Rose Palette
        twilight: {
          50: '#FDF7F5', // Softest glow
          100: '#F8EAE6', 
          800: '#2A0815', // Deep twilight background
          900: '#18020A', // Obsidian void
          950: '#100105',
        },
        velvet: {
          400: '#993355',
          500: '#751A33', // Core plum/burgundy
          600: '#520B1F', // Deep shadow plum
          700: '#3A0513',
          900: '#22000A', // Almost black plum for text
        },
        champagne: {
          300: '#F2C4CE',
          400: '#E6A8B6', // Rose Gold base
          500: '#D58A9A', // Deeper Rose Gold
          600: '#B86B7B',
        },
        rosequartz: {
          100: '#FFE6E9',
          200: '#FFCAD4',
          300: '#F099A6',
          400: '#D97382',
        },
        // Accents
        amber: {
          500: '#D4A373', // Rich gold
          600: '#C68B59',
        },
        coral: {
          300: '#FFB5A7',
          400: '#F4A261',
        },
        sage: {
          100: '#E8EFE9',
          200: '#CCD5AE',
          300: '#A3B19B',
          400: '#7E8F75',
        },
        mint: {
          50: '#F4FAF6',
          100: '#E8F2EC',
          200: '#D0E6DA',
        },
        lavender: {
          100: '#F5F3FC',
          200: '#E6E3FC',
          300: '#C1BDF4',
        },
        pearl: '#FFFCFA',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Montserrat', 'sans-serif'],
        script: ['"Pinyon Script"', 'Great Vibes', 'cursive'],
        arabic: ['Amiri', 'Traditional Arabic', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-slow': 'fadeIn 3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        },
      },
      transitionTimingFunction: {
        'fluid': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
}
