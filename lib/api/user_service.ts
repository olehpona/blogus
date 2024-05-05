import { PrismaClient } from "@prisma/client/edge";
const prisma = new PrismaClient();

export default class UserService {
  static login(
    email: string,
    password: string
  ): { status: string; token?: string } {
    return { status: "OK" };
  }
}
