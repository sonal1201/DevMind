import { z } from "zod"

export const userValildation = z.object({
    username: z.string().min(1,"username cannot be empty").max(8,"username must be less than 8 char"),
    email: z.string().email(),
    password: z.string().min(1,"password can be empty")
})

export type userSchemaType = z.infer<typeof userValildation>

