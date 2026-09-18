import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const legalCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    updatedAt: z.string().optional(),
  }),
});

export const collections = {
  'legal': legalCollection,
};
