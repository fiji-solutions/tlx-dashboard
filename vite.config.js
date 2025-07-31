import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    mui: ['@mui/material', '@mui/icons-material', '@mui/x-data-grid', '@mui/x-date-pickers'],
                    charts: ['chart.js', 'react-chartjs-2', 'chartjs-adapter-date-fns']
                }
            }
        }
    },
    server: {
        port: 3000,
        open: true
    },
    preview: {
        port: 3000
    }
})
