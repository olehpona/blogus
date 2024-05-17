import { verify } from "@/lib/api/auth";
import { getParentHierarchy } from "@/lib/api/threadService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type Params = {
    thread: string
}

export async function GET(req: Request, context: { params: Params }) {
      const cookiesStore = cookies();
      if (cookiesStore.has("auth_token")) {
        const payload = await verify(
          cookiesStore.get("auth_token")?.value as string
        );
        if (payload.state) {
          cookiesStore.set("auth_token", payload.newToken as string);
          const apiResponse = await getParentHierarchy(context.params.thread);
          return NextResponse.json({status: true, data: apiResponse})
        }
      }
      return NextResponse.json(
        { status: false, message: "Unauthorized" },
        { status: 401 }
      );
}