import { z } from "zod"

export const formSchema = z.object({
    email: z
        .string()
        .nonempty("E-mail is required")
        .email("Please enter a valid e-mail address"),

    password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long"),
})
