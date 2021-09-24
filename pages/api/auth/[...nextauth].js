import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import bcrypt from "bcrypt";
import { connectDb } from "../../../backend/helpers/mongoose-util";
import { User } from "../../../backend/models/user";

export default NextAuth({
  session: { jwt: true },
  providers: [
    Providers.Credentials({
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
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});
