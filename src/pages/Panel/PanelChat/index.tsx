import { useEffect, useState } from "react"
import { useUserStore } from "../../../store/userStore"
import styles from "./panel-chat.module.css"
import Cookies from "js-cookie"
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../../firebase/firebase"
import { ThreeDots } from "react-loader-spinner"
import { useChatStore } from "../../../store/chatStore"

type UsersProps = {
  name: string;
  uid: string;
  email: string;
  photoURL: string;
}


export function PanelChat() {
  // const photoURL = Cookies.get("photoURL")
  const {currentUser} = useUserStore()
  const {changeChat} = useChatStore()
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if(currentUser?.uid) {
      const unSub = onSnapshot(doc(db, "userchats", currentUser?.uid), async (res) => {
        const data = res.data()
        const items = data.chats
  
        const promises = items.map( async (item) => {
          const userDocRef = doc(db, "users", item.receiverId)
          const userDocSnap = await getDoc(userDocRef)
  
          const user = userDocSnap.data()
          return {...item, user}
        })
        const chatData = await Promise.all(promises)
        setChats(chatData?.sort((a,b) => b.updatedAt - a.updatedAt))
        setLoading(false)
      })
  
      return () => {
        unSub()
        
      }

    }
  }, [currentUser?.uid])

  useEffect(() => {
    async function addUser() {

      try {
        const userRef = collection(db, "users");
        // const querySnapshot = await getDocs(userRef);
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
        // const userRef = collection(db, "users")
        // const q = query(userRef, where("name", "==", ""))
        // const querySnapshot = await getDocs(q)
        // if(!querySnapshot.empty) {
        //   console.log("QUERY1", querySnapshot.docs[0].data())
        // }
        // console.log("QUERY", querySnapshot)
      } catch (err) {
        console.log(err)
      }
    }
    return () => {
      addUser()
    }
  }, [])

  async function handleSelect(chat) {
    const userChats = chats.map(item => {
      const {user, ...rest} = item;
      return rest
    })
    const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId)
    userChats[chatIndex].isSeen = true
    const userChatsRef = doc(db, "userchats", currentUser.uid)
    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      })
      changeChat(chat.chatId, chat.user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chat</h1>
      <div className={styles.content}>
        <div className={styles.subgroup}>
          <span className={styles.group}>
            <h2 className={styles.subtitle}>Contacts</h2>
            <button className={styles.newGroup}>New Contact</button>
          </span>
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
                chats.map((chat) => (
                  <button key={chat?.chatId} className={styles.containerContacts} onClick={() => handleSelect(chat)}>
                    <img src={chat?.user.photoURL} className={styles.photo} />
                    <span className={styles.wrapperContacts}>
                      <h3 className={styles.name}>{chat?.user.name}</h3>
                      <p className={styles.message}>{chat?.lastMessage}</p>
                    </span>
                    <span className={styles.infoMessages}>
                      <p className={styles.time}>4m</p>
                      <span className={styles.quantity}>3</span>
                    </span>
                  </button>
                ))
              ) 
            }
          </div>

        </div>
        <div className={styles.subgroup}>
          <span className={styles.group}>
            <h2 className={styles.subtitle}>Grupos</h2>
            <button className={styles.newGroup}>New group</button>
          </span>
          <div className={styles.contacts}>
            <button className={styles.containerContacts}>
              <img src="https://images.unsplash.com/photo-1710432157519-e437027d2e8f?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className={styles.photo} />
              <span className={styles.wrapperContacts}>
                <h3 className={styles.name}>João</h3>
                <p className={styles.message}>Olá, como você está? tudo bem com você?</p>
              </span>
              <span className={styles.infoMessages}>
                <p className={styles.time}>4m</p>
                <span className={styles.quantity}>3</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}