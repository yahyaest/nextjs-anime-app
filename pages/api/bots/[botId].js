import { connectDb } from "../../../backend/helpers/mongoose-util";
import {
  getBot,
  patchBot,
  updateBot,
  deleteBot,
} from "../../../backend/routes/bots";

import { fileUpload } from "./../../../backend/helpers/image-util";

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
  const { botId } = req.query;
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  await getBot(req, res, botId);

  client.connection.close();
});

apiRoute.put(async (req, res) => {
  const { botId } = req.query;
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  await updateBot(req, res, botId);

  client.connection.close();
});

apiRoute.patch(async (req, res) => {
  const { botId } = req.query;
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  await patchBot(req, res, botId);

  client.connection.close();
});

apiRoute.delete(async (req, res) => {
  const { botId } = req.query;
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  await deleteBot(req, res, botId);

  client.connection.close();
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
