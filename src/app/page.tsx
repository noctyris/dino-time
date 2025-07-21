export const dynamic = "force-dynamic";

import { fetchData } from "@/app/lib/data";
import MainCard from "@/components/MainCard";
import { Dino } from "@/types";

export default async function Home() {
  const rawDinos = await fetchData();
  const dinos = rawDinos.map((d) => (
    <MainCard key={d.id} dino={d as Dino} />
  ));

  return (
    <>
      {dinos}
    </>
  );
}
