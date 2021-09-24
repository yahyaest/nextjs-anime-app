import { User } from "../models/user";
import { Comment, validateComment as validate } from "../models/comment";
import { ObjectId } from "mongodb";

import {
  authMiddleware,
  adminMiddleware,
  objectIdMiddleware,
} from "../helpers/middlewares-util";
import { connectDatabase, getDocument } from "../helpers/mongodb-util";

export async function getComments(req, res) {
  const comments = await Comment.find().sort("created_at");
  return res.status(200).json(comments);
}

export async function getComment(req, res, id) {
  const isAuthenticated = await authMiddleware(req, res);
  const isAdmin = await adminMiddleware(req, res);
  const isObjectId = await objectIdMiddleware(req, res);

  if (!isAuthenticated) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  if (!isAdmin) {
    return res.status(403).json({ message: "Access denied.Need Admin rights" });
  }

  if (!isObjectId) {
    return res.status(404).json({ message: "Invalid ID!" });
  }

  try {
    const comment = await Comment.findById(id);
    //// If not existing return 404 - Not found ////
    if (!comment) {
      return res
        .status(404)
        .json({ message: "The comment with the given id was not found." });
    }
    return res.json(comment);
  } catch (e) {
    return res
      .status(404)
      .json({ message: "The comment with the given id was not found." });
  }
}

export async function createComment(req, res) {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).json({ message: "Invalid user." });

  // get Anime
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }
  const anime = await getDocument(client, "animes", {
    _id: ObjectId(req.body.animeId),
  });

  const manga = await getDocument(client, "mangas", {
    _id: ObjectId(req.body.mangaId),
  });

  client.close();


  if (!anime && !manga)
    return res.status(400).json({ message: "Invalid anime/manga." });
  // if (!anime) return res.status(400).json({ message: "Invalid anime." });
  // if (!manga) return res.status(400).json({ message: "Invalid manga." });

  let comment = await Comment.findOne({ user: { _id: req.body.userId } });
  if (comment)
    return res.status(400).json({ message: "Comment already created." });

  if (anime) {
    comment = new Comment({
      user: {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
      },
      anime: {
        _id: anime._id,
        title: anime.title,
      },
      comment: req.body.comment,
    });
    
  }
  if (manga) {
     
    comment = new Comment({
      user: {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
      },
      anime: {
        _id: manga._id,
        title: manga.title,
      },
      comment: req.body.comment,
    });
  }

  console.log(comment)

  await comment.save();
  res.status(201).json(comment);
}

export async function updateComment(req, res, id) {
  const isAuthenticated = await authMiddleware(req, res);
  const isObjectId = await objectIdMiddleware(req, res);

  if (!isAuthenticated) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  if (!isObjectId) {
    return res.status(404).json({ message: "Invalid ID!" });
  }

  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).json({ message: "Invalid user." });

  // get Anime
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed !" });
    return;
  }
  const anime = await getDocument(client, "animes", {
    _id: ObjectId(req.body.animeId),
  });

  const manga = await getDocument(client, "mangas", {
    _id: ObjectId(req.body.mangaId),
  });

  client.close();

  if (!anime && !manga)
    return res.status(400).json({ message: "Invalid anime/manga." });
  // if (!anime) return res.status(400).json({ message: "Invalid anime." });
  // if (!manga) return res.status(400).json({ message: "Invalid manga." });


  if (anime) {
  const comment = await Comment.findByIdAndUpdate(
      id,
      {
        user: {
          _id: user._id,
          username: user.username,
          avatar: user.avatar,
        },
        anime: {
          _id: anime._id,
          title: anime.title,
        },
        comment: req.body.comment,
      },
      { new: true }
    );

      //// If not existing return 404 - Not found ////
  if (!comment)
    return res
      .status(404)
      .json({ message: "The comment with the given id was not found." });

  res.json(comment);
  }

    if (manga) {
    const comment = await Comment.findByIdAndUpdate(
        id,
        {
          user: {
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
          },
          anime: {
            _id: manga._id,
            title: manga.title,
          },
          comment: req.body.comment,
        },
        { new: true }
      );

        //// If not existing return 404 - Not found ////
  if (!comment)
    return res
      .status(404)
      .json({ message: "The comment with the given id was not found." });

  res.json(comment);
    }


}

export async function patchComment(req, res, id) {
  const isAuthenticated = await authMiddleware(req, res);
  const isObjectId = await objectIdMiddleware(req, res);

  if (!isAuthenticated) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  if (!isObjectId) {
    return res.status(404).json({ message: "Invalid ID!" });
  }

  const comment = await Comment.findById(id);
  if (!comment)
    return res
      .status(404)
      .json({ message: "The Comment with the given ID was not found." });

  let query = { $set: {} };
  for (let key in req.body) {
    if (comment[key] !== req.body[key]) {
      // if the field we have in req.body exists, we're gonna update it
      query.$set[key] = req.body[key];
    }

    await Comment.updateOne({ _id: id }, query, {
      runValidators: true,
    });
  }
  return res.json(query);
}

export async function deleteComment(req, res, id) {
  const isAuthenticated = await authMiddleware(req, res);
  const isAdmin = await adminMiddleware(req, res);
  const isObjectId = await objectIdMiddleware(req, res);

  if (!isAuthenticated) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  if (!isAdmin) {
    return res.status(403).json({ message: "Access denied.Need Admin rights" });
  }

  if (!isObjectId) {
    return res.status(404).json({ message: "Invalid ID!" });
  }

  try {
    const comment = await Comment.findByIdAndRemove(id);

    //// If not existing return 404 - Not found ////
    if (!comment) {
      return res
        .status(404)
        .json({ message: "The comment with the given id was not found." });
    }

    return res.json(comment);
  } catch (e) {
    return res
      .status(404)
      .json({ message: "The comment with the given id was not found." });
  }
}
