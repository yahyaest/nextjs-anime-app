import { connectDatabase, insertDocument,
  getAllDocuments,
  getDocument,
  updateDocument,
  deleteDocument, } from "../../backend/helpers/mongodb-util";

import { ObjectId } from "mongodb";


async function handler(req, res) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  if (req.method === "POST") {
    const documents = await getAllDocuments(client, "animes", { title: 1 });
      let query = { $set: {type:"anime"} };

    for (let document of documents){


     await updateDocument(
        client,
        "animes",
        {
          _id: ObjectId(document._id),
        },
        query
      );

    }
  }

  

  client.close();
}

export default handler;
