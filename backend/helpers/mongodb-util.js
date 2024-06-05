import { MongoClient } from "mongodb";

export async function connectDatabase() {
  try {
    const client = await MongoClient.connect(
      //`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kf0nx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongodb:27017/anime-app?authSource=admin`
    );
    console.log(`Connected to anime-app with mongodb ...`);
    return client;
  } catch (error) {
    console.error(`Could not connect to anime-app with mongodb  ...`, error);
  }
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  try {
    const db = client.db();

    const documents = await db
      .collection(collection)
      .find()
      .sort(sort)
      .toArray();

    return documents;
  } catch (error) {
    console.error("Could not connect to anime-app with mongodb  ...");
    return [];
  }
}

export async function getAllCollectionDocuments(collection, sort) {
  let client;
  let documents;

  try {
    client = await connectDatabase();
  } catch (error) {
    console.error("Connecting to the database failed !");
    return [];
  }

  documents = await getAllDocuments(client, collection, sort);
  documents = JSON.stringify(documents);
  documents = JSON.parse(documents);

  return documents;
}

export async function getDocument(client, collection, query) {
  const db = client.db();

  const document = await db.collection(collection).findOne(query);

  return document;
}

export async function updateDocument(
  client,
  collection,
  findQuery,
  updateQuery
) {
  const db = client.db();

  const updatedDocument = await db
    .collection(collection)
    .updateOne(findQuery, updateQuery);

  return updatedDocument;
}

export async function deleteDocument(client, collection, query) {
  const db = client.db();

  const document = await db.collection(collection).deleteOne(query);

  return document;
}

//// get anime/manga by id

export async function getAnimeById(id) {
  const allAnimes = await getAllCollectionDocuments("animes", { title: 1 });
  return allAnimes.find((anime) => anime._id === id);
}

export async function getMangaById(id) {
  const allMangas = await getAllCollectionDocuments("mangas", { title: 1 });
  return allMangas.find((manga) => manga._id === id);
}
