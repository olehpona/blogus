import { PrismaClient } from "@prisma/client";
import { getToken } from "./auth";
import { UserInfo } from "../types";
import prisma from "../db"
import bcrypt from "bcrypt";
import "dotenv/config";

export async function signIn(
  email: string,
  password: string
): Promise<{ status: boolean; token?: string }> {
  try {
    return {
      status: true,
      token: await getToken({ email: email, password: password }),
    };
  } catch (e) {
    return { status: false};
  }
}

export async function signUp(
  firstName: string,
  lastName: string,
  email: string,
  nickName: string,
  password: string
): Promise<{ status: boolean ,message: string; token?: string }> {
  try {
    console.log(process.env.SALT);
    console.log(password)
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT as string)
    );
    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        nickName: nickName,
        email: email,
        password: passwordHash,
      },
    });
    return { status: true, message: "success", token: await getToken({ userData: user }) };
  } catch (e) {
    return { status: false, message: (e as Error).message };
  }
}

export async function updateUserPassword(
  userId: string,
  password: string
): Promise<{ state: boolean; message: string }> {
  try {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT as string)
    );
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: passwordHash,
      },
    });
    return { state: true, message: "success" };
  } catch (e) {
    return { state: false, message: (e as Error).message };
  }
}

export async function updateUserInfo(data: UserInfo): Promise<{state: boolean}>{
  try{
    let user = await prisma.user.update({where: {id: data.id}, data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      nickName: data.nickName
    }})
    return {state: true}
  } catch (e) {
    return {state: false}
  }

}
