import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Proxy API calls in dev so `/api/*` works on localhost
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // Disable source maps in production
    sourcemap: false,
    
    // Minify and obfuscate code
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true, // Remove debugger statements
      },
      mangle: {
        // Mangle variable names to make code harder to read
        toplevel: true,
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    
    // Split code into chunks (makes it harder to understand the full codebase)
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'animation': ['framer-motion'],
        },
      },
    },
  },
})
