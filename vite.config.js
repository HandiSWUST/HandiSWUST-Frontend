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
        '/api/v2/extension/cr': {
            target: 'http://124.220.158.71:8000',
            ws: true,
            changeOrigin: true,
        },
		'/api': {
			target: 'http://localhost:8080',
			ws: true,
			changeOrigin: true,
			// rewrite:(path) => path.replace(/^\/api/, '')
		},
        '/plugins/info': {
            target: 'https://plugin.aliceblog.co',
            ws: true,
            changeOrigin: true,
            rewrite:(path) => path.replace(/^\/plugins\/info/, '')
        }
      },
    },
 })
