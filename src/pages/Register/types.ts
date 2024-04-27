import { z } from "zod";
import { registerFormSchema } from "./registerFormSchema";


export type FormRegisterProps = z.infer<typeof registerFormSchema>