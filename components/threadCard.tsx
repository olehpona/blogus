import Link from "next/link";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { ThreadInfo } from "@/lib/types";

export default function ThreadCard(props: {data: ThreadInfo}){
    return (
        <Link href={`/forum/${props.data.id}`} className="w-full">
            <Card className="p-2">
                <CardTitle>
                    {props.data.name}
                </CardTitle>
                <CardDescription>
                    {props.data.description}
                </CardDescription>
            </Card>
        </Link>
    )
}