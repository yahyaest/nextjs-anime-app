import { getServerSession } from "next-auth/next"
import mongoose from "mongoose";
import { User } from "../models/user";
import authOptions from "./nextAuthOption"

export async function authMiddleware(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  let isAuthenticated = true;
  if (session === null) {
    isAuthenticated = false;
    return isAuthenticated;
  }

  return isAuthenticated;
}

export async function adminMiddleware(req, res) {
  const session = await getServerSession(req, res, authOptions);

  let isAdmin = true;

  if (session === null) {
    isAdmin = false;
    return isAdmin;
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user?.isAdmin) {
    isAdmin = false;
    return isAdmin;
  }
  return isAdmin;
}

export async function objectIdMiddleware(req, res) {
  const session = await getServerSession(req, res, authOptions);
  let isObjectId = true;

  if (session === null) {
    isObjectId = false;
    return isObjectId;
  }

  const user = await User.findOne({ email: session.user.email });

  if (!mongoose.Types.ObjectId.isValid(user?._id)) {
    isObjectId = false;
    return isObjectId;
  }
  return isObjectId;
}
