import ThreadCard from "./thread-card";

export default function Popular(){
    return (
        <>
        <h2 className="text-xl">Popular threads</h2>
        <div className="w-1/2">
            <ThreadCard name="Test" description="Test"></ThreadCard>
        </div>
        </>
    )
}