import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    main: './src/index.ts',
  },
  format: 'cjs',
  outExtension() {
    return {
      js: '.js',
    }
  },
  outDir: 'dist.bobplugin',
  clean: true,
  publicDir: 'public',
})
