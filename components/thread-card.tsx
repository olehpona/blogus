import Link from "next/link";
import { Card, CardDescription, CardTitle } from "./ui/card";

export default function ThreadCard(props: {name: String, description: String}){
    return (
        <Link href="#" className="w-full">
            <Card className="p-2">
                <CardTitle>
                    {props.name}
                </CardTitle>
                <CardDescription>
                    {props.description}
                </CardDescription>
            </Card>
        </Link>
    )
}