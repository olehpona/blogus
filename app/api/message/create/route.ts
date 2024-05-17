import { verify } from "@/lib/api/auth";
import { comment, createMessage, reply } from "@/lib/api/messageService";
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
      let apiResponse;
      if (body.type === "message") {
        apiResponse = await createMessage(
          payload.data?.id as string,
          body.threadId,
          body.value
        );
      } else if (body.type === "comment") {
        apiResponse = await comment(
          body.messageId,
          payload.data?.id as string,
          body.value
        );
      } else if (body.type === "reply") {
        apiResponse = await reply(
          body.messageId,
          body.parentId,
          payload.data?.id as string,
          body.value
        );
      } else {
        return NextResponse.json({ status: false }, { status: 417 });
      }
      if (apiResponse.status) {
        return NextResponse.json({ status: true, message: "Success" });
      }
      return NextResponse.json(
        { status: false, message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json(
    { status: false, message: "Unauthorized" },
    { status: 401 }
  );
}
