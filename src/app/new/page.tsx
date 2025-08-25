"use client";

import { useState } from "react";
import { createEmptyDino } from "@/lib/varInit";
import { Dino, labels } from "@/types";

export default function Page() {
  const [espece, setEspece] = useState<Dino>(createEmptyDino());
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/new-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(espece),
      });
      if (!res.ok) throw new Error("Failed to submit to new-entry API");
      const json = await res.json();
      if (json.success) setStatus("Enregistré");
      else setStatus("Erreur API: " + json.error);
    } catch (err) {
      console.error(err);
      setStatus("Une erreur est survenue");
    }
  }
  
  const handleChange = (key: keyof Dino, value: string) => {
    setEspece((prev) => ({ ...prev!, [key]: value }));
  };

  function updateList(
    index: number,
    key: keyof Dino,
    value: string,
  ) {
    setEspece((prev) => {
      const updated = [...(prev[key] as string[])];
      updated[index] = value;
      return { ...prev, [key]: updated };
    });
  }

  function removeFromList(
    index: number,
    key: keyof Dino,
  ) {
    setEspece((prev) => {
      const updated = (prev[key] as string[]).filter((_, i) => i!==index);
      return { ...prev, [key]: updated };;
    });
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 h-fit w-fit backdrop-nblur-xs backdrop-brightness-50 p-4 rounded-2xl border-2 border-gray-500">
        {[
          "nom", "hauteur", "longueur", "poids", "region",
          "periode_debut", "periode_fin", "regime", "annee_decouv",
          "etymologie", "embranchement", "sous_embranchement",
          "super_classe", "classe", "sous_classe", "infra_classe",
          "super_ordre", "ordre", "sous_ordre", "infra_ordre", "micro_ordre",
          "super_famille", "famille", "sous_famille", "tribu", "genre", "image", "img_squelette",
        ].map((key) => (
          <div key={key} className="flex justify-between">
            <label htmlFor={key}>{labels[key as keyof Dino]}</label>
            <input
              id={key}
              className="border-b"
              type={["image", "img_squelette"].includes(key) ? "url" : "text"}
              required={["nom", "hauteur", "longueur", "poids", "region", "periode_debut", "periode_fin", "regime", "annee_decouv", "etymologie", "image"].includes(key)}
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
          <option disabled value="" className={espece.categorie ? "hidden" : "block"}>
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
              <label htmlFor={`cousin-${index}`}>Cousin n°{index+1}</label>
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
      {status && (
        <p
          className={`fixed right-0 top-0 bg-white text-black p-4 m-2 rounded-3xl`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
