import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    main: './src/index.ts',
  },
  format: 'cjs',
  outDir: 'dist.bobplugin',
  clean: true,
  publicDir: 'public',
})
