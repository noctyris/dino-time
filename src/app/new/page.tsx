"use client";

import { useState, Dispatch, SetStateAction } from "react";

export default function Page() {
  const [nom, setNom] = useState("");
  const [hauteur, setHauteur] = useState("");
  const [longueur, setLongueur] = useState("");
  const [poids, setPoids] = useState("");
  const [region, setRegion] = useState("");
  const [periodeDebut, setPeriodeDebut] = useState("");
  const [periodeFin, setPeriodeFin] = useState("");
  const [cousins, setCousins] = useState<string[]>([]);
  const [especesInf, setEspecesInf] = useState<string[]>([]);
  const [regime, setRegime] = useState("");
  const [anneeDecouv, setAnneeDecouv] = useState("");
  const [etymologie, setEtymologie] = useState("");
  const [embranchement, setEmbranchement] = useState("");
  const [sousEmbranchement, setSousEmbranchement] = useState("");
  const [superClasse, setSuperClasse] = useState("");
  const [classe, setClasse] = useState("");
  const [sousClasse, setSousClasse] = useState("");
  const [infraClasse, setInfraClasse] = useState("");
  const [superOrdre, setSuperOrdre] = useState("");
  const [ordre, setOrdre] = useState("");
  const [sousOrdre, setSousOrdre] = useState("");
  const [infraOrdre, setInfraOrdre] = useState("");
  const [microOrdre, setMicroOrdre] = useState("");
  const [superFamille, setSuperFamille] = useState("");
  const [famille, setFamille] = useState("");
  const [sousFamille, setSousFamille] = useState("");
  const [tribu, setTribu] = useState("");
  const [genre, setGenre] = useState("");
  const [clades, setClades] = useState<string[]>([]);
  const [categorie, setCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/new-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          hauteur,
          longueur,
          poids,
          region,
          periode_debut: periodeDebut,
          periode_fin: periodeFin,
          cousins,
          especes_inf: especesInf,
          regime,
          annee_decouv: anneeDecouv,
          etymologie,
          embranchement,
          sous_embranchement: sousEmbranchement,
          super_classe: superClasse,
          classe,
          sous_classe: sousClasse,
          infra_classe: infraClasse,
          super_ordre: superOrdre,
          ordre,
          sous_ordre: sousOrdre,
          infra_ordre: infraOrdre,
          micro_ordre: microOrdre,
          super_famille: superFamille,
          famille,
          sous_famille: sousFamille,
          tribu,
          genre,
          clades,
          categorie,
          description,
        }),
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

  function updateList(
    index: number,
    set: Dispatch<SetStateAction<string[]>>,
    value: string,
  ) {
    set((prev: string[]) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }
  function removeFromList(
    index: number,
    set: Dispatch<SetStateAction<string[]>>,
  ) {
    set((prev: string[]) => prev.filter((_, i) => i != index));
  }

  return (
    <div className="flex justify-center items-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col h-fit w-fit gap-2">
        <label htmlFor="nom">Nom</label>
        <input
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          id="nom"
          className="border-b"
          required
        />
        <div>
          <label htmlFor="hauteur">Hauteur</label>
          <input
            value={hauteur}
            onChange={(e) => setHauteur(e.target.value)}
            id="hauteur"
            className="border-b"
            required
          />
          <label htmlFor="longueur">Longueur</label>
          <input
            value={longueur}
            onChange={(e) => setLongueur(e.target.value)}
            id="longueur"
            className="border-b"
            required
          />
        </div>
        <label htmlFor="poids">Poids</label>
        <input
          value={poids}
          onChange={(e) => setPoids(e.target.value)}
          id="poids"
          className="border-b"
          required
        />
        <label htmlFor="region">Region</label>
        <input
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          id="region"
          className="border-b"
          required
        />
        <label htmlFor="periodeDebut">Début de la période</label>
        <input
          value={periodeDebut}
          onChange={(e) => setPeriodeDebut(e.target.value)}
          id="periodeDebut"
          className="border-b"
          required
        />
        <label htmlFor="periodeFin">Fin de la période</label>
        <input
          value={periodeFin}
          onChange={(e) => setPeriodeFin(e.target.value)}
          id="periodeFin"
          className="border-b"
          required
        />
        <label htmlFor="regime">Régime</label>
        <input
          value={regime}
          onChange={(e) => setRegime(e.target.value)}
          id="regime"
          className="border-b"
          required
        />
        <label htmlFor="anneeDecouv">Année de découverte</label>
        <input
          value={anneeDecouv}
          onChange={(e) => setAnneeDecouv(e.target.value)}
          id="anneeDecouv"
          className="border-b"
          required
        />
        <label htmlFor="etymologie">Etymologie</label>
        <input
          value={etymologie}
          onChange={(e) => setEtymologie(e.target.value)}
          id="etymologie"
          className="border-b"
          required
        />
        <label htmlFor="embranchement">Embranchement</label>
        <input
          value={embranchement}
          onChange={(e) => setEmbranchement(e.target.value)}
          id="embranchement"
          className="border-b"
        />
        <label htmlFor="sousEmbranchement">Sous embranchement</label>
        <input
          value={sousEmbranchement}
          onChange={(e) => setSousEmbranchement(e.target.value)}
          id=""
          className="border-b"
        />
        <label htmlFor="superClasse">Super classe</label>
        <input
          value={superClasse}
          onChange={(e) => setSuperClasse(e.target.value)}
          id="superClasse"
          className="border-b"
        />
        <label htmlFor="classe">Classe</label>
        <input
          value={classe}
          onChange={(e) => setClasse(e.target.value)}
          id="classe"
          className="border-b"
        />
        <label htmlFor="sousClasse">Sous classe</label>
        <input
          value={sousClasse}
          onChange={(e) => setSousClasse(e.target.value)}
          id="sousClasse"
          className="border-b"
        />
        <label htmlFor="infraClasse">Infra classe</label>
        <input
          value={infraClasse}
          onChange={(e) => setInfraClasse(e.target.value)}
          id="infraClasse"
          className="border-b"
        />
        <label htmlFor="superOrdre">Super ordre</label>
        <input
          value={superOrdre}
          onChange={(e) => setSuperOrdre(e.target.value)}
          id="superOrdre"
          className="border-b"
        />
        <label htmlFor="ordre">Ordre</label>
        <input
          value={ordre}
          onChange={(e) => setOrdre(e.target.value)}
          id="ordre"
          className="border-b"
        />
        <label htmlFor="sousOrdre">Sous ordre</label>
        <input
          value={sousOrdre}
          onChange={(e) => setSousOrdre(e.target.value)}
          id="sousOrdre"
          className="border-b"
        />
        <label htmlFor="infraOrdre">Infra ordre</label>
        <input
          value={infraOrdre}
          onChange={(e) => setInfraOrdre(e.target.value)}
          id="infraOrdre"
          className="border-b"
        />
        <label htmlFor="microOrdre">Micro ordre</label>
        <input
          value={microOrdre}
          onChange={(e) => setMicroOrdre(e.target.value)}
          id="microOrdre"
          className="border-b"
        />
        <label htmlFor="superFamille">Super famille</label>
        <input
          value={superFamille}
          onChange={(e) => setSuperFamille(e.target.value)}
          id="superFamille"
          className="border-b"
        />
        <label htmlFor="famille">Famille</label>
        <input
          value={famille}
          onChange={(e) => setFamille(e.target.value)}
          id="famille"
          className="border-b"
        />
        <label htmlFor="sousFamille">Sous famille</label>
        <input
          value={sousFamille}
          onChange={(e) => setSousFamille(e.target.value)}
          id="sousFamille"
          className="border-b"
        />
        <label htmlFor="tribu">Tribu</label>
        <input
          value={tribu}
          onChange={(e) => setTribu(e.target.value)}
          id="tribu"
          className="border-b"
        />
        <label htmlFor="genre">Genre</label>
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          id="genre"
          className="border-b"
        />
        <select
          defaultValue="Catégorie"
          onChange={(e) => setCategorie(e.target.value)}
        >
          <option disabled className={categorie ? "hidden" : "block"}>
            Catégorie
          </option>
          <option>Dinosaure</option>
          <option>Reptile marin</option>
          <option>Reptile volant</option>
        </select>
        <div className="flex flex-col items-center justify-center my-4">
          {cousins.map((c, index) => (
            <div
              key={index}
              className="flex gap-2 items-center w-full justify-between"
            >
              <label htmlFor={`cousin-${index}`}>Cousin n°{index}</label>
              <input
                value={c}
                onChange={(e) => updateList(index, setCousins, e.target.value)}
                id={`cousin-${index}`}
                className="border-b"
              />
              <button
                type="button"
                onClick={() => removeFromList(index, setCousins)}
                className="text-red-600 hover:underline ml-2"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="hover:underline mt-2"
            onClick={() => setCousins([...cousins, ""])}
          >
            Ajouter un cousin
          </button>
        </div>
        <div className="flex flex-col items-center justify-center my-4">
          {especesInf.map((s, index) => (
            <div
              key={index}
              className="flex gap-2 items-center w-full justify-between"
            >
              <label htmlFor={`espInf-${index}`}>
                Espèce de rang inférieur n°{index}
              </label>
              <input
                value={s}
                onChange={(e) =>
                  updateList(index, setEspecesInf, e.target.value)
                }
                id={`espInf-${index}`}
                className="border-b"
              />
              <button
                type="button"
                onClick={() => removeFromList(index, setEspecesInf)}
                className="text-red-600 hover:underline ml-2"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="hover:underline mt-2"
            onClick={() => setEspecesInf([...especesInf, ""])}
          >
            Ajouter une espèce de rang inférieur
          </button>
        </div>
        <div className="flex flex-col items-center justify-center my-4">
          {clades.map((c, index) => (
            <div
              key={index}
              className="flex gap-2 items-center w-full justify-between"
            >
              <label htmlFor={`clade-${index}`}>Clade n°{index}</label>
              <input
                value={c}
                onChange={(e) => updateList(index, setClades, e.target.value)}
                id={`clade-${index}`}
                className="border-b"
              />
              <button
                type="button"
                onClick={() => removeFromList(index, setClades)}
                className="text-red-600 hover:underline ml-2"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="hover:underline mt-2"
            onClick={() => setClades([...clades, ""])}
          >
            Ajouter une clade
          </button>
        </div>
        <label htmlFor="desc">Description</label>
        <textarea
          className="w-full border-1 rounded-xl resize-none"
          value={description}
          rows={4}
          cols={50}
          id="desc"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" disabled={!categorie && !genre} className="hover:underline">
          Enregistrer
        </button>
      </form>
      {status && <p className={`fixed right-0 top-0 bg-white text-black p-4 m-2 rounded-3xl`}>{status}</p>}
    </div>
  );
}
