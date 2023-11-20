import { z } from 'zod';

export const IJobDetailsStartSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  companyName: z.string().min(1, { message: 'Company Name is required' }),
  industry: z.string().min(1, { message: 'Industry is required' }),
  location: z.string(),
  remoteType: z.string(),
});

export type IJobDetailsStart = z.infer<typeof IJobDetailsStartSchema>;

export enum Apply {
  QuickApply = 'Apply Now',
  ExternalApply = 'External Apply',
}

export const IJobDetailsEndSchema = z.object({
  minExperience: z.number(),
  maxExperience: z.number(),
  minSalary: z.number(),
  maxSalary: z.number(),
  totalEmployee: z.string(),
  apply: z.nativeEnum(Apply, {
    invalid_type_error: `Select ${Apply.QuickApply} or ${Apply.ExternalApply} option`,
  }),
});

export type IJobDetailsEnd = z.infer<typeof IJobDetailsEndSchema>;

export const IJobSchema = z
  .intersection(IJobDetailsStartSchema, IJobDetailsEndSchema)
  .and(
    z.object({
      id: z.string(),
    }),
  );

export type IJob = z.infer<typeof IJobSchema> & { id: string };
