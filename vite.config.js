import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "src/styles/_vars.scss";`,
            },
        },
    },
    plugins: [react()],
    test: {
        globals: true,
        setupFiles: "src/setupTests.js",
        environment: "jsdom",
    },
});
