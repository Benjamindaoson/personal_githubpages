import { z } from "zod";

export const AudienceSchema = z.enum(["developer-student", "teacher"]);

export const CourseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  language: z.string().min(1),
  audiences: z.array(AudienceSchema).min(1),
  modules: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1)
    })
  )
});

export const UnitSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  module: z.string().min(1),
  audience: z.array(AudienceSchema).min(1),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  status: z.enum(["draft", "ready", "updating"]),
  estimated_time: z.string().min(1),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  product: z.object({
    stage: z.enum(["foundation", "builder", "capstone"]),
    formats: z
      .array(
        z.enum(["lesson", "python-lab", "js-lab", "project", "teacher-guide", "quiz", "rubric", "visual"])
      )
      .min(1),
    primary_cta: z.string().min(1),
    secondary_cta: z.string().min(1)
  }),
  prerequisites: z.array(z.string()),
  learning_objectives: z.array(z.string()).min(1),
  assets: z.array(z.string()).default([]),
  assessments: z
    .object({
      quiz: z.string().optional(),
      rubric: z.string().optional()
    })
    .optional(),
  agent_use: z.object({
    retrievable: z.boolean(),
    chunk_strategy: z.string().min(1)
  })
});

export const AssetSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    "diagram",
    "image",
    "video",
    "audio",
    "slides",
    "notebook",
    "dataset",
    "code",
    "prompt",
    "interactive",
    "assessment"
  ]),
  format: z.string().min(1),
  title: z.string().min(1),
  source: z.string().min(1),
  pedagogical_role: z.string().min(1),
  license: z.string().min(1),
  presentation: z.object({
    embed: z.boolean(),
    downloadable: z.boolean()
  }),
  machine: z.object({
    rag_index: z.object({
      include: z.boolean(),
      extraction: z.string().min(1)
    }),
    alt_text: z.string().min(1)
  })
});

export const AssetsFileSchema = z.object({
  assets: z.array(AssetSchema)
});

export type Course = z.infer<typeof CourseSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Asset = z.infer<typeof AssetSchema>;
