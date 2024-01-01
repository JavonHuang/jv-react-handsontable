// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import { resolve } from 'path'
import typescript from '@rollup/plugin-typescript'


export default defineConfig({
  server:{
    host:'0.0.0.0',//解决vite use--host to expose
    port:8080,//配置端口
    open:false,//配置默认打开浏览器
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@':resolve('src')
    },
  },
  //全局引入
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  },
  build: {
    // 输出文件夹
    outDir: 'dist',
    lib: {
      // 组件库源码的入口文件
      entry: resolve('./package/index.tsx'),
      // 组件库名称
      name: 'jv-react-handsontable',
      // 文件名称, 打包结果举例: suemor.cjs
      fileName: 'jv-react-handsontable',
      // 打包格式
      formats: ["es", "umd", "cjs"],
    },
    rollupOptions: {
      //排除不相关的依赖
      external: ['react', 'react-dom','antd'],
      output: {
        chunkFileNames: chunkInfo => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
          return `js/${fileName}/[name].[hash].js`
        }
      }
    },
  },
  plugins: [
    react(),
    typescript({
      target: 'es6',
      rootDir: resolve('./package/'),
      declaration: true,
      declarationDir: resolve('dist/lib/'),
      exclude: resolve('node_modules/**'),
      allowSyntheticDefaultImports: true,
    })
  ],
})
