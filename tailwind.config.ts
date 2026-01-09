import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C00',
        'primary-dark': '#E67E00',
        'bg-dark': '#0A0A0A',
        'bg-secondary': '#1A1A1A',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B0B0B0',
      },
    },
  },
  plugins: [],
}
export default config
