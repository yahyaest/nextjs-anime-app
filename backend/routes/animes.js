import {
  insertDocument,
  getAllDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
} from "../helpers/mongodb-util";

import { ObjectId } from "mongodb";

export async function getAllAnimes(req, res, client) {
  try {
    const documents = await getAllDocuments(client, "animes", { title: 1 });
    res.status(200).json({ animes: documents });
  } catch (error) {
    res.status(500).json({ message: "Getting data failed !" });
  }
}

export async function getAnime(req, res, client, id) {
  try {
    const document = await getDocument(client, "animes", {
      _id: ObjectId(id),
    });
    res.status(200).json({ anime: document });
  } catch (error) {
    res.status(500).json({ message: "Getting data failed !" });
  }
}

export async function createAnime(req, res, client) {
  const { anime } = req.body;
  let result;

  try {
    result = await insertDocument(client, "animes", anime);
    res.status(201).json({ message: "Anime Added.", anime: anime });
  } catch (error) {
    res.status(500).json({ message: "Inserting data failed !" });
  }
}

export async function updateAnime(req, res, client, id) {
  const anime = await getDocument(client, "animes", {
    _id: ObjectId(id),
  });

  let query = { $set: {} };

  try {
    for (let key in req.body) {
      if (anime[key] && anime[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];

      await updateDocument(
        client,
        "animes",
        {
          _id: ObjectId(id),
        },
        query
      );
    }
    res.status(200).json({ message: "Anime updated successfully !", query });
  } catch (error) {
    res.status(500).json({ message: "Updating anime failed !" });
  }
}

export async function deleteAnime(req, res, client, id) {
  try {
    await deleteDocument(client, "animes", {
      _id: ObjectId(id),
    });
    res.status(200).json({ message: "Anime deleted successfully !" });
  } catch (error) {
    res.status(500).json({ message: "Deleting anime failed !" });
  }
}
