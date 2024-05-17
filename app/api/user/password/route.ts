import { getToken, verify } from "@/lib/api/auth";
import { updateUserPassword } from "@/lib/api/userService";
import { UserInfo } from "@/lib/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookiesStore = cookies();
  if (cookiesStore.has("auth_token")) {
    const payload = await verify(
      cookiesStore.get("auth_token")?.value as string
    );
    if (payload.state) {
      const body = await req.json();
      const apiResponse = await updateUserPassword(
        (payload.data as UserInfo).id,
        body.password
      );
      if (apiResponse.state) {
        cookiesStore.set(
          "auth_token",
          await getToken({
            email: (payload.data as UserInfo).email,
            password: body.password,
          })
        );
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
