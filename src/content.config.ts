import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 文档：src/content/docs/{zh,en}/<slug>.md，两种语言同名文件一一对应（lib/docs.ts 在构建时校验）。
 * id 形如 zh/install。
 */
const docs = defineCollection({
  loader: glob({ pattern: '{zh,en}/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    group: z.enum(['start', 'concepts', 'guides', 'reference']),
    order: z.number().int(),
  }),
});

export const collections = { docs };
