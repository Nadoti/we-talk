import { z } from "zod";
import { loginFormSchema } from "./loginFormSchema";


export type FormLoginProps = z.infer<typeof loginFormSchema>