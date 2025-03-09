import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isApp = mode === 'app';

  return {
    plugins: [
      react(),
      tailwindcss(),
      !isApp && dts({
        include: ['src'],
        entryRoot: 'src',
        outDir: 'dist'
      })
    ].filter(Boolean),
    build: {
      ...(isApp ? {
        outDir: 'dist-app',
      } : {
        lib: {
          entry: 'src/lib/index.ts',
          name: 'PayMyGas',
          fileName: (format) => `index.${format === 'es' ? 'js' : format}`,
          formats: ['es', 'cjs']
        },
        rollupOptions: {
          external: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            '@rainbow-me/rainbowkit',
            'wagmi',
            'viem',
            '@tanstack/react-query'
          ],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'jsxRuntime',
              '@rainbow-me/rainbowkit': 'RainbowKit',
              'wagmi': 'wagmi',
              'viem': 'viem',
              '@tanstack/react-query': 'reactQuery'
            }
          }
        }
      })
    }
  }
})
