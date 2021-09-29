import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiRequest } from "next";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(
        credentials: Record<"email" | "password", string>,
        req: NextApiRequest
      ) {
        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (user) {
          const checkPassword = await compare(credentials.password, user.hash)
          if (!checkPassword){
            throw new Error("Password doesn't match")
          }
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          throw new Error("No user found")
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  adapter: PrismaAdapter(prisma),
});
