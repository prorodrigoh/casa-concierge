import { getDb } from './mongo.db.js'

export const getCollection = async (collectionName) => {
    const db = await getDb();
    return db.collection(collectionName);
};


