import HomeSearchBar from "@/components/HomeSearchBar";
import HomeContent from "@/components/HomeContent";

export default function Home() {

  return (
    <main className="bg-blue-0 h-full overflow-auto p-5">
      <HomeSearchBar />
      <HomeContent />
    </main>
  );
}


