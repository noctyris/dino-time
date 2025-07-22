"use client";

import { useState, Dispatch, SetStateAction } from "react";

export default function Page() {
  const [nom,setNom] = useState("");
  const [taille,setTaille] = useState<number>();
  const [poids,setPoids] = useState<number>();
  const [region,setRegion] = useState("");
  const [periodeDebut,setPeriodeDebut] = useState("");
  const [periodeFin,setPeriodeFin] = useState("");
  const [cousins,setCousins] = useState<string[]>([]);
  const [especesInf,setEspecesInf] = useState<string[]>([]);
  const [regime,setRegime] = useState("");
  const [anneeDecouv,setAnneeDecouv] = useState("");
  const [ethymologie,setEthymologie] = useState("");
  const [superOrdre,setSuperOrdre] = useState("");
  const [ordre,setOrdre] = useState("");
  const [sousOrdre,setSousOrdre] = useState("");
  const [infraOrdre,setInfraOrdre] = useState("");
  const [microOrdre,setMicroOrdre] = useState("");
  const [superFamille,setSuperFamille] = useState("");
  const [famille,setFamille] = useState("");
  const [sousFamille,setSousFamille] = useState("");
  const [tribu,setTribu] = useState("");
  const [genre,setGenre] = useState("");
  const [clade,setClade] = useState("");
  const [status,setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/new-entry", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          nom, taille, poids, region, periode_debut: periodeDebut, periode_fin: periodeFin,
          cousins, especes_inf: especesInf, regime, annee_decouv: anneeDecouv, ethymologie,
          super_ordre: superOrdre, ordre, sous_ordre: sousOrdre, infra_ordre: infraOrdre,
          micro_ordre: microOrdre, super_famille: superFamille, famille,
          sous_famille: sousFamille, tribu, genre, clade
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

  function updateList(index: number, set: Dispatch<SetStateAction<string[]>>, value: string) {
    set((prev: string[]) => {
      const updated = [ ...prev ];
      updated[index] = value;
      return updated;
    })
  }
  function removeFromList(index: number, set: Dispatch<SetStateAction<string[]>>) {
    set((prev: string[]) => prev.filter((_,i) => i!=index));
  }

  return (
    <div className="flex justify-center items-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col h-fit w-fit gap-2">
        <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" className="border-b" required />
        <input value={taille !== undefined ? taille : ""} type="number" onChange={(e) => setTaille(e.target.value === '' ? undefined : parseFloat(e.target.value))} placeholder="Taille" className="border-b" required />
        <input value={poids !== undefined ? poids : ""} type="number" onChange={(e) => setPoids(e.target.value === '' ? undefined : parseFloat(e.target.value))} placeholder="Poids" className="border-b" required />
        <input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Region" className="border-b" required />
        <input value={periodeDebut} onChange={(e) => setPeriodeDebut(e.target.value)} placeholder="Début de la période de vie" className="border-b" required />
        <input value={periodeFin} onChange={(e) => setPeriodeFin(e.target.value)} placeholder="Fin de la période de vie" className="border-b" required />
        <input value={regime} onChange={(e) => setRegime(e.target.value)} placeholder="Régime" className="border-b" required />
        <input value={anneeDecouv} type="date" onChange={(e) => setAnneeDecouv(e.target.value)} placeholder="Année de découverte" className="border-b" required />
        <input value={ethymologie} onChange={(e) => setEthymologie(e.target.value)} placeholder="Ethymologie" className="border-b" required />
        <input value={superOrdre} onChange={(e) => setSuperOrdre(e.target.value)} placeholder="Super ordre" className="border-b" />
        <input value={ordre} onChange={(e) => setOrdre(e.target.value)} placeholder="Ordre" className="border-b" />
        <input value={sousOrdre} onChange={(e) => setSousOrdre(e.target.value)} placeholder="Sous ordre" className="border-b" />
        <input value={infraOrdre} onChange={(e) => setInfraOrdre(e.target.value)} placeholder="Infra ordre" className="border-b" />
        <input value={microOrdre} onChange={(e) => setMicroOrdre(e.target.value)} placeholder="Micro ordre" className="border-b" />
        <input value={superFamille} onChange={(e) => setSuperFamille(e.target.value)} placeholder="Super famille" className="border-b" />
        <input value={famille} onChange={(e) => setFamille(e.target.value)} placeholder="Famille" className="border-b" />
        <input value={sousFamille} onChange={(e) => setSousFamille(e.target.value)} placeholder="Sous famille" className="border-b" />
        <input value={tribu} onChange={(e) => setTribu(e.target.value)} placeholder="Tribu" className="border-b" />
        <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" className="border-b" />
        <input value={clade} onChange={(e) => setClade(e.target.value)} placeholder="Clade" className="border-b" />
        <div className="flex flex-col items-center justify-center my-4">
          {cousins.map((c, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input value={c} onChange={(e) => updateList(index, setCousins, e.target.value)} placeholder="Nom du cousin" className="border-b" />
              <button type="button" onClick={() => removeFromList(index, setCousins)} className="text-red-600 hover:underline ml-2">✕</button>
            </div>
          ))}
          <button type="button" className="hover:underline" onClick={() => setCousins([...cousins, ""])}>Ajouter un cousin</button>
        </div>
        <div className="flex flex-col items-center justify-center my-4">
          {especesInf.map((s, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input value={s} onChange={(e) => updateList(index, setEspecesInf, e.target.value)} placeholder="Espèce de rang inférieur" className="border-b" />
              <button type="button" onClick={() => removeFromList(index, setEspecesInf)} className="text-red-600 hover:underline ml-2">✕</button>
            </div>
          ))}
          <button type="button" className="hover:underline" onClick={() => setEspecesInf([...especesInf, ""])}>Ajouter une espèce de rang inférieur</button>
        </div>
        <button type="submit" className="hover:underline">Enregistrer</button>
        {status && <p>{status}</p>}
      </form>
    </div>
  )
}
