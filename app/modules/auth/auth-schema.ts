import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Must be of 6 characters or more" }),
});

export type LoginRequestType = z.infer<typeof loginSchema>;
