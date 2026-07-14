import type { Config } from 'tailwindcss'

export const themeConfig: Config['theme'] = {
  extend: {
    colors: {
      // Primary Brand Colors - Medical Blue
      primary: {
        25: '#f7fbff',
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
        950: '#0c1e3a',
      },

      // Secondary Colors - Emerald Green (Success)
      secondary: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
        950: '#022c1b',
      },

      // Accent Colors - Cyan
      accent: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
        950: '#0d3b43',
      },

      // Healthcare Semantic Colors
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },

      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },

      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },

      emergency: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#dc2626',
        600: '#c41f1f',
        700: '#a01a1a',
        800: '#7f1d1d',
        900: '#4c0519',
        950: '#1f0b0d',
      },

      // Neutral Grays
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },

      // Background colors
      background: {
        light: '#ffffff',
        dark: '#0f172a',
      },

      // Border and surface colors
      border: {
        light: '#e5e7eb',
        dark: '#1e293b',
      },
    },

    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
    },

    fontSize: {
      // Display sizes
      'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      'display-sm': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],

      // Headline sizes
      'headline-lg': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      'headline-md': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
      'headline-sm': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0em' }],

      // Body sizes
      'body-lg': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.005em' }],
      'body-md': ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
      'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
      'body-xs': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],

      // Label sizes
      'label-lg': ['0.875rem', { lineHeight: '1.25', letterSpacing: '0.01em', fontWeight: '500' }],
      'label-md': ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '500' }],
      'label-sm': ['0.625rem', { lineHeight: '1.2', letterSpacing: '0.03em', fontWeight: '600' }],
    },

    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '2.5rem',
      '3xl': '3rem',
      '4xl': '4rem',
    },

    boxShadow: {
      // Subtle shadows
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

      // Healthcare premium shadows
      'premium-sm': '0 2px 8px rgba(59, 130, 246, 0.08)',
      'premium-md': '0 8px 16px rgba(59, 130, 246, 0.12)',
      'premium-lg': '0 12px 24px rgba(59, 130, 246, 0.15)',

      // Glass morphism effect
      'glass': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',

      // Emergency shadows
      'emergency-glow': '0 0 20px rgba(220, 38, 38, 0.3)',
    },

    borderRadius: {
      xs: '0.25rem',
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      full: '9999px',
    },

    animation: {
      'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'pulse-emergency': 'pulse-emergency 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'shimmer': 'shimmer 2s linear infinite',
      'slide-in': 'slide-in 0.3s ease-out',
      'fade-in': 'fade-in 0.3s ease-out',
      'bounce-gentle': 'bounce-gentle 1s ease-in-out infinite',
    },

    keyframes: {
      'pulse-emergency': {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.7' },
      },
      'shimmer': {
        '0%': { backgroundPosition: '-1000px 0' },
        '100%': { backgroundPosition: '1000px 0' },
      },
      'slide-in': {
        'from': { transform: 'translateY(-10px)', opacity: '0' },
        'to': { transform: 'translateY(0)', opacity: '1' },
      },
      'fade-in': {
        'from': { opacity: '0' },
        'to': { opacity: '1' },
      },
      'bounce-gentle': {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-4px)' },
      },
    },

    backgroundImage: {
      'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      'gradient-emergency': 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },

    transitionProperty: {
      'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      'all': 'all',
    },

    transitionDuration: {
      'fast': '150ms',
      'normal': '200ms',
      'slow': '300ms',
    },

    backdropBlur: {
      'sm': '4px',
      'md': '8px',
      'lg': '12px',
    },
  },
}