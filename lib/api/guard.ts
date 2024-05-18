"use server"

import { UserInfo } from "../types";
import { verify } from "./auth";
import { cookies } from "next/headers";

export async function Guard(): Promise<null | UserInfo> {
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
      return payload.data as UserInfo;
    } else {
      cookiesStore.delete("auth_token");
      return null;
    }
  } else {
    return null;
  }
}
