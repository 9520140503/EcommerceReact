import {Client,ID,Storage,Databases,Query} from "appwrite";
import conf from "../Config/conf.js";

class AppwriteProductService{
    client = new Client()
    database
    bucket

    constructor(){
        this.client
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId); 

        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createProduct({name,description,price,featuredImage,slug,status}){
        try {
            const data ={
                name,description,price,featuredImage,status
            }
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                data
            )
        } catch (error) {
            console.error("Create product failed:", error);
            throw error;
            
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error("Get post failed:", error);
            throw error;
        }
    }

    async getPosts(query = [Query.equal("status","available")]){
            try {
                return await this.database.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    query
                )
            } catch (error) {
                console.error("Get posts failed:", error);
                throw error; 
            }
    }


    async deleteProduct(slug){
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug 
            )

        } catch (error) {
            console.error("Delete product failed:", error);
            throw error;
            return false   
        }
    }

    async getFileView(fileId){
        try {
            return await this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.error("Get file view failed:", error);
            throw error;
        }
    }
}


const appwriteProductService = new AppwriteProductService();
export default appwriteProductService