import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true, // Enables `describe`, `test`, `expect` globally without importing them everywhere
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'),
        },
    },
});