import { connectDb } from "../../../backend/helpers/mongoose-util";
import { getCurrentUser } from "../../../backend/routes/users";

async function handler(req, res) {
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }


  if (req.method === "GET") {
    await getCurrentUser(req, res);
  }

  //client.connection.close();
}

export default handler;
