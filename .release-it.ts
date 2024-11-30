import { Config } from 'release-it'

const config: Config = {
  npm: {
    publish: false,
  },
  github: {
    release: true,
    assets: ['bob-plugin-jisho-*.bobplugin'],
    autoGenerate: true,
    releaseNotes(context: any) {
      // Remove the first, redundant line with version and date.
      return context.changelog.split('\n').slice(1).join('\n')
    },
  },
  hooks: {
    'before:github:release': 'pnpm run bundle',
  },
}

export default config
