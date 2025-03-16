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
      dts({
        include: isApp ? ['src/**/*.ts', 'src/**/*.tsx'] : ['src/lib/**/*.ts', 'src/lib/**/*.tsx', 'src/components/PayMyGas/**/*.ts', 'src/components/PayMyGas/**/*.tsx'],
        entryRoot: 'src',
        outDir: isApp ? 'dist-app' : 'dist'
      })
    ],
    build: {
      emptyOutDir: false,
      ...(isApp ? {
        outDir: 'dist-app',
      } : {
        lib: {
          entry: 'src/lib/index.ts',
          name: 'PayMyGas',
          fileName: (format) => `index.${format === 'es' ? 'js' : format}`,
          formats: ['es', 'cjs']
        },
        copyPublicDir: false,
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
