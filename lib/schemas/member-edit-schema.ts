import { z } from 'zod';

export const memberEditSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is Required',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  city: z.string().min(1, {
    message: 'City is required',
  }),
  country: z.string().min(1, {
    message: 'Country is required',
  }),
});

export const memberSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is Required',
  }),
  gender: z.string().min(1, {
    message: 'Gender is Required',
  }),
  dateOfBirth: z
    .date({
      required_error: 'Date of Birth is required',
      invalid_type_error: 'Date must be a valid date',
    })
    .refine((date) => date < new Date(), {
      message: 'Date of Birth must be in the past',
    }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  city: z.string().min(1, {
    message: 'City is required',
  }),
  country: z.string().min(1, {
    message: 'Country is required',
  }),
  images: z.optional(z.string().min(1)),
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
export type MemberSchema = z.infer<typeof memberSchema>;
