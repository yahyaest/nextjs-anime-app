import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { connectDb } from "./mongoose-util";
import { User } from "../models/user";

const authOptions = {
  session: { jwt: true },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let client;

        try {
          client = await connectDb();
        } catch (error) {
          throw new Error("Connecting to the database failed !");
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          client.connection.close();
          throw new Error("No user found!");
        }

        const validPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!validPassword) {
          client.connection.close();
          throw new Error("Invalid password.");
        }

        client.connection.close();
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        }; // will be encoded into jwt
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export default authOptions;
