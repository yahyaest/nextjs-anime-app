import { connectDb } from "../../../backend/helpers/mongoose-util";
import { getComments, createComment } from "../../../backend/routes/comments";

async function handler(req, res) {
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  if (req.method === "POST") {
    await createComment(req, res);
  }

  if (req.method === "GET") {
    await getComments(req, res);
  }

//  client.connection.close();
}

export default handler;
