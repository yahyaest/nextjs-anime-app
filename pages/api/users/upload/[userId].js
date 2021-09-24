import { connectDb } from "../../../../backend/helpers/mongoose-util";
import {
  getUser,
  patchUser,
  updateUser,
  deleteUser,
} from "../../../../backend/routes/users";

import { fileUpload } from "./../../../../backend/helpers/image-util";

import nextConnect from "next-connect";


const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(fileUpload.single("avatar"));

apiRoute.get(async (req, res) => {
  const { userId } = req.query;
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  await getUser(req, res, userId);

  client.connection.close();
});

apiRoute.put(async (req, res) => {
  const { userId } = req.query;
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  await updateUser(req, res, userId);

  client.connection.close();
});

apiRoute.patch(async (req, res) => {
  const { userId } = req.query;
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  await patchUser(req, res, userId);

  client.connection.close();
});

apiRoute.delete(async (req, res) => {
  const { userId } = req.query;
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  await deleteUser(req, res, userId);

  client.connection.close();
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
