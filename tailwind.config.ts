import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7df',
          100: '#fbe7b3',
          200: '#f2ce72',
          300: '#dba139',
          400: '#c17c17',
          500: '#a9620b',
          600: '#8a4d09',
          700: '#6d3b08',
          800: '#3f2205',
          900: '#140b01'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.18)',
        gold: '0 16px 40px rgba(169,98,11,0.22)'
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top, rgba(242,206,114,0.18), transparent 30%), linear-gradient(180deg, #140b01 0%, #090909 65%, #050505 100%)'
      }
    }
  },
  plugins: []
};

export default config;
