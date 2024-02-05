// vite.config.js
import react from "file:///C:/beat_rhino_studio/yut_game_2/yut-game/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import glsl from "file:///C:/beat_rhino_studio/yut_game_2/yut-game/client/node_modules/vite-plugin-glsl/src/index.js";
import fs from "fs/promises";
var isCodeSandbox = "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;
var vite_config_default = {
  plugins: [
    react(),
    glsl()
  ],
  root: "src/",
  publicDir: "../public/",
  base: "./",
  server: {
    host: true,
    open: !isCodeSandbox
    // Open if it's not a CodeSandbox
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad(
              { filter: /src\\.*\.js$/ },
              async (args) => ({
                loader: "jsx",
                contents: await fs.readFile(args.path, "utf8")
              })
            );
          }
        }
      ]
    }
  }
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxiZWF0X3JoaW5vX3N0dWRpb1xcXFx5dXRfZ2FtZV8yXFxcXHl1dC1nYW1lXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcYmVhdF9yaGlub19zdHVkaW9cXFxceXV0X2dhbWVfMlxcXFx5dXQtZ2FtZVxcXFxjbGllbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L2JlYXRfcmhpbm9fc3R1ZGlvL3l1dF9nYW1lXzIveXV0LWdhbWUvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgZ2xzbCBmcm9tICd2aXRlLXBsdWdpbi1nbHNsJ1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMvcHJvbWlzZXMnO1xyXG5cclxuY29uc3QgaXNDb2RlU2FuZGJveCA9ICdTQU5EQk9YX1VSTCcgaW4gcHJvY2Vzcy5lbnYgfHwgJ0NPREVTQU5EQk9YX0hPU1QnIGluIHByb2Nlc3MuZW52XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBwbHVnaW5zOlxyXG4gICAgW1xyXG4gICAgICAgIHJlYWN0KCksXHJcbiAgICAgICAgZ2xzbCgpXHJcbiAgICBdLFxyXG4gICAgcm9vdDogJ3NyYy8nLFxyXG4gICAgcHVibGljRGlyOiBcIi4uL3B1YmxpYy9cIixcclxuICAgIGJhc2U6ICcuLycsXHJcbiAgICBzZXJ2ZXI6XHJcbiAgICB7XHJcbiAgICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgICBvcGVuOiAhaXNDb2RlU2FuZGJveCAvLyBPcGVuIGlmIGl0J3Mgbm90IGEgQ29kZVNhbmRib3hcclxuICAgIH0sXHJcbiAgICBlc2J1aWxkOiB7XHJcbiAgICAgICAgbG9hZGVyOiAnanN4JyxcclxuICAgICAgICBpbmNsdWRlOiAvc3JjXFwvLipcXC5qc3g/JC8sXHJcbiAgICAgICAgZXhjbHVkZTogW10sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6XHJcbiAgICB7XHJcbiAgICAgICAgb3V0RGlyOiAnLi4vZGlzdCcsXHJcbiAgICAgICAgZW1wdHlPdXREaXI6IHRydWUsXHJcbiAgICAgICAgc291cmNlbWFwOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgICAgZXNidWlsZE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdsb2FkLWpzLWZpbGVzLWFzLWpzeCcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dXAoYnVpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGQub25Mb2FkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmaWx0ZXI6IC9zcmNcXFxcLipcXC5qcyQvIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYyAoYXJncykgPT4gKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkZXI6ICdqc3gnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzOiBhd2FpdCBmcy5yZWFkRmlsZShhcmdzLnBhdGgsICd1dGY4JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VSxPQUFPLFdBQVc7QUFDM1YsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sUUFBUTtBQUVmLElBQU0sZ0JBQWdCLGlCQUFpQixRQUFRLE9BQU8sc0JBQXNCLFFBQVE7QUFFcEYsSUFBTyxzQkFBUTtBQUFBLEVBQ1gsU0FDQTtBQUFBLElBQ0ksTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLEVBQ1Q7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLFdBQVc7QUFBQSxFQUNYLE1BQU07QUFBQSxFQUNOLFFBQ0E7QUFBQSxJQUNJLE1BQU07QUFBQSxJQUNOLE1BQU0sQ0FBQztBQUFBO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLElBQ1QsU0FBUyxDQUFDO0FBQUEsRUFDZDtBQUFBLEVBQ0EsT0FDQTtBQUFBLElBQ0ksUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLEVBQ2Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLE1BQ1osU0FBUztBQUFBLFFBQ0w7QUFBQSxVQUNJLE1BQU07QUFBQSxVQUNOLE1BQU0sT0FBTztBQUNULGtCQUFNO0FBQUEsY0FDRixFQUFFLFFBQVEsZUFBZTtBQUFBLGNBQ3pCLE9BQU8sVUFBVTtBQUFBLGdCQUNiLFFBQVE7QUFBQSxnQkFDUixVQUFVLE1BQU0sR0FBRyxTQUFTLEtBQUssTUFBTSxNQUFNO0FBQUEsY0FDakQ7QUFBQSxZQUNKO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSjsiLAogICJuYW1lcyI6IFtdCn0K
