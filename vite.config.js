import { copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Client-side routes (see App.jsx). GitHub Pages only serves real files, so a
// direct visit to /about would 404. Copying index.html into each route's
// folder makes those URLs real pages; 404.html catches anything else.
const ROUTES = ['about', 'projects', 'experience']

const githubPagesRoutes = () => {
  let outDir
  return {
    name: 'github-pages-routes',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html')
      for (const route of ROUTES) {
        mkdirSync(resolve(outDir, route), { recursive: true })
        copyFileSync(index, resolve(outDir, route, 'index.html'))
      }
      copyFileSync(index, resolve(outDir, '404.html'))
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), githubPagesRoutes()],
  // Absolute asset URLs so pages served from /about/ etc. still load /assets/...
  base: '/',
})
