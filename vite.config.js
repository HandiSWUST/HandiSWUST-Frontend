import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
    server: {
      port: 3000,
      open: true,
      // 配置代理
      proxy: {
		'/api': {
			target: 'https://swust.aliceblog.co/',
			ws: true,
			changeOrigin: true,
			// rewrite:(path) => path.replace(/^\/api/, '')
		},
      },
    },
 })
