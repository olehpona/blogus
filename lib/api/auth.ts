import { User, PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken"
import "dotenv/config";
import bcrypt from "bcrypt";
import { ifError } from "assert";
const prisma = new PrismaClient();

export default class Auth {
  static async verify(token: string): Promise<{ state: boolean, reason?: String, data?: {id: String} }> {
    try{
        const payload = jwt.verify(token, process.env.PUBLIC_KEY as string, {algorithms: ["RS256"]}) as jwt.JwtPayload;
        const user = await prisma.user.findFirst({
            where: {
                id: payload.id
            }
        }) as User
        if (
          await bcrypt.compare(
            payload.password,
            user.password
          )
        ) {
            return {state: true, data: {id: user.id}}
        } else {
            return { state: false, reason: "Hash compare error" };
        }
    } catch (err) {
        return {state: false, reason: (err as Error).message}
    }
  }

  static async getToken(id: string, password: string): Promise<string>{
    const user = (await prisma.user.findFirst({
        where: {
        id: id,
        },
    })) as User;
    if (await bcrypt.compare(password, user.password)) {
        return jwt.sign(
          { id: id, password: password },
          process.env.PRIVATE_KEY as string,
          { algorithm: "RS256" }
        );
    } else {
        throw new Error("Hash compare error")
    }
  }
}
