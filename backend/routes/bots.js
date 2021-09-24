import { Bot, validateBot as validate } from "../models/bot";

import {
  authMiddleware,
  adminMiddleware,
  objectIdMiddleware,
} from "../helpers/middlewares-util";

export async function getBots(req, res) {
  const bots = await Bot.find().sort("created_at");
  return res.status(200).json(bots);
}

export async function getBot(req, res, id) {
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
    const bot = await Bot.findById(id);
    //// If not existing return 404 - Not found ////
    if (!bot) {
      return res
        .status(404)
        .json({ message: "The bot with the given id was not found." });
    }
    return res.json(bot);
  } catch (e) {
    return res
      .status(404)
      .json({ message: "The bot with the given id was not found." });
  }
}

export async function createBot(req, res) {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let bot = await Bot.findOne({ name: req.body.name });
  if (bot) return res.status(400).json({ message: "Bot already created." });

  bot = new Bot({
    name: req.body.name,
    anime: req.body.anime,
    discord: req.body.discord,
    url: req.body.url,
  });

  if (req.file) {
    bot.avatar = req.file.filename;
  }
  await bot.save();
  res.status(201).json(bot);
}

export async function updateBot(req, res, id) {
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

  if (manga) {
    const bot = await Bot.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        anime: req.body.anime,
        discord: req.body.discord,
        url: req.body.url,
        avatar: req.file.filename,
      },
      { new: true }
    );

    //// If not existing return 404 - Not found ////
    if (!bot)
      return res
        .status(404)
        .json({ message: "The bot with the given id was not found." });

    res.json(bot);
  }
}

export async function patchBot(req, res, id) {
  const isAuthenticated = await authMiddleware(req, res);
  const isObjectId = await objectIdMiddleware(req, res);

  if (!isAuthenticated) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  if (!isObjectId) {
    return res.status(404).json({ message: "Invalid ID!" });
  }

  const bot = await Bot.findById(id);
  if (!bot)
    return res
      .status(404)
      .json({ message: "The Bot with the given ID was not found." });

  let query = { $set: {} };
  for (let key in req.body) {
    if (bot[key] !== req.body[key] && key !== "avatar") {
      // if the field we have in req.body exists, we're gonna update it
      query.$set[key] = req.body[key];
    }

    await Bot.updateOne({ _id: id }, query, {
      runValidators: true,
    });
  }

  if (req.file) {
    for (let key in req.file) {
      if (bot.avatar !== req.file.filename) {
        if (key === "filename") {
          query.$set.avatar = req.file.filename;
        }
      }

      await bot.updateOne({ _id: id }, query, {
        runValidators: true,
      });
    }
  }

  return res.json(query);
}

export async function deleteBot(req, res, id) {
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
    const bot = await Bot.findByIdAndRemove(id);

    //// If not existing return 404 - Not found ////
    if (!bot) {
      return res
        .status(404)
        .json({ message: "The bot with the given id was not found." });
    }

    return res.json(bot);
  } catch (e) {
    return res
      .status(404)
      .json({ message: "The bot with the given id was not found." });
  }
}
