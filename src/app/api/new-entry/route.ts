import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/data";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const {
    nom, hauteur, longueur, poids, region, periode_debut, periode_fin, cousins, especes_inf, regime, annee_decouv, ethymologie, super_ordre, ordre, sous_ordre, infra_ordre, micro_ordre, super_famille, famille, sous_famille, tribu, genre, clade
  } = data;

  try {
    await sql`
                        INSERT INTO especes (nom, hauteur, longueur, poids, region, periode_debut, periode_fin, cousins, especes_inf, regime, annee_decouv, ethymologie, super_ordre, ordre, sous_ordre, infra_ordre, micro_ordre, super_famille, famille, sous_famille, tribu, genre, clade)
                        VALUES (
                          ${nom}, ${hauteur}, ${longueur}, ${poids}, ${region}, ${periode_debut}, ${periode_fin}, ${cousins}, ${especes_inf}, ${regime}, ${annee_decouv}, ${ethymologie}, ${super_ordre}, ${ordre}, ${sous_ordre}, ${infra_ordre}, ${micro_ordre}, ${super_famille}, ${famille}, ${sous_famille}, ${tribu}, ${genre}, ${clade}
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
