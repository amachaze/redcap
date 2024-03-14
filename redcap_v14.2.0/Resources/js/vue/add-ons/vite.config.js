// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"

import { fileURLToPath, URL } from 'node:url'

const RcUtilsID = fileURLToPath(new URL('../../rc-utils/index.js', import.meta.url))

export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  define: {
    'process.env': {}
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'main.js'),
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'my-lib'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        // 'vue',
        // RcUtilsID
      ],
      output: {
        manualChunks: undefined,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          // vue: 'vue',
          // [RcUtilsID]: 'RcUtils'
        }
      }
    }
  }
})