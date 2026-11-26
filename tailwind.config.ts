import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                black: '#0A2540',
                gray: colors.slate,
                navy: {
                    50:  '#e8eef5',
                    100: '#c5d3e3',
                    200: '#9fb5ce',
                    300: '#7896b9',
                    400: '#5c7ea9',
                    500: '#3f6699',
                    600: '#2d5080',
                    700: '#1c3b66',
                    800: '#0e2549',
                    900: '#0A2540',
                    950: '#050A1F',
                },
                cyan: {
                    50:  '#e0faff',
                    100: '#b3f3ff',
                    200: '#80eaff',
                    300: '#4de2ff',
                    400: '#1ae0ff',
                    500: '#00D4FF',
                    600: '#00b8e6',
                    700: '#0097c2',
                    800: '#00749a',
                    900: '#005272',
                },
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
                "plus-jakarta-sans": ["var(--font-plus-jakarta-sans)", "sans-serif"],
            },
            fontSize: {
                'fluid-display': ['clamp(3rem,9vw,7rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
                'fluid-h1':      ['clamp(2.5rem,6vw,5rem)',  { lineHeight: '0.95', letterSpacing: '-0.03em' }],
                'fluid-h2':      ['clamp(2rem,4.5vw,3.5rem)', { lineHeight: '1',    letterSpacing: '-0.025em' }],
                'fluid-h3':      ['clamp(1.5rem,3vw,2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-ai':     'linear-gradient(135deg, #0A2540 0%, #0d3060 50%, #050A1F 100%)',
                'gradient-cyan':   'linear-gradient(135deg, #00D4FF 0%, #0ea5e9 50%, #6366f1 100%)',
                'gradient-hero':   'linear-gradient(to bottom, rgba(5,10,31,0.3) 0%, rgba(5,10,31,0.65) 60%, rgba(5,10,31,0.9) 100%)',
                'dot-grid':        'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
                'dot-grid-dark':   'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            },
            backgroundSize: {
                'dot-28': '28px 28px',
            },
            boxShadow: {
                'cyan-sm':    '0 0 15px rgba(0,212,255,0.08), 0 4px 16px rgba(0,0,0,0.06)',
                'cyan-md':    '0 0 24px rgba(0,212,255,0.14), 0 8px 32px rgba(0,0,0,0.08)',
                'cyan-lg':    '0 0 40px rgba(0,212,255,0.22), 0 16px 56px rgba(0,0,0,0.1)',
                'navy-sm':    '0 4px 16px rgba(10,37,64,0.12)',
                'navy-md':    '0 8px 32px rgba(10,37,64,0.18)',
                'navy-lg':    '0 16px 56px rgba(10,37,64,0.24)',
                'card':       '0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
                'card-hover': '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,212,255,0.12)',
            },
            borderRadius: {
                '2xl':  '1rem',
                '3xl':  '1.5rem',
                '4xl':  '2rem',
                '5xl':  '2.5rem',
                '6xl':  '3rem',
            },
            animation: {
                'scroll':       'scroll 50s linear infinite',
                'fade-up':      'fadeUp 0.7s ease both',
                'float':        'float 6s ease-in-out infinite',
                'glow':         'glowPulse 3s ease-in-out infinite',
                'gradient':     'gradientShift 8s ease infinite',
                'scan':         'scan 3s linear infinite',
            },
            keyframes: {
                scroll: {
                    '0%':   { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(calc(-100% / 2))' },
                },
                fadeUp: {
                    from: { opacity: '0', transform: 'translateY(24px)' },
                    to:   { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%,100%': { transform: 'translateY(0px)' },
                    '50%':     { transform: 'translateY(-12px)' },
                },
                glowPulse: {
                    '0%,100%': { boxShadow: '0 0 20px rgba(0,212,255,0.18)' },
                    '50%':     { boxShadow: '0 0 40px rgba(0,212,255,0.35)' },
                },
                gradientShift: {
                    '0%':   { backgroundPosition: '0% 50%' },
                    '50%':  { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                scan: {
                    '0%':   { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(400%)' },
                },
            },
            transitionTimingFunction: {
                'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
            },
        },
    },
    plugins: [],
};

export default config;
