const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;
const collectionName = process.env.COLLECTION_NAME; 

const client = new MongoClient(uri);

async function fetchQuestions() {
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const questions = await collection.find({}).toArray();
        return questions;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    } finally {
        await client.close();
    }
}

module.exports = { fetchQuestions };
