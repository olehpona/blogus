import { verify } from "@/lib/api/auth";
import { updateUserInfo } from "@/lib/api/userService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookiesStore = cookies();
  if (cookiesStore.has("auth_token")) {
    const payload = await verify(
      cookiesStore.get("auth_token")?.value as string
    );
    if (payload.state) {
      cookiesStore.set("auth_token", payload.newToken as string, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      });
      const apiResponse = await updateUserInfo(await req.json());
      if (apiResponse.state) {
        return NextResponse.json(
          { status: true, message: "Success" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { status: false, message: "Something went wrong" },
          { status: 500 }
        );
      }
    }
  }
  return NextResponse.json(
    { status: false, message: "Unauthorized" },
    { status: 401 }
  );
}
