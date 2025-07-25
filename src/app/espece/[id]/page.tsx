"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import SectionTitle from "@/ui/sectionTitle";
import { MassIcon, HeightIcon, LengthIcon } from "@/ui/svgIcons";
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
    return ((data.includes("/") ? "Entre " : "") + data.replace("~", "Environ ").replace("/", " et ")).replace("  ", " ")
  }
  const poids = formatData(espece.poids);
  const longueur = formatData(espece.longueur);
  const hauteur = formatData(espece.hauteur);

  return (
    <div className="p-2">
      <h2 className="text-2xl important">{espece.nom}</h2>
      <section>
        <SectionTitle text="Caractéristiques physiques" />
        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-4/5 items-center justify-center gap-2 my-3">
          <div className="flex bg-gray-500/75 rounded-2xl w-75 items-center py-2 px-5 mx-auto">
            <MassIcon />
            <span className="flex-1 text-center">{poids}</span>
          </div>
          <div className="gap-2 flex flex-col">
            <div className="flex bg-gray-500/75 rounded-2xl w-75 items-center py-2 px-5 mx-auto">
              <HeightIcon />
              <span className="flex-1 text-center">{hauteur}</span>
            </div>
            <div className="flex bg-gray-500/75 rounded-2xl w-75 items-center py-2 px-5 mx-auto">
              <LengthIcon />
              <span className="flex-1 text-center">{longueur}</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <SectionTitle text="Vie" />
        <p>Régime: {espece.regime}</p>
        <p>Région: {espece.region}</p>
        <p>
          Période:{" "}
          {espece.periode_debut === espece.periode_fin ? (
            <span>{espece.periode_fin}</span>
          ) : (
            <span>
              {espece.periode_debut} - {espece.periode_fin}
            </span>
          )}
        </p>
      </section>
      <section>
        <SectionTitle text="Liens" />
        <h4 className="important text-l font-semibold">Espèces cousines</h4>
        <div className="grid grid-columns-4">
          {espece.cousins.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
        <h4 className="important text-l font-semibold">
          Espèces de rang inférieur
        </h4>
        <div className="grid grid-columns-4">
          {espece.especes_inf.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
