// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

type Data = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "POST") {
    const { email, password, username } = req.body;
    if (!email || !email.includes("@") || !password) {
      // Future improvements on additional checks on password such as length and strength
      res.status(422).json({ message: "Invalid data" });
      return;
    }
    const checkExisting = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkExisting) {
      res.status(422).json({ message: "User already exists" });
      return;
    }
    const User = await prisma.user.create({
      data: {
        email: email,
        // hash(plain text password, no. of salting rounds)
        hash: await hash(password, 12),
        username: username,
      },
    });
    res.status(201).json({ message: "User created" });
  } else {
    // response if method is not POST
    res.status(500).json({ message: "Route not valid" });
  }
}
