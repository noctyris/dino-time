import { Dino } from "@/types";
import Link from "next/link";

export default function MainCard({ dino }: { dino: Dino }) {
  return (
    <Link
      href={`/espece/${dino.id}`}
      className="w-full h-full bg-gray-500 p-2 rounded-xl flex flex-col justify-center items-center"
    >
      {dino.nom}
    </Link>
  );
}
