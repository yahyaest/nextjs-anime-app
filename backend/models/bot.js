import mongoose from "mongoose";
import Joi from "joi";

const botSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  anime: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 100,
  },
  discord: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  url: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  avatar: { type: String, default: "no_bot.png" },
});

export const Bot = mongoose.models.Bot || mongoose.model("Bot", botSchema);

export function validateBot(bot) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    anime: Joi.string().min(3).max(100).required(),
    discord: Joi.string().min(5).max(255).required(),
    url: Joi.string().min(5).max(255).required(),
    avatar: Joi.any(),
  });
  return schema.validate(bot);
}
