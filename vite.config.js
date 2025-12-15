import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    root: './src',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        assetsInlineLimit: 0, // Don't inline any assets
    },
    plugins: [
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: 'assets/images/**/*',
                    dest: 'assets/images',
                },
            ],
        }),
    ],
});
