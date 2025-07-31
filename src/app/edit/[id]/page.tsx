"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { createEmptyDino } from "@/lib/varInit";
import { useParams } from "next/navigation";
import { Dino, labels } from "@/types";
import Loading from "@/ui/loading";

export default function Page() {
  const { id } = useParams();
  const [espece, setEspece] = useState<Dino>(createEmptyDino());
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!espece) return;

    try {
      const res = await fetch(`/api/edit-entry?id=${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(espece),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Échec");

      setStatus("Enregistré");
    } catch (err) {
      console.error(err);
      setStatus("Une erreur est survenue");
    }
  }

  return (
    <>
      {error && <p className="text-red-500">Erreur: {error}</p>}
      {espece ? (
        <Form
          espece={espece}
          setEspece={setEspece}
          handleSubmit={handleSubmit}
        />
      ) : (
        !error && <Loading />
      )}
      {status && (
        <p className="fixed right-0 top-0 bg-white text-black p-4 m-2 rounded-3xl">
          {status}
        </p>
      )}
    </>
  );
}

function Form({
  espece,
  setEspece,
  handleSubmit,
}: {
  espece: Dino;
  setEspece: Dispatch<SetStateAction<Dino>>;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  const handleChange = (key: keyof Dino, value: string) => {
    setEspece((prev) => ({ ...prev!, [key]: value }));
  };

  const updateList = (
    index: number,
    key: keyof Dino,
    value: string
  ) => {
    setEspece((prev) => {
      const updated = [...(prev[key] as string[])];
      updated[index] = value;
      return { ...prev, [key]: updated };
    });
  };

  const removeFromList = (
    index: number,
    key: keyof Dino
  ) => {
    setEspece((prev) => {
      const updated = (prev[key] as string[]).filter((_, i) => i !== index);
      return { ...prev, [key]: updated };
    });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 h-fit w-fit backdrop-blur-xs backdrop-brightness-50 p-4 rounded-2xl border-2 border-gray-500">
        {[
          "nom", "hauteur", "longueur", "poids", "region",
          "periode_debut", "periode_fin", "regime", "annee_decouv",
          "etymologie", "embranchement", "sous_embranchement",
          "super_classe", "classe", "sous_classe", "infra_classe",
          "super_ordre", "ordre", "sous_ordre", "infra_ordre", "micro_ordre",
          "super_famille", "famille", "sous_famille", "tribu", "genre", "image"
        ].map((key) => (
          <div key={key} className="flex justify-between">
            <label htmlFor={key}>{labels[key as keyof Dino]}</label>
            <input
              id={key}
              className="border-b"
              required={["nom", "hauteur", "longueur", "poids", "region", "periode_debut", "periode_fin", "regime", "annee_decouv", "etymologie", "genre", "image"].includes(key)}
              value={espece[key as keyof Dino] as string}
              onChange={(e) => handleChange(key as keyof Dino, e.target.value)}
            />
          </div>
        ))}

        <select
          value={espece.categorie || ""}
          onChange={(e) => handleChange("categorie", e.target.value)}
          className="border-1 p-1 rounded-xl"
          required={true}
        >
          <option disabled value="">
            Catégorie
          </option>
          <option>Dinosaure</option>
          <option>Reptile marin</option>
          <option>Reptile volant</option>
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={espece.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          cols={50}
          className="w-full border-1 rounded-xl resize-none"
        />

        <div className="flex flex-col items-center justify-center my-4">
          {espece.cousins.map((c, index) => (
            <div key={index} className="flex gap-2 items-center w-full justify-between">
              <label htmlFor={`cousin-${index}`}>Cousin n°{index + 1}</label>
              <input
                id={`cousin-${index}`}
                value={c}
                className="border-b"
                onChange={(e) => updateList(index, "cousins", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeFromList(index, "cousins")}
                className="text-red-600 hover:underline ml-2"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="hover:underline mt-2"
            onClick={() =>
              setEspece((prev) => ({ ...prev, cousins: [...prev.cousins, ""] }))
            }
          >
            Ajouter un cousin
          </button>
        </div>

        <div className="flex flex-col items-center justify-center my-4">
          {espece.especes_inf.map((c, index) => (
            <div key={index} className="flex gap-2 items-center w-full justify-between">
              <label htmlFor={`cousin-${index}`}>Espèce inférieure n°{index + 1}</label>
              <input
                id={`especeInf-${index}`}
                value={c}
                className="border-b"
                onChange={(e) => updateList(index, "especes_inf", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeFromList(index, "especes_inf")}
                className="text-red-600 hover:underline ml-2"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="hover:underline mt-2"
            onClick={() =>
              setEspece((prev) => ({ ...prev, especes_inf: [...prev.especes_inf, ""] }))
            }
          >
            Ajouter une espèce de rang inférieur
          </button>
        </div>

        <div className="flex flex-col items-center justify-center my-4">
          {espece.clades.map((c, index) => (
            <div key={index} className="flex gap-2 items-center w-full justify-between">
              <label htmlFor={`clade-${index}`}>Cousin n°{index + 1}</label>
              <input
                id={`clade-${index}`}
                value={c}
                className="border-b"
                onChange={(e) => updateList(index, "clades", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeFromList(index, "clades")}
                className="text-red-600 hover:underline ml-2"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="hover:underline mt-2"
            onClick={() =>
              setEspece((prev) => ({ ...prev, clades: [...prev.clades, ""] }))
            }
          >
            Ajouter une clade
          </button>
        </div>

        <input
          type="submit"
          className="hover:underline"
          value="💾 Sauvegarder"
        />
      </form>
    </div>
  );
}


