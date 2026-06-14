import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3002,
      strictPort: true,
      // Allow access via the nginx-mapped subdomain.
      allowedHosts: ['chef-v-game.seekn.site'],
      // Make HMR use the public hostname instead of localhost:3000 behind nginx.
      hmr:
        process.env.DISABLE_HMR === 'true'
          ? false
          : {
              clientHost: 'chef-v-game.seekn.site',
              clientPort: 80,
            },
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
