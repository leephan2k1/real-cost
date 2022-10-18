/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#f0edf4',
            },
            screens: {
                sm: '320px',
            },
            flex: {
                0: '0 0 135px',
            },
            animation: {
                'spin-slow': 'spin 2s linear infinite',
            },
        },
        fontFamily: {
            primary: 'Nunito, sans-serif',
            secondary: 'League Spartan, sans-serif',
        },
    },

    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        require('tailwindcss-animate'),
        require('tailwindcss-highlights'),
    ],
};
