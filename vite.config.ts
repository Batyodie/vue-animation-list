import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import StylelintPlugin from 'vite-plugin-stylelint';
import checker from 'vite-plugin-checker';
import VueTypeImports from 'vite-plugin-vue-type-imports';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  plugins: [
    vue(),
    viteCommonjs(),
    {
      ...getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-optional-chaining'],
      }),
    },
    AutoImport({
      imports: ['vue-demi'],

      eslintrc: {
        enabled: true,
      },
    }),
    VueTypeImports(),
    eslintPlugin(),
    StylelintPlugin(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,ts,vue}"',
      },
      vueTsc: true,
    }),
  ],

  optimizeDeps: {
    exclude: ['vue-demi'],
  },
});
