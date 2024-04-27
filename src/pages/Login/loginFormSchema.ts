import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email("E-mail inválido")
    .min(1, "Campo obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve conter no mínimo 6 caracteres"),
})