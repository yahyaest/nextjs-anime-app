import { connectDb } from "../../../backend/helpers/mongoose-util";
import { getComment, patchComment,updateComment, deleteComment } from "../../../backend/routes/comments";

async function handler(req, res) {
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }

  if (req.method === "GET") {
    const { commentId } = req.query;
    await getComment(req, res, commentId);
  }

    if (req.method === "PUT") {
      const { commentId } = req.query;
      await updateComment(req, res, commentId);
    }

  if (req.method === "PATCH") {
    const { commentId } = req.query;
    await patchComment(req, res, commentId);
  }

  if (req.method === "DELETE") {
    const { commentId } = req.query;
    await deleteComment(req, res, commentId);
  }

  client.connection.close();
}

export default handler;
