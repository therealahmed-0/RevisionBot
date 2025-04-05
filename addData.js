const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;
const collectionName = process.env.COLLECTION_NAME;

// Sample data - replace wiht your own data
const questions = [
    
        {
          "question": "What is the capital of France?",
          "category": "Geography",
          "image": "https://cdn.pixabay.com/photo/2015/09/18/20/24/eiffel-tower-951509_960_720.jpg"
        },
        {
          "question": "What is 2 + 2?",
          "category": "Math",
          "image": ""
        },
        {
          "question": "Who wrote 'Hamlet'?",
          "category": "Literature",
          "image": ""
        },
        {
          "question": "What is the speed of light in a vacuum?",
          "category": "Science",
          "image": ""
        },
        {
          "question": "What is the largest planet in the Solar System?",
          "category": "Astronomy",
          "image": "https://cdn.mos.cms.futurecdn.net/9gGd2X8T6jT6Zp6vX3g9nJ-1200-80.jpg"
        },
        {
          "question": "What is the square root of 144?",
          "category": "Math",
          "image": ""
        },
        {
          "question": "Who painted the Mona Lisa?",
          "category": "Art",
          "image": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
        },
        {
          "question": "What is the hardest natural substance on Earth?",
          "category": "Science",
          "image": ""
        },
        {
          "question": "Which country is known as the Land of the Rising Sun?",
          "category": "Geography",
          "image": ""
        },
        {
          "question": "What is the chemical symbol for Gold?",
          "category": "Science",
          "image": ""
        },
        {
          "question": "Which animal is known as the 'King of the Jungle'?",
          "category": "Biology",
          "image": "https://cdn.pixabay.com/photo/2017/01/12/14/35/lion-1974088_960_720.jpg"
        },
        {
          "question": "What is the tallest mountain in the world?",
          "category": "Geography",
          "image": "https://cdn.pixabay.com/photo/2013/03/02/02/12/mount-everest-89173_960_720.jpg"
        },
        {
          "question": "How many continents are there on Earth?",
          "category": "Geography",
          "image": ""
        },
        {
          "question": "Which planet is known as the 'Red Planet'?",
          "category": "Astronomy",
          "image": "https://cdn.pixabay.com/photo/2016/02/18/22/16/mars-1205638_960_720.jpg"
        },
        {
          "question": "What is the most widely spoken language in the world?",
          "category": "Language",
          "image": ""
        },
        {
          "question": "What year did World War II end?",
          "category": "History",
          "image": ""
        },
        {
          "question": "What is the name of the largest ocean on Earth?",
          "category": "Geography",
          "image": "https://cdn.pixabay.com/photo/2017/06/28/02/47/beach-2440974_960_720.jpg"
        },
        {
          "question": "Which bird is known for its ability to mimic human speech?",
          "category": "Biology",
          "image": "https://cdn.pixabay.com/photo/2014/03/05/21/12/parrot-279052_960_720.jpg"
        },
        {
          "question": "Who developed the theory of relativity?",
          "category": "Physics",
          "image": "https://cdn.pixabay.com/photo/2017/09/25/13/12/albert-einstein-2789710_960_720.jpg"
        },
        {
          "question": "Which city is known as the 'Big Apple'?",
          "category": "Geography",
          "image": "https://cdn.pixabay.com/photo/2016/11/29/03/53/new-york-1867569_960_720.jpg"
        }
      ];

async function insertQuestions() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const result = await collection.insertMany(questions);
        console.log(`${result.insertedCount} questions inserted.`);
    } catch (error) {
        console.error("Error inserting questions:", error);
    } finally {
        await client.close();
    }
}

insertQuestions();