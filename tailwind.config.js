/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#74C69D', // color-verde-principal
                    dark: '#1B4332',    // color-verde-oscuro
                    light: '#D8F3DC',   // color-verde-suave
                    accent: '#40916C',  // color-acento
                    cream: '#F9FFF9',   // color-fondo-crema
                    hover: '#40916C',   // alias for accent
                },
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
