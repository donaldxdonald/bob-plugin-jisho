import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { cwd } from 'process'
import { build, Options } from 'tsup'
import tsupConfig from '../tsup.config'

async function buildMain() {
  console.log('Build started')
  const infoPath = join(cwd(), 'public', 'info.json')
  const [pkgStr, infoStr] = await Promise.all([
    readFile(join(cwd(), 'package.json'), 'utf-8'),
    readFile(infoPath, 'utf-8'),
  ])
  if (!pkgStr) {
    throw new Error('package.json not found')
  }
  const pkg = JSON.parse(pkgStr)
  const info = JSON.parse(infoStr)

  console.log('Detected package.json version:', pkg.version)

  info.version = pkg.version
  const infoStrNew = JSON.stringify(info, null, 2)
  await writeFile(infoPath, infoStrNew, 'utf-8')

  // tsup build
  await build(tsupConfig as Options)

  console.log('Build completed')
}

buildMain()
