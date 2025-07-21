import { Dino } from "@/types";

export default function MainCard({dino}: {dino: Dino} ) {
  return (
    <>
      <p>{dino.nom}</p>
    </>
  )
}
