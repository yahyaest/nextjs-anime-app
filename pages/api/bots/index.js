import { connectDb } from "../../../backend/helpers/mongoose-util";
import { getBots, createBot } from "../../../backend/routes/bots";

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
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  await getBots(req, res);

  client.connection.close();
});

apiRoute.post(async (req, res) => {
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  await createBot(req, res);

  client.connection.close();
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
