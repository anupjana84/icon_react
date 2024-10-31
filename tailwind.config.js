/** @type {import('tailwindcss').Config} */
export default {
    content: ["./resources/**/*.blade.php", "./resources/**/*.jsx"],
    theme: {
        extend: {
            animation: {
                wiggle: "wiggle 1s ease-in-out infinite",
            },
            fontFamily: {
                caveat: ["Caveat", "cursive"], // Add Caveat to your font family
            },
        },
    },
    plugins: [],
};
