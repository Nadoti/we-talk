import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { toast } from "sonner"
import { FormRegisterProps } from "./types"
import { auth, db, storage } from "../../firebase/firebase"
import { registerFormSchema } from "./registerFormSchema"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"
import { ItalicIcon } from "lucide-react"
// import { notification } from "../../utils/notification"

export function useRegisterModel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const { handleSubmit, register, formState: { errors }} = useForm<FormRegisterProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(registerFormSchema)
  })

  async function handleRegister(form:FormRegisterProps) {
    console.log(form.file)
    setLoading(true)
    const date = new Date().getTime();
    const storageRef = ref(storage, `${form.name + date}`)
    
    // uploadBytes(storageRef, form.file).then((snapshot) => {
    //   console.log('Uploaded a blob or file!');
    // });
    
    const register = createUserWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential) => {
      // if(auth.currentUser) updateProfile(auth.currentUser, { displayName: form.name  })
      uploadBytesResumable(storageRef, form.file[0]).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          //Update profile
          await updateProfile(userCredential.user, {
            displayName: form.name,
            photoURL: downloadURL,
          });
          //create user on firestore
          await setDoc(doc(db, "users", userCredential.user.uid), {
            id: userCredential.user.uid,
            name: form.name,
            email: form.email,
            photoURL: downloadURL,
            blocked: [],
          });

          //create empty user chats on firestore
          await setDoc(doc(db, "userchats", userCredential.user.uid), {
            chats: []
          });
          // navigate("/");
        
          setLoading(false);
          
        });
      });
      return userCredential.user
    })
 
    toast.promise(register, {
      loading: 'Registrando...',
      success: () => {
        navigate("/user/login")
        return `Usuário criado com sucesso!`;
      },
      error: (data) => {
        if (data?.code === "auth/email-already-in-use") {
          return "O E-mail já está em uso";
        }
        return "Error"
      },
      finally: () => {
        setLoading(false)
        return
      }
    });
  }
  return {handleSubmit, handleRegister, register, errors, loading}
}