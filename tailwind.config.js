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
        },
        fontFamily: {
            primary: 'Nunito, sans-serif',
            secondary: 'League Spartan, sans-serif',
        },
    },

    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
    ],
};
