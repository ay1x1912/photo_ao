import { z } from "zod";
export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Minimum 2 characters are required" })
      .max(20, { message: "Maximum of 20 characters are allowed" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 6 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" }),
  })

export const LoginSchema = z.object({
    email: z
    .string()
    .email({message: "Invalid email"})
    .min(1, {message: "Email is required"}),
    password: z
    .string()
    .min(8, {message: "Password must be at least 8 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"}),
})

export const TrainModel=z.object({
  name:z.string(),
  type:z.enum(['Man','Women','Other']),
  age:z.number(),
  ethnicity:z.enum(['White','Black','Asian_American','East_Asian','South_East_Asian','South_Asian','Middle_East','Pacific','Hispanic']),
   eyeColor:z.enum(['Brown','Blue','Hazel_Green','Gray']),
   zipUrl:z.string()

})
export const GenerateImageFromPack=z.object({
  modelId:z.string(),
  packId:z.string()
})

export const GenerateImageFromPrompt=z.object({
  prompt:z.string(),
  modelId:z.string(),
  num:z.number()
})