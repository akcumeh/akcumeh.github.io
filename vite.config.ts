import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    publicDir: resolve(__dirname, 'public'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                projects: resolve(__dirname, 'projects.html'),
            },
        },
    },
});
