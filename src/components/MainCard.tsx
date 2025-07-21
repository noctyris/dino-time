import { Dino } from '@/types';

export default function MainCard({dino}: {Dino}) {
  return (
    <>
      <p>{dino.nom}</p>
    </>
  )
}
