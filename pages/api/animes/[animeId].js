import { connectDatabase } from "../../../backend/helpers/mongodb-util";

import { getAnime, updateAnime, deleteAnime } from "../../../backend/routes/animes";

async function handler(req, res) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  if (req.method === "GET") {
    const { animeId } = req.query;
    await getAnime(req, res, client, animeId);
  }

  if (req.method === "PATCH") {
    const { animeId } = req.query;
    await updateAnime(req, res, client, animeId);
  }

  if (req.method === "DELETE") {
    const { animeId } = req.query;
    await deleteAnime(req, res, client, animeId);
  }

  client.close();
}

export default handler;
