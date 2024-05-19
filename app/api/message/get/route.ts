import { getComment, getMessages } from "@/lib/api/messageService";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json()
    let apiResponse;
    if (body.type === "message"){
        apiResponse = await getMessages(body.page, body.threadId); 
    } else if (body.type === "comment"){
        apiResponse = await getComment(body.page, body.messageId);
    } else {
        return NextResponse.json({status: false}, {status: 418});
    }
    if (apiResponse.status){
        return NextResponse.json({status: true, data: apiResponse.data});
    }
    return NextResponse.json({status: false}, {status: 500})
}