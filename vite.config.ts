import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import ScriptSetup from 'unplugin-vue2-script-setup/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import StylelintPlugin from 'vite-plugin-stylelint';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    createVuePlugin(),
    viteCommonjs(),
    {
      ...getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-optional-chaining'],
      }),
    },
    ScriptSetup({
      /* options */
    }),
    AutoImport({
      imports: ['vue-demi'],

      eslintrc: {
        enabled: true,
      },
    }),
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
