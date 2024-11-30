import { Config } from 'release-it'

const config: Config = {
  npm: {
    publish: false,
  },
  github: {
    release: true,
    assets: ['bob-plugin-jisho-*.bobplugin'],
    autoGenerate: true,
  },
  hooks: {
    'before:github:release': 'pnpm run bundle',
  },
}

export default config
