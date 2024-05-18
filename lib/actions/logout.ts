"use server"

import { cookies } from "next/headers"

export default async function logOut(){
    const cookiesStore = cookies();
    cookiesStore.delete("auth_token");
}