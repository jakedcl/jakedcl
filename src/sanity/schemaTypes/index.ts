import { type SchemaTypeDefinition } from 'sanity'

import { projectType } from './project'
import { postType } from './post'
import { settingsType } from './settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, postType, settingsType],
}
