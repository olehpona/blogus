import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { UserInfo } from "../types";
import prisma from "../db";

export async function verify(
  token: string
): Promise<{ state: boolean; reason?: String; data?: UserInfo; newToken?: string }> {
  try {
    const payload = jwt.verify(token, process.env.PUBLIC_KEY as string, {
      algorithms: ["RS256"],
    }) as jwt.JwtPayload;
    const user = (await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    })) as User;
    if (payload.password === user.password) {
      return { state: true, data: user, newToken: await getToken({userData: user}) };
    } else {
      return { state: false, reason: "Hash compare error" };
    }
  } catch (err) {
    return { state: false, reason: (err as Error).message };
  }
}

export async function getToken(data: {email?: string, password?: string, userData?: User}): Promise<string> {
  if (data.email && data.password) {
    const user = (await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    })) as User;
    if (await bcrypt.compare(data.password, user.password)) {
      return jwt.sign(
        { id: user.id, password: user.password },
        process.env.PRIVATE_KEY as string,
        { algorithm: "RS256" }
      );
    } else {
      throw new Error("Hash compare error");
    }
  } else if (data.userData) {
    return jwt.sign(
      { id: data.userData.id, password: data.userData.password },
      process.env.PRIVATE_KEY as string,
      { algorithm: "RS256" }
    );
  } else {
    throw new Error("Email, password or UserData should be provided");
  }

}
