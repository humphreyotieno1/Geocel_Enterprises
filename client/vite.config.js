import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT) || 5173,  // Use the port provided by the environment or default to 5173
    host: '0.0.0.0',  // Ensure the server listens on all available network interfaces
  },
});
