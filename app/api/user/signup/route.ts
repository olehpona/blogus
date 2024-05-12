import { signUp } from '@/lib/api/userService';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const values = await req.json();
  const response = await signUp(values.firstName, values.lastName, values.email, values.nickName, values.password);
  console.log(values)
  if (response.status) {
    const cookiesStore = cookies();
    cookiesStore.set("auth_token", response.token as string, {
      httpOnly: true,
    });
    return NextResponse.json(
      { message: "Success" },
      { status: 201 }
    );;
  } else {
    return NextResponse.json({ status: false, message: "Can't register. Try later." }, {status: 500});
  }
}