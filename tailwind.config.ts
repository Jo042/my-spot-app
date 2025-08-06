import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6F91',
        primary_hovered: '#E7587E',
        primary_light: '#FFD9DF',
        background: '#FFF8F8',
        accent: '#344055',
      },
    },
  },
  plugins: [],
}

export default config
