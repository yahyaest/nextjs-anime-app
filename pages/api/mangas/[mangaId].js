import { connectDatabase } from "../../../backend/helpers/mongodb-util";

import { getManga, updateManga, deleteManga } from "../../../backend/routes/mangas";

async function handler(req, res) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  if (req.method === "GET") {
    const { mangaId } = req.query;
    await getManga(req, res, client, mangaId);
  }

  if (req.method === "PATCH") {
    const { mangaId } = req.query;
    await updateManga(req, res, client, mangaId);
  }

  if (req.method === "DELETE") {
    const { mangaId } = req.query;
    await deleteManga(req, res, client, mangaId);
  }

  client.close();
}

export default handler;
