import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const legalCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    updatedAt: z.string().optional(),
  }),
});

const projectSchema = ({ image }: any) => z.object({
  title: z.string(),
  description: z.string(),
  coverImage: image().optional(),
  span: z.number().default(1),
  featured: z.boolean().default(false),
  category: z.enum(['Apps', 'Hardware', 'Music']),
  // App specific (e.g. icon for Bento Card)
  icon: z.string().optional(),
  appStoreLink: z.string().optional(),
  playStoreLink: z.string().optional(),
});

const appsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/apps" }),
  schema: projectSchema,
});

const hardwareCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/hardware" }),
  schema: projectSchema,
});

const musicCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/music" }),
  schema: projectSchema,
});

export const collections = {
  'legal': legalCollection,
  'apps': appsCollection,
  'hardware': hardwareCollection,
  'music': musicCollection,
};
