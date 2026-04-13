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
                    900: '#0A2540', // Deep Navy/Charcoal primary
                    950: '#050A1F', // Very dark background variant
                },
                cyan: {
                    400: '#1ae0ff',
                    500: '#00D4FF', // Vibrant Cyan accent
                    600: '#00b8e6',
                },
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                "plus-jakarta-sans": ["var(--font-plus-jakarta-sans)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
