import { Client,Databases,Query,ID,Account } from "appwrite";
import conf from "../Config/conf.js";

class AppwriteCartService{
    client = new Client();
    database;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteEndpoint)
        .setProject(conf.appwriteProjectId)
        this.database = new  Databases(this.client)
        this.account = new Account(this.client);
    }

   async getUserId(){
    try {
        const user = await this.account.get()
        return user.$id; // Return the user ID
    } catch (error) {
        console.error("Get user ID failed:", error);
        throw error;
        
    }
   }

   async getCartItemsByUserId(userId){
        try {
        const res = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                Query.equal("userId",userId)
        )
        //res.documents returns an object which contains items and total of them.
        return res.documents[0] || null;
        } catch (error) {
            console.error("Get cart items by user ID failed:", error);
            throw error;
        }
    }

    async addToCart(product){
        try {

            const userId = await this.getUserId()
            const cart = await this.getCartItemsByUserId(userId);


            //Fetch the cart from the db and store them in array that is items by json.parse
            let items = []
            if(cart){
                items = JSON.parse(cart.items)
            }

            // Check if the product already exists in the cart
            const existProduct = items.find((item) => item.slug === product.slug)
            if(existProduct){
                existProduct.quantity += 1
            }else{
                items.push({...product,quantity:1})
            }

            const total = items.reduce((sum,item) => sum + item.price * item.quantity, 0)
            const data = {
                userId: userId,
                items: JSON.stringify(items),
                total: total
            }

            if(cart){
                return this.database.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId2,
                    cart.$id, // Use the existing cart document ID
                    data
                )
            }else{
                return this.database.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId2,
                    ID.unique(), // Create a new document with a unique ID
                    data
                )
            }
  
        } catch (error) {
            console.error("Add to cart failed:", error);
            throw error;
            
        }
    }

    async removeCartItem(slug){
        const userId = await this.getUserId();
        const cart = await this.getCartItemsByUserId(userId);

        if(!cart) return;

        let items = JSON.parse(cart.items)
        items = items.filter((item) => item.slug != slug)
        const total = items.reduce((sum,item) => sum +  item.price * item.quantity,0)

        return this.database.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId2,
            cart.$id,{
                items:JSON.stringify(items),
                total : total
            }
        )
    }

}

const appwriteCartService = new AppwriteCartService();
export default appwriteCartService;