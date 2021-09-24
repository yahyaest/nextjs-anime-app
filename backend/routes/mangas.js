import {
  insertDocument,
  getAllDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
} from "../helpers/mongodb-util";

import { ObjectId } from "mongodb";

export async function getAllMangas(req, res, client) {
  try {
    const documents = await getAllDocuments(client, "mangas", { title: 1 });
    res.status(200).json({ mangas: documents });
  } catch (error) {
    res.status(500).json({ message: "Getting data failed !" });
  }
}

export async function getManga(req, res, client, id) {
  try {
    const document = await getDocument(client, "mangas", {
      _id: ObjectId(id),
    });
    res.status(200).json({ manga: document });
  } catch (error) {
    res.status(500).json({ message: "Getting data failed !" });
  }
}

export async function createManga(req, res, client) {
  const { manga } = req.body;
  let result;

  try {
    result = await insertDocument(client, "mangas", manga);
    res.status(201).json({ message: "Manga Added.", manga: manga });
  } catch (error) {
    res.status(500).json({ message: "Inserting data failed !" });
  }
}

export async function updateManga(req, res, client, id) {
  const manga = await getDocument(client, "mangas", {
    _id: ObjectId(id),
  });

  let query = { $set: {} };

  try {
    for (let key in req.body) {
      if (manga[key] && manga[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];

      await updateDocument(
        client,
        "mangas",
        {
          _id: ObjectId(id),
        },
        query
      );
    }
    res.status(200).json({ message: "Manga updated successfully !", query });
  } catch (error) {
    res.status(500).json({ message: "Updating manga failed !" });
  }
}

export async function deleteManga(req, res, client, id) {
  try {
    await deleteDocument(client, "mangas", {
      _id: ObjectId(id),
    });
    res.status(200).json({ message: "Manga deleted successfully !" });
  } catch (error) {
    res.status(500).json({ message: "Deleting manga failed !" });
  }
}
