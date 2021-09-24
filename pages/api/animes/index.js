import { connectDatabase } from "../../../backend/helpers/mongodb-util";

import { getAllAnimes, createAnime } from "../../../backend/routes/animes";

async function handler(req, res) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  if (req.method === "POST") {
    await createAnime(req, res, client);
  }

  if (req.method === "GET") {
    await getAllAnimes(req, res, client);
  }

  client.close();
}

export default handler;
