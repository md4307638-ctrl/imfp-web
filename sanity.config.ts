import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas' // Chemin correct dans ce projet Next.js

export default defineConfig({
  name: 'default',
  title: 'IMFP - Studio Sanity',

  projectId: 'hz6qqzbu',
  dataset: 'production',
  basePath: '/studio',

  plugins: [
    structureTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
