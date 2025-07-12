import { Client,Databases,Query,ID,Account,Permission,Role } from "appwrite";
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
                [Query.equal("userId",userId)]
        )
        //res.documents returns an object which contains items and total of them.
        return res.documents[0] || null;
        } catch (error) {
            console.error("Get cart items by user ID failed:", error);
            throw error;
        }
    }
async addToCart(product){
    function generateSlug(name) {
        return name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }

    try {
        const userId = await this.getUserId();
        const cart = await this.getCartItemsByUserId(userId);

        let items = [];
        if (cart) {
            items = JSON.parse(cart.items);
        }

        const slug = product.slug || generateSlug(product.product_name);

        const existProduct = items.find((item) => item.slug === slug); // 
        if (existProduct) {
            existProduct.quantity += 1;
        } else {
            items.push({
                slug,
                price: product.price,
                quantity: 1
            });
        }

        console.log("product before push:", product);

        const total = items.reduce((sum, item) => {
            const itemTotal = Number(item.price) * item.quantity;
            return sum + (isNaN(itemTotal) ? 0 : itemTotal);
        }, 0);

        const data = {
            userId: userId,
            items: JSON.stringify(items),
            total: Math.floor(total)
        };

        console.log(data);

        if (cart) {
            return this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                cart.$id,
                data
            );
        } else {
            return this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                ID.unique(),
                data,
                  [
                Permission.read(Role.user(userId)),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId))
            ]
            );
        }
    } catch (error) {
         console.error("Add to cart failed:");
        console.error("Message:", error.message);
        console.error("Code:", error.code);
        console.error("Response:", error.response); 
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