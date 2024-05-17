import { verify } from "@/lib/api/auth";
import { createThread } from "@/lib/api/threadService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookiesStore = cookies();
  if (cookiesStore.has("auth_token")) {
    const payload = await verify(
      cookiesStore.get("auth_token")?.value as string
    );
    if (payload.state) {
      cookiesStore.set("auth_token", payload.newToken as string);
      const body = await req.json();
      const apiResponse = await createThread(
        body.name,
        body.description,
        body.parentId
      );
      if (apiResponse.status) {
        return NextResponse.json(
          { status: true, message: "Success" },
          { status: 201 }
        );
      } else {
        console.log(apiResponse.message)
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