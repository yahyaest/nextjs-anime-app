import { connectDatabase } from "../../../backend/helpers/mongodb-util";

import { getAllMangas, createManga } from "../../../backend/routes/mangas";

async function handler(req, res) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  if (req.method === "POST") {
    await createManga(req, res, client);
  }

  if (req.method === "GET") {
    await getAllMangas(req, res, client);
  }

  client.close();
}

export default handler;
