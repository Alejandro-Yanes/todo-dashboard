import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Must be an email" })
    .max(20, { message: "Email is too long" }),
  password: z
    .string()
    .min(4, { message: "Password is too short" })
    .max(12, { message: "Password is too long" }),
});

export const signUpSchema = loginSchema.extend({
  username: z
    .string()
    .min(4, { message: "Username is too short" })
    .max(12, { message: "Username is too long" }),
  name: z
    .string()
    .min(4, { message: "Name is too short" })
    .max(12, { message: "Name is too long" }),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
