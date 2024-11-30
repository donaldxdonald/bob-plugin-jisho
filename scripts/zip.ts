import { existsSync } from 'fs'
import { join } from 'path'
import { cwd } from 'process'
import { readFile, writeFile } from 'fs/promises'
import crypto from 'node:crypto'
import AdmZip from 'adm-zip'

type VersionItem = {
  version: string
  desc: string
  sha256: string
  url: string
  minBobVersion: string
  timestamp: number
}

async function main() {
  console.log('Zip started')
  const distDir = join(cwd(), 'dist.bobplugin')

  if (!existsSync(distDir)) {
    throw new Error('dist.bobplugin not found. Do you run `pnpm build` first?')
  }

  const infoJSON = await readFile(join(distDir, 'info.json'), 'utf-8')
  const { version } = JSON.parse(infoJSON) as { version: string }
  const fileName = `bob-plugin-jisho-${version}.bobplugin`

  const zip = new AdmZip()
  zip.addLocalFolder(distDir)
  zip.writeZip(fileName)
  console.log(`${fileName} created`)

  const file = await readFile(fileName)
  const appCastPath = join(cwd(), 'appcast.json')
  const appCastStr = await readFile(appCastPath, 'utf-8')
  const appCast = JSON.parse(appCastStr) as { versions: VersionItem[] }

  appCast.versions.unshift({
    version,
    desc: `v${version}`,
    sha256: crypto.createHash('sha256').update(file).digest('hex'),
    url: fileName,
    minBobVersion: '1.8.0',
    timestamp: Date.now(),
  })

  await writeFile(appCastPath, JSON.stringify(appCast, null, 2), 'utf-8')
  console.log('Appcast updated')
}

main()
