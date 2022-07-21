import { Client, Account } from "appwrite";
import Router from 'next/router'; 

export const client = new Client();

export const account = new Account(client);

export const signinWithEmailandPassword = async (email, password) => {
    try {
        await account.createEmailSession(email, password)
        Router.push("/chat")
        alert("user signed in")
    } catch (error) {
        console.log(error)
    }
}
client
    .setEndpoint('http://localhost/v1') // Your API Endpoint
    .setProject('62d9859fd5a5923edf53') // Your project ID
;