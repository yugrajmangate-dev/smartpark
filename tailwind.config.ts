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
        // SmartPark Official Color Palette
        'background': '#0D0D0D',
        'surface': '#1A1A1A',
        'text-primary': '#EAEAEA',
        'text-muted': '#9CA3AF',
        'brand-orange': '#FF6B2C',
        'brand-amber': '#FFB347',
        // Semantic aliases for backward compatibility
        'sp-black': '#0D0D0D',
        'sp-charcoal': '#1A1A1A',
        'sp-orange': '#FF6B2C',
        'sp-amber': '#FFB347',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'glass': '12px',
        'xl': '12px',
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 107, 44, 0.3)',
        'glow-orange-lg': '0 0 40px rgba(255, 107, 44, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 44, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 44, 0.6)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
}
export default config
