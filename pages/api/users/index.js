import { connectDb } from "../../../backend/helpers/mongoose-util";
import { getUsers, createUser } from "../../../backend/routes/users";

async function handler(req, res) {
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  if (req.method === "POST") {
    await createUser(req, res);
  }

  if (req.method === "GET") {
    await getUsers(req, res);
  }

  //client.connection.close();
}

export default handler;
