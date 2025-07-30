"use client";

import {
  MassIcon,
  HeightIcon,
  LengthIcon,
  DietIcon,
  RegionIcon,
  PeriodIcon,
  TableIcon,
} from "@/ui/svgIcons";
import DataCard from "@/components/DataCard";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Separator from "@/ui/separator";
import TableRow from "@/ui/tableRow";
import Loading from "@/ui/loading";
import { Dino } from "@/types";

export default function Page() {
  const { id } = useParams();
  const [espece, setEspece] = useState<Dino | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tableView, setTableView] = useState<boolean>(false);

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
      <button
        type="button"
        className={`fixed bottom-0 right-0 p-2 m-2 rounded-full ${tableView ? "bg-(--accent)" : "bg-transparent"}`}
        onClick={() => setTableView(!tableView)}
      >
        {espece && <TableIcon />}
      </button>
      {error && <p className="text-red-500">Erreur : {error}</p>}
      {espece ? (
        tableView ? (
          <TableDetailedPage espece={espece} />
        ) : (
          <FreeDetailedPage espece={espece} />
        )
      ) : (
        !error && <Loading />
      )}
    </>
  );
}

function TableDetailedPage({ espece }: { espece: Dino }) {
  const poids = formatData(espece.poids);
  const longueur = formatData(espece.longueur);
  const hauteur = formatData(espece.hauteur);

  return (
    <div className="p-2">
      <h2 className="text-2xl important">{espece.nom}</h2>
      <table className="mx-auto w-4/5">
        <tbody>
          <TableRow
            data={`${longueur} × ${hauteur}`}
            nom="Dimensions"
          />
          <TableRow data={poids} nom="Poids" />
          <TableRow data={espece.region} nom="Région" />
          <TableRow data="Animalia" nom="Règne" />
          <TableRow
            data={
              espece.periode_debut === espece.periode_fin
                ? espece.periode_fin
                : `${espece.periode_debut} - ${espece.periode_fin}`
            }
            nom="Période"
          />
          <TableRow data={espece.regime} nom="Régime" />
          <TableRow data={espece.annee_decouv} nom="Année de découverte" />
          <TableRow data={espece.etymologie} nom="Etymologie" />
          <TableRow data={espece.cousins.join(", ")} nom="Espèces cousines" />
          <TableRow
            data={espece.especes_inf.join(", ")}
            nom="Espèces de rang inférieur"
          />
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
          <TableRow data={espece.tribu} nom="Tribu" />
          <TableRow data={espece.genre} nom="Genre" />
          <TableRow data={espece.categorie} nom="Catégorie" />
          <TableRow data={espece.categorie.includes("Dino") ? "Dinosaure" : "Reptile"} nom="Type" />
          <TableRow data={espece.clades.join(", ")} nom="Clades" />
        </tbody>
      </table>
    </div>
  );
}

function FreeDetailedPage({ espece }: { espece: Dino }) {
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
      <div className="w-full md:w-2/3 mx-auto">
        <p>Découvert en {espece.annee_decouv}</p>
        <p className="mt-2">
          <b>Etymologie : </b>
          <br />
          {espece.etymologie}
        </p>
        <p className="mt-2">Règne : Animalia</p>
        <p className="mt-2">Type : {espece.categorie.includes("Dino") ? "Dinosaure" : "Reptile"}</p>
      </div>
      <Separator />
      <div className="mx-auto w-fit flex flex-col md:flex-row gap-2">
        {espece.cousins.length > 0 && (
          <div>
            <h4 className="important text-xl font-semibold shadow-xl/50 shadow-(--accent)">
              Espèces cousines
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {espece.cousins.map((e) => (
                <p
                  key={e}
                  className="bg-gray-500/75 rounded-xl p-2 text-center"
                >
                  {e}
                </p>
              ))}
            </div>
          </div>
        )}
        {espece.especes_inf.length > 0 && (
          <div>
            <h4 className="important text-xl font-semibold">
              Espèces de rang inférieur
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {espece.especes_inf.map((e) => (
                <p
                  key={e}
                  className="bg-gray-500/75 rounded-xl p-2 text-center"
                >
                  {e}
                </p>
              ))}
            </div>
          </div>
        )}
        {espece.clades.length > 0 && (
          <div>
            <h4 className="important text-xl font-semibold">Clades</h4>
            <div className="grid grid-cols-3">
              {espece.clades.map((e) => (
                <p key={e}>{e}</p>
              ))}
            </div>
          </div>
        )}
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
          <TableRow data={espece.tribu} nom="Tribu" />
          <TableRow data={espece.genre} nom="Genre" />
          <TableRow data={espece.categorie} nom="Catégorie" />
        </tbody>
      </table>
      <Separator />
      <div className="w-full md:w-1/2">{espece.description}</div>
    </div>
  );
}

function formatData(data: string) {
  return (
    (data.includes("/") ? "Entre " : "") +
    data.replace("~", "Environ ").replace("/", " et ")
  ).replace("  ", " ");
}
