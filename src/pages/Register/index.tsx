import { useRegisterModel } from "./model";
import { RegisterView } from "./view";




export function Register() {
  const registerModel = useRegisterModel()
  return (
    <RegisterView 
      {...registerModel}
    />
  )
}