import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function resolve(dir: string): string {
  return join(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  base: '/MDVUI/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@mdvui/components': resolve('packages/components'),
      '@mdvui/utils': resolve('packages/utils'),
      '@mdvui/styles': resolve('packages/styles'),
      '@mdvui/plugins': resolve('packages/plugins'),
      '@mdvui/hooks': resolve('packages/hooks'),
      '@mdvui/directives': resolve('packages/directives'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@mdvui/styles/mixin/index.scss';
          @import '@mdvui/styles/variable/index.scss';
        `,
      },
    },
  },
  build: {
    sourcemap: true,
  },
})
