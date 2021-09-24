import { connectDb } from "../../../backend/helpers/mongoose-util";
import {
  getUser,
  patchUser,
  updateUser,
  deleteUser,
} from "../../../backend/routes/users";

async function handler(req, res) {
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  if (req.method === "GET") {
    const { userId } = req.query;
    await getUser(req, res, userId);
  }

  if (req.method === "PUT") {
    const { userId } = req.query;
    await updateUser(req, res, userId);
  }

  if (req.method === "PATCH") {
    const { userId } = req.query;
    await patchUser(req, res, userId);
  }

  if (req.method === "DELETE") {
    const { userId } = req.query;
    await deleteUser(req, res, userId);
  }

  client.connection.close();
}

export default handler;

