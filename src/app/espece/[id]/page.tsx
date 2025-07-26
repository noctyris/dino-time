"use client";

import {
  MassIcon,
  HeightIcon,
  LengthIcon,
  DietIcon,
  RegionIcon,
  PeriodIcon,
} from "@/ui/svgIcons";
import DataCard from "@/components/DataCard";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Separator from "@/ui/separator";
import TableRow from "@/ui/tableRow";
import { Dino } from "@/types";

export default function Page() {
  const { id } = useParams();
  const [espece, setEspece] = useState<Dino | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/getSpecies?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setEspece(data))
      .catch((err) => setError(err.message));
  }, [id]);

  return (
    <>
      {error && <p className="text-red-500">Erreur : {error}</p>}
      {espece ? <DetailedPage espece={espece} /> : <p>Chargement...</p>}
    </>
  );
}

function DetailedPage({ espece }: { espece: Dino }) {
  function formatData(data: string) {
    return (
      (data.includes("/") ? "Entre " : "") +
      data.replace("~", "Environ ").replace("/", " et ")
    ).replace("  ", " ");
  }
  const poids = formatData(espece.poids);
  const longueur = formatData(espece.longueur);
  const hauteur = formatData(espece.hauteur);

  return (
    <div className="p-2">
      <h2 className="text-2xl important">{espece.nom}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full md:w-4/5 items-center justify-center gap-2 my-3 mx-auto">
        <DataCard icon={<MassIcon />} data={poids} />
        <DataCard icon={<HeightIcon />} data={hauteur} />
        <DataCard icon={<LengthIcon />} data={longueur} />
      </div>
      <div className="grid grid-cols-3 w-full md:w-4/5 mx-auto items-center justify-center gap-2 my-3">
        <DataCard icon={<DietIcon />} data={espece.regime} />
        <DataCard icon={<RegionIcon />} data={espece.region} />
        <DataCard
          icon={<PeriodIcon />}
          data={
            espece.periode_debut === espece.periode_fin
              ? espece.periode_fin
              : `${espece.periode_debut} - ${espece.periode_fin}`
          }
        />
      </div>
      <div>
        <p>Découvert en {espece.annee_decouv}</p>
        <p><b>Etymologie:{' '}</b><br />{espece.etymologie}</p>
      </div>
      <Separator />
      <div className="flex gap-x-2">
        <div className="w-1/2">
          <h4 className="important text-xl font-semibold shadow-xl/50 shadow-(--accent)">Espèces cousines</h4>
          <div className="grid grid-cols-3">
            {espece.cousins.map((e) => (
              <p key={e}>{e}</p>
            ))}
          </div>
        </div>
        <div className="w-1/2">
         <h4 className="important text-xl font-semibold">
            Espèces de rang inférieur
          </h4>
          <div className="grid grid-cols-3">
            {espece.especes_inf.map((e) => (
              <p key={e}>{e}</p>
            ))}
          </div>
        </div>
      </div>
      <Separator />
      <table className="mx-auto">
        <tbody>
          <TableRow data={espece.embranchement} nom="Embranchement" />
          <TableRow data={espece.sous_embranchement} nom="Sous embranchement" />
          <TableRow data={espece.super_classe} nom="Super classe" />
          <TableRow data={espece.classe} nom="Classe" />
          <TableRow data={espece.sous_classe} nom="Sous classe" />
          <TableRow data={espece.infra_classe} nom="Infra classe" />
          <TableRow data={espece.super_ordre} nom="Super ordre" />
          <TableRow data={espece.ordre} nom="Ordre" />
          <TableRow data={espece.sous_ordre} nom="Sous ordre" />
          <TableRow data={espece.infra_ordre} nom="Infra ordre" />
          <TableRow data={espece.micro_ordre} nom="Micro ordre" />
          <TableRow data={espece.super_famille} nom="Super famille" />
          <TableRow data={espece.famille} nom="Famille " />
          <TableRow data={espece.sous_famille} nom="Sous famille" />
        </tbody>
      </table>
    </div>
  );
}
