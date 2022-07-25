import { useState } from 'react';
import { client} from '../init' 
import { Databases } from 'appwrite';

const Cryptr = require('cryptr');


const Chat = () => {
  const [message, setMessages] = useState("");
  const [databaseMessages, setDatabaseMessages] = useState([])
  
  const cryptr = new Cryptr(process.env.NEXT_PUBLIC_KEY);

  const databases = new Databases(client, '62d985ab68e0e4b60293');
  

  const listMessages = async () => {
    const promise = await databases.listDocuments('62dd7c6bbe54693b8a32');
    setDatabaseMessages([])
    promise.documents.map((document) =>{ 
      const decryptedMessage = cryptr.decrypt(document.message)
      setDatabaseMessages(prevArray => [...prevArray, decryptedMessage])
    }
    )
  }

  const sendMessage = async () => {

    // encrypt the string in our message state variable

    const encryptedMessage = cryptr.encrypt(message)
    try {
      await databases.createDocument('62dd7c6bbe54693b8a32', 'unique()', {
        "message": encryptedMessage
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
            databaseMessages ? (
              <div className="message-container">
                {
                  databaseMessages.map((databaseMessage)=> (
                    <div className="user-message">{databaseMessage}</div>
                  ))
                } 
              </div>
            ) : null
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