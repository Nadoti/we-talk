import { useEffect, useRef, useState } from "react";
import { Ban, Cog, Send, Video } from "lucide-react"
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import styles from "./chat.module.css"
import { db } from "../../../firebase/firebase";
import { useChatStore } from "../../../store/chatStore";
import { useUserStore } from "../../../store/userStore";
import { v4 as uuidv4 } from 'uuid';


export function Chat() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { chatId, user, changeBlocked, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
  const { currentUser } = useUserStore()
  const scroll = useRef<HTMLSpanElement>(null);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    // console.log("chatId", chatId)
    // console.log("currentUser.id", currentUser.uid)
    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        id: uuidv4(),
        senderId: currentUser.uid,
        text: message,
        createdAt: new Date(),
      })
    })
    const userIds = [currentUser.uid, user.uid]
    userIds.forEach(async (id) => {
      const userChatsRef = doc(db, "userchats", id)
      const userChatsSnapshot = await getDoc(userChatsRef)
      
      if(userChatsSnapshot.exists()) {
        const userChatsData = userChatsSnapshot.data()
        const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)
        userChatsData.chats[chatIndex].lastMessage = message
        userChatsData.chats[chatIndex].isSeen = id === currentUser.uid ? true : false
        userChatsData.chats[chatIndex].updatedAt = Date.now()
  
        await updateDoc(userChatsRef, {
          chats: userChatsData.chats,
        })
      }
    })

    // const { uid, displayName, photoURL } = auth.currentUser;
    // await addDoc(collection(db, "groupChats"), {
    //   text: message,
    //   name: displayName,
    //   avatar: photoURL,
    //   createdAt: serverTimestamp(),
    //   uid,
    // });
    setMessage("");
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if(chatId) {
      const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
        setChats(res.data())
      })
  
      return () => {
        unSub()
      }

    }
  }, [chatId])

  async function handleBlockUser() {
    if(!user) return;
    const userDocRef = doc(db, "users", currentUser.uid)
    console.log("userDocRef", userDocRef)
    console.log("user", user)
    await updateDoc(userDocRef, {
      blocked: isReceiverBlocked ? arrayRemove(user.uid) : arrayUnion(user.uid)
    })
    changeBlocked()
  }
  
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.user}>
          <img src={user?.photoURL} className={styles.photo} />
          <p className={styles.name}>{user?.name}</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.buttonAction}>
            <Video />
          </button>
          <button className={styles.buttonAction}>
            <Cog />
          </button>
          <button className={`${isReceiverBlocked  ? styles.buttonActionBlocked : styles.buttonAction }`} onClick={handleBlockUser}>
            <Ban />
          </button>
        </div>
      </header>
      <div className={styles.chatContainer}>
        {chats?.messages?.map((listMessage) => (
          listMessage?.senderId === currentUser?.uid 
          ? (
            <div className={styles.myChat} key={listMessage.id}>
              <div className={styles.myMessageContainer}>
                <p className={styles.myMessage}>{listMessage?.text}</p>
              </div>
            </div>
          )
          : (
            <div className={styles.chatFriend} key={listMessage.id}>
              {/* <img src="https://images.unsplash.com/photo-1710432157519-e437027d2e8f?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className={styles.photoUser} /> */}
              <div className={styles.friendMessageContainer}>
                <p className={styles.message}>{listMessage?.text}</p>
                <p className={styles.message}>{listMessage?.name}</p>
              </div>
            </div>
          )
        ))}
        <span ref={scroll}></span>
      </div>
      <form className={styles.form} onSubmit={sendMessage}>
        <input className={styles.inputChat} type="text" placeholder="Write a text" value={message} onChange={({ target }) => setMessage(target.value)} />
        <button type="submit" className={styles.send}><Send />Send</button>
      </form>
    </section>
  )
}