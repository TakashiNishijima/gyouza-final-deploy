import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'zxcqyvgo',
    dataset:  'production'
  },
  // ← "https://" や ".sanity.studio" は書かない！
  studioHost: 'gyouza-blog-studio'   // 好きな英数字スラッグ
})