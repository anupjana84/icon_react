import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
    ],
    build: {
        chunkSizeWarningLimit: 5000, // Increase the limit in KB (e.g., to 5000 KB)
    },
});
