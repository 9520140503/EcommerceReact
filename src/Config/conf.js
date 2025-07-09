const conf = {
    appwriteEndpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    appwriteCollectionId2: import.meta.env.VITE_APPWRITE_COLLECTION_ID2,
    appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
}

export default conf;