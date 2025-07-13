import {ID,Databases,Client} from "appwrite"
import conf from "../Config/conf"


class AppwriteContactUs{
    client = new Client()
    database
    constructor(){
       this.client
        .setEndpoint(conf.appwriteEndpoint)
        .setProject(conf.appwriteProjectId)
        this.database = new  Databases(this.client)
    }

    async sendMessage({name,email,message}){
        try {
            const data = {name,email,message}
            await this.database.createDocument( 
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId3,
                ID.unique(),
                data
            )
            console.log("Message Send Successfully")
        } catch (error) {
            console.log("message failed: ",error.message," ",error.code)
        }
    }
}

const appwriteContactUs = new AppwriteContactUs()
export default appwriteContactUs