export interface Dino {
  id: number;
  nom: string;
  taille: number;
  poids: number;
  region: string;
  periode_debut: string;
  periode_fin: string;
  cousins: string[];
  especes_inf: string[];
  regime: string;
  annee_decouv: string; // ISO
  ethymologie: string;
  super_ordre: string;
  ordre: string;
  sous_ordre: string;
  infra_ordre: string;
  micro_ordre: string;
  super_famille: string;
  famille: string;
  sous_famille: string;
  tribu: string;
  genre: string;
  clade: string;
}
