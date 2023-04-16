import { MongoClient } from 'mongodb';

let db;

const connectToDB = async (cb) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = client.db('react-fullstack');

    if (!db) return console.log('Can not connect to database');

    console.log('Successfully connect to a database');
    cb();
};

export { db, connectToDB };
