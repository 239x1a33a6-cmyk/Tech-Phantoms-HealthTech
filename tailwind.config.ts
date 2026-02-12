import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00B4A6',
          dark: '#008C82',
          light: '#33C4B8',
        },
        secondary: {
          DEFAULT: '#0066CC',
          dark: '#0052A3',
          light: '#3385D6',
        },
        accent: {
          DEFAULT: '#FF6B6B',
          dark: '#E63946',
          light: '#FF8E8E',
        },
        success: '#06D6A0',
        warning: '#F77F00',
        navy: {
          DEFAULT: '#1A2332',
          light: '#2D3748',
        },
        cream: '#FAF8F5',
        mint: '#D4F1E8',
        coral: '#FFE5E0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
