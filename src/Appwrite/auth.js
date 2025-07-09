import { Account ,Client, ID} from "appwrite";
import conf from "../Config/conf.js";

class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteEndpoint) // Your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Your Appwrite Project ID
        this.account = new Account(this.client);
    }

    async signup({email,password,name}){
        try {
            const user = await this.account.create(ID.unique(),email,password,name)
            if(user){
                return this.login({email,password})
            }else{
                return user
            }
            
        } catch (error) {
            console.error("Signup failed:", error);
            throw error
        }
    }

    async login({email,password}){
        try {
            await this.account.deleteSession('current')
        } catch (error) {
            console.error("Delete failed:", error);
        }
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.error("Login failed:", error);
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            if(error.code === 401){
                console.error("User not authenticated, please login.");
                return null; 
            }
            throw error
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.error("Logout failed:", error);
            throw error
        }
    }
}

const authService = new AuthService()
export default authService;