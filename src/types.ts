interface Dino {
  id: number;
  nom: string;
  hauteur: string;
  longueur: string;
  poids: string;
  region: string;
  periode_debut: string;
  periode_fin: string;
  cousins: string[];
  especes_inf: string[];
  regime: string;
  annee_decouv: string;
  etymologie: string;
  embranchement: string;
  sous_embranchement: string;
  super_classe: string;
  classe: string;
  sous_classe: string;
  infra_classe: string;
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
  clades: string[];
  categorie: string;
  description: string;
}

const labels: Record<keyof Dino, string> = {
  id: "id",
  nom: "Nom",
  hauteur: "Hauteur",
  longueur: "Longueur",
  poids: "Poids",
  region: "Région",
  periode_debut: "Début de la période",
  periode_fin: "Fin de la période",
  regime: "Régime",
  annee_decouv: "Année de découverte",
  etymologie: "Étymologie",
  embranchement: "Embranchement",
  sous_embranchement: "Sous-embranchement",
  super_classe: "Super-classe",
  classe: "Classe",
  sous_classe: "Sous-classe",
  infra_classe: "Infra-classe",
  super_ordre: "Super-ordre",
  ordre: "Ordre",
  sous_ordre: "Sous-ordre",
  infra_ordre: "Infra-ordre",
  micro_ordre: "Micro-ordre",
  super_famille: "Super-famille",
  famille: "Famille",
  sous_famille: "Sous-famille",
  tribu: "Tribu",
  genre: "Genre",
  categorie: "Catégorie",
  cousins: "Cousins",
  especes_inf: "Espèces de rang inférieur",
  clades: "Clades",
  description: "Description",
};

export type { Dino };
export { labels };

