import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function resolve(dir: string): string {
  return join(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@mdvui/components': resolve('packages/components'),
      '@mdvui/utils': resolve('packages/utils'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {

      },
    },
  },
  build: {
    sourcemap: true,
  },
})
