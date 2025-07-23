"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import SectionTitle from "@/ui/sectionTitle";
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
  return (
    <div className="p-2">
      <h2 className="text-2xl important">{espece.nom}</h2>
      <section>
        <SectionTitle text="Caractéristiques physiques" />
        <div className="flex w-full md:w-4/5 items-center gap-2">
          <p>Poids: {espece.poids}</p>
          <div className="gap-2">
            <p>Hauteur: {espece.hauteur}</p>
            <p>Longueur: {espece.longueur}</p>
          </div>
        </div>
      </section>
      <section>
        <SectionTitle text="Vie" />
        <p>Régime: {espece.regime}</p>
        <p>Région: {espece.region}</p>
        <p>
          Période: {espece.periode_debut} - {espece.periode_fin}
        </p>
      </section>
    </div>
  );
}
