import { signInWithEmailAndPassword } from "firebase/auth"




export async function login({auth, email, password}) {

  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    return userCredential.user
  })
}