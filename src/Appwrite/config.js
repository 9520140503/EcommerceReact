import {Client,ID,Storage,Databases,Query} from "appwrite";
import conf from "../Config/conf.js";
import { homeAndKitchenProducts as home,
         bookProducts as books,
         toyProducts as toys,
         beautyAndHealthProducts as beauty,
         smartphones as phones,
         clothingProducts as clothes
        } from "../Products"

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

    async createProducts(){
        try {
            const existing = await this.database.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,[Query.limit(1)])
            
            if(existing.total > 0) return console.log("Products already seeded");
            
            const products = [...home,...books,...toys,...beauty,...phones,...clothes]
            await Promise.all(
                products.map((product) => 
                this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                product
            ))
            )
            console.log("Products stored successfully")
        } catch (error) {
            console.error("Create product failed:", error);
            throw error;
            
        }
    }

    async getProduct(slug){
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

    async getProducts(query = [Query.equal("status","available")]){
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