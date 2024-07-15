import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // legacy({
    //   targets: ['chrome < 60', 'edge < 15'],
    //   renderLegacyChunks: true,
    //   polyfills: [
    //     'es.symbol',
    //     'es.promise',
    //     'es.promise.finally',
    //     'es/map',
    //     'es/set',
    //     'es.array.filter',
    //     'es.array.for-each',
    //     'es.array.flat-map',
    //     'es.object.define-properties',
    //     'es.object.define-property',
    //     'es.object.get-own-property-descriptor',
    //     'es.object.get-own-property-descriptors',
    //     'es.object.keys',
    //     'es.object.to-string',
    //     'web.dom-collections.for-each',
    //     'esnext.global-this',
    //     'esnext.string.match-all'
    //   ]

    // }),
  ],
  resolve: {
    alias: [{ find: "@/", replacement: "/src/" }],
  },

  base: "./",
  build: {
    target: "es2015", // 或其他目标，根据你的兼容性需求
    outDir: "videoMapControlPage",
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://192.168.44.63:5173/", // 后端服务器地址
        changeOrigin: true, // 改变请求的origin头，为true时，服务器收到的请求头中的host为target的地址
        rewrite: (path) => path.replace(/^\/api/, ""), // 移除请求路径中的'/api'前缀
      },
    },
  },
});
