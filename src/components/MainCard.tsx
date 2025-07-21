import { Dino } from '@/types';

export default function MainCard({dino}: {Dino}) {
  console.log(dino)
  return (
    <>
      <p>{dino.nom}</p>
    </>
  )
}
