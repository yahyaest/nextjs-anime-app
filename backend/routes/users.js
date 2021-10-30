import _ from "lodash";
import bcrypt from "bcrypt";
import { User, validateUser as validate } from "../models/user";

import {
  authMiddleware,
  adminMiddleware,
  objectIdMiddleware,
} from "../helpers/middlewares-util";

export async function getUsers(req, res) {
  const users = await User.find().sort("username");
 return  res.status(200).json(users);
}

export async function getUser(req, res, id) {
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
    const user = await User.findById(id);
    //// If not existing return 404 - Not found ////
    if (!user) {
      return res
        .status(404)
        .json({ message: "The user with the given id was not found." });
    }
   return res.json(user);
  } catch (e) {
    return res
      .status(404)
      .json({ message: "The user with the given id was not found." });
  }
}

export async function createUser(req, res) {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({ message: "User already registered." });

  user = new User(_.pick(req.body, ["username", "email", "password"]));

  // Password hashing //
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  // if (req.file) {
  //   user.avatar = req.file.filename;
  // }
  user.avatar = req.body.avatar;
  await user.save();

  user = _.pick(user, ["_id", "username", "email"]);

  return res.status(201).json(user);
}

export async function updateUser(req, res, id) {
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

  let user = await User.findById(id);
  if (!user) return res.status(400).json({ message: "Invalid user." });

  // Password hashing //
  let password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  user = await User.findByIdAndUpdate(
    id,
    {
      username: req.body.username,
      email: req.body.email,
      password: password,
      avatar: req.file.filename,
    },
    { new: true }
  );

  //// If not existing return 404 - Not found ////
  if (!user)
    return res
      .status(404)
      .json({ message: "The user with the given id was not found." });

  return res.json(user);
}

export async function patchUser(req, res, id) {
  const isAuthenticated = await authMiddleware(req, res);
  const isObjectId = await objectIdMiddleware(req, res);

  if (!isAuthenticated) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  if (!isObjectId) {
    return res.status(404).json({ message: "Invalid ID!" });
  }

  const user = await User.findById(id);
  if (!user)
    return res
      .status(404)
      .json({ message: "The user with the given ID was not found." });

  let query = { $set: {} };

  for (let key in req.body) {
    if (user[key] !== req.body[key] && key !== "avatar") {
      // if the field we have in req.body exists, we're gonna update it
      if (key === "password") {
        const salt = await bcrypt.genSalt(10);
        req.body[key] = await bcrypt.hash(req.body[key], salt);
        query.$set[key] = req.body[key];
      } else {
        query.$set[key] = req.body[key];
      }
    }

    await User.updateOne({ _id: id }, query, {
      runValidators: true,
    });
  }

  if (req.file) {
    for (let key in req.file) {
      if (user.avatar !== req.file.filename) {
        if (key === "filename") {
          query.$set.avatar = req.file.filename;
        }
      }

      await User.updateOne({ _id: id }, query, {
        runValidators: true,
      });
    }
  }

  return res.json(query);
}

export async function deleteUser(req, res, id) {
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
    const user = await User.findByIdAndRemove(id);

    //// If not existing return 404 - Not found ////
    if (!user) {
      return res
        .status(404)
        .json({ message: "The user with the given id was not found." });
    }

    return res.json(user);
  } catch (e) {
    return res
      .status(404)
      .json({ message: "The user with the given id was not found." });
  }
}
