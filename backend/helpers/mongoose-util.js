import mongoose from "mongoose";
//const config = require("config");

export async function connectDb() {
  // const db = config.get("db");

  let client;

  try {
    client = await mongoose.connect(
      // `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kf0nx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongodb:27017/anime-app?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Connected to anime-app with mongoose ...`);
    return client;
  } catch {
    (err) =>
      console.log(`Could not connect to anime-app with mongoose ...`, err);
  }
}

export async function getAllDocuments(model, sortBy) {
  const documents = await model.find().sort(sortBy);
  return documents;
}

export async function getAllModelDocuments(model, sortBy) {
  let client;
  let documents;

  try {
    client = await connectDb();
    documents = await getAllDocuments(model, sortBy);
    documents = JSON.stringify(documents);
    documents = JSON.parse(documents);
    client.connection.close();
    return documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}
