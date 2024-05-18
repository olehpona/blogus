import { signIn } from "@/lib/api/userService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const apiResponse = await signIn(data.email, data.password);
  if (apiResponse.status) {
    const cookiesStore = cookies();
    cookiesStore.set("auth_token", apiResponse.token as string, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    });
      return NextResponse.json({ message: "Success" }, { status: 200 });
  } else {
    return NextResponse.json(
      { status: false, message: "Can't login. Try later." },
      { status: 500 }
    );
  }
}

