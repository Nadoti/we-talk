import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginFormSchema } from "./loginFormSchema"
import { FormLoginProps } from "./types"
import { toast } from "sonner"
import { auth } from "../../firebase/firebase"
import { login } from "../../services/login"
// import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


export function useLoginModel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const { handleSubmit, register, formState: { errors }} = useForm<FormLoginProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(loginFormSchema)
  })

  async function handleLogin(form:FormLoginProps) {
    setLoading(true)
    const response = login({auth, email: form.email, password: form.password})
    
    toast.promise(response, {
      loading: 'Authenticando...',
      success: (data) => {
        console.log(data)
        // Cookies.set("name", data?.displayName)
        // Cookies.set("email", data?.email)
        // Cookies.set("uid", data?.uid)
        // Cookies.set("photoURL", data?.photoURL)
        navigate("/panel/chat")
        return `Usuário autenticado com sucesso`;
      },
      error: () => {
        return `E-mail ou senha inválidos`;
      },
      finally: () => {
        setLoading(false)
        return
      },
    });
    
  }


  return {handleSubmit, handleLogin, register, errors, loading}

}