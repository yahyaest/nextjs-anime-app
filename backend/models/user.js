import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },

  liked_animes: { type: Array, default: [] },
  date_joined: {
    type: Date,
    required: true,
    default: Date.now,
  },
   avatar: { type: String, default: "no_user.png" },

  isAdmin: { type: Boolean, default: false },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);


export function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    avatar: Joi.any(),
  });
  return schema.validate(user);
}

