export const dynamic = "force-dynamic";

import { fetchData } from "@/lib/data";
import MainCard from "@/components/MainCard";
import { Dino } from "@/types";

export default async function Home() {
  const rawDinos = await fetchData();
  const dinos = rawDinos.map((d) => <MainCard key={d.id} dino={d as Dino} />);

  return (
    <>
      <div className="w-full p-4 grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(150px,250px))] justify-center">{dinos}</div>
    </>
  );
}
