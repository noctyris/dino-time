import { Dino } from "@/types";
import Link from "next/link";

export default function MainCard({dino}: {dino: Dino} ) {
  return (
      <Link href={`/espece/${dino.id}`} className="w-fit h-fit bg-gray-500 p-2 rounded-xl">
        {dino.nom}
      </Link>
  )
}
