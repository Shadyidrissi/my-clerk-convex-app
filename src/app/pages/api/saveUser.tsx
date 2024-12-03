import connectToDB from "../../../lib/connectToDB";
import User from "../../../../models/User";
import { currentUser } from "@clerk/nextjs/server";

export default async function handler(req:any, res:any) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  await connectToDB();

  const user = await currentUser(); // احصل على المستخدم الحالي

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const existingUser = await User.findOne({ clerkId: user.id });

  if (!existingUser) {
    await User.create({
      clerkId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0].emailAddress,
    });
  }

  res.status(200).send("User saved");
}
