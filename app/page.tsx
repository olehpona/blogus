import Title from "@/components/title";
import Popular from "@/components/popular";


export default function Home() {
  return (
    <div className="w-full grow flex flex-col items-center py-16 space-y-8">
      <Title></Title>
      <Popular></Popular>
    </div>
  );
}
