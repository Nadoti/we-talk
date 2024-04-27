import { useEffect, useState } from "react";
import styles from "./panel-all-users.module.css"
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useUserStore } from "../../../store/userStore";
import { ThreeDots } from "react-loader-spinner"

type UsersProps = {
  name: string;
  uid: string;
  email: string;
  photoURL: string;
}


export function PanelAllUsers() {
  const [users, setUsers] = useState<UsersProps[]>([])
  const [loading, setLoading] = useState(false)
  const { currentUser } = useUserStore()

  useEffect(() => {
    async function addUser() {
      setLoading(true)
      try {
        const userRef = collection(db, "users");
        const querySnapshot = await getDocs(query(userRef, where("uid", "!=", currentUser.uid)));
        const list: UsersProps[] = [];
  
        querySnapshot.forEach((doc) => {
          list.push(doc.data() as UsersProps);
        });
  
        list.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        setUsers(list)

      } finally {
        setLoading(false)
      }
    }
    return () => {
      addUser()
    }
  }, [])

  async function addUser(uid: string) {
    const chatRef = collection(db, "chats")
    const userChatsRef = collection(db, "userchats")

    const newChatRef = doc(chatRef)

    await setDoc(newChatRef, {
      createdAt: serverTimestamp(),
      messages: [],
    })
    await updateDoc(doc(userChatsRef, uid), {
      chats: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: currentUser.uid,
        updatedAt: Date.now()
      })
    })
    await updateDoc(doc(userChatsRef, currentUser.uid), {
      chats: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: uid,
        updatedAt: Date.now()
      })
    })
    
  }
  
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Users</h1>
        <div className={styles.contacts}>
          {loading 
            ? (
              <div className={styles.loading}>
                <ThreeDots
                  visible={true}
                  height="60"
                  width="60"
                  color="#6B33D9"
                  radius="9"
                  ariaLabel="three-dots-loading"
                />
              </div>
            ) 
            : (
              users?.map((user) => (
                <button className={styles.containerContacts} key={user.uid} onClick={() => addUser(user.uid)}>
                  <img src={user.photoURL} className={styles.photo} />
                  <h3 className={styles.name}>{user.name}</h3>
                </button>
              ))
            )}
        </div>
    </section>
  )
}