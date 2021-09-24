import mongoose from "mongoose";
import Joi from "joi";
//const Joi = require("joi");

//import joiObjectId from "joi-objectid";
Joi.objectId = require("joi-objectid")(Joi);

const commentSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      avatar: { type: String },
    }),
    required: true,
  },
  anime: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
      },
    }),
  },
  comment: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000,
  },
  like_counter: { type: Number, default: 0, min: 0 },
  dislike_counter: { type: Number, default: 0, min: 0 },
  comment_replies: { type: Array, default: [] },
  like_submitter: { type: Array, default: [] },
  dislike_submitter: { type: Array, default: [] },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export function validateComment(comment) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    animeId: Joi.objectId(),
    mangaId: Joi.objectId(),
    comment: Joi.string().min(3).max(1000).required(),
  });
  return schema.validate(comment);
}
