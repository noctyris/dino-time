import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/data";

export async function POST(req: NextRequest) {
  const data = await req.json();

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

  console.log(data);

  try {
    await sql`
                        INSERT INTO especes (nom, hauteur, longueur, poids, region, periode_debut, periode_fin, cousins, especes_inf, regime, annee_decouv, etymologie, embranchement, sous_embranchement, super_classe, classe, sous_classe, infra_classe, super_ordre, ordre, sous_ordre, infra_ordre, micro_ordre, super_famille, famille, sous_famille, tribu, genre, clades, categorie, description, image, img_squelette)
                        VALUES (
                          ${nom}, ${hauteur}, ${longueur}, ${poids}, ${region}, ${periode_debut}, ${periode_fin}, ${cousins}, ${especes_inf}, ${regime}, ${annee_decouv}, ${etymologie}, ${embranchement}, ${sous_embranchement}, ${super_classe}, ${classe}, ${sous_classe}, ${infra_classe}, ${super_ordre}, ${ordre}, ${sous_ordre}, ${infra_ordre}, ${micro_ordre}, ${super_famille}, ${famille}, ${sous_famille}, ${tribu}, ${genre}, ${clades}, ${categorie}, ${description}, ${image}, ${img_squelette}
                        )
                `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Database insert failed" },
      { status: 500 },
    );
  }
}
