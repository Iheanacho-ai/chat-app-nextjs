import { useEffect, useState } from 'react';
import { client} from '../init' 
import { Databases } from 'appwrite';

const Chat = () => {
  const [message, setMessages] = useState("");
  const [databaseMessages, setDatabaseMessages] = useState(["hey"])
  const databases = new Databases(client, '62d985ab68e0e4b60293');
  
  // useEffect(() => {
  //   try {
  //     client.subscribe('databases.62d985ab68e0e4b60293.collections.62d985b121bca976f271.documents', response => {
  //       console.log(response);
  //     }); 
  //     // setDatabaseMessages() 
  //   } catch (error) {
  //     console.log(reportError)
  //   }
  // }, [])

  const listMessages = async () => {
    const promise = await databases.listDocuments('62d985b121bca976f271');
    console.log(promise)
    promise.documents.map((document) => setDatabaseMessages(prevArray => [...prevArray, document.message]))
  }

  useEffect(()=> {
    console.log(databaseMessages)
  }, [databaseMessages])


  const sendMessage = async () => {
    try {
      await databases.createDocument('62d985b121bca976f271', 'unique()', {
        "message": message
      });
      alert('message sent')
      setMessages("")
      listMessages()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='chat'>
      <div className='user-chat'>
        <div className="user-chat-header">USER</div>
        <div className='messages'>
          {
            databaseMessages.map((databaseMessage)=> (
              <div className="user-message">{databaseMessage}</div>
            ))
          }
        </div>
        <div className='input-area'>
          <input type="text" className='message-input' value={message} onChange={(e) => setMessages(e.target.value)}/>
          <button className='send' type='button' onClick={sendMessage}>send</button>
        </div>
      </div>
    </div>
  ) 
};

export default Chat;