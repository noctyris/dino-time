import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/data";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const {
    nom,
    hauteur,
    longueur,
    poids,
    region,
    periode_debut,
    periode_fin,
    cousins,
    especes_inf,
    regime,
    annee_decouv,
    etymologie,
    embranchement,
    sous_embranchement,
    super_classe,
    classe,
    sous_classe,
    infra_classe,
    super_ordre,
    ordre,
    sous_ordre,
    infra_ordre,
    micro_ordre,
    super_famille,
    famille,
    sous_famille,
    tribu,
    genre,
    clades,
    categorie,
    description,
    image,
    img_squelette,
  } = data;

  try {
    await sql`
      UPDATE especes
      SET
        nom = ${nom},
        hauteur = ${hauteur},
        longueur = ${longueur},
        poids = ${poids},
        region = ${region},
        periode_debut = ${periode_debut},
        periode_fin = ${periode_fin},
        cousins = ${cousins},
        especes_inf = ${especes_inf},
        regime = ${regime},
        annee_decouv = ${annee_decouv},
        etymologie = ${etymologie},
        embranchement = ${embranchement},
        sous_embranchement = ${sous_embranchement},
        super_classe = ${super_classe},
        classe = ${classe},
        sous_classe = ${sous_classe},
        infra_classe = ${infra_classe},
        super_ordre = ${super_ordre},
        ordre = ${ordre},
        sous_ordre = ${sous_ordre},
        infra_ordre = ${infra_ordre},
        micro_ordre = ${micro_ordre},
        super_famille = ${super_famille},
        famille = ${famille},
        sous_famille = ${sous_famille},
        tribu = ${tribu},
        genre = ${genre},
        clades = ${clades},
        categorie = ${categorie},
        description = ${description},
        image = ${image},
        img_squelette = ${img_squelette}
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database update failed" }, { status: 500 });
  }
}

