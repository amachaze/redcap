import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"

const addOnsID = fileURLToPath(new URL('../../add-ons/main.js', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env': {}
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main-prod.js'),
      name: 'MyComponent',
      // the proper extensions will be added
      fileName: 'my-component'
    },
    rollupOptions: {
      manualChunks: undefined,
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        addOnsID,
        // 'vue'
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          [addOnsID]: 'addOns',
          // vue: 'vue'
        },
      }
    },
    sourcemap: false,
    minify: true,
    server: {
      proxy: {
        // string shorthand
        '/foo': 'http://localhost:4567',
        // with options
        '/api': {
          target: "https://redcap.test/API_PROXY/index.php",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    }
  }
})
