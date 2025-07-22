import postgres from "postgres";
import { Dino } from "@/types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchData(): Promise<Dino[]> {
  return await sql`SELECT * FROM especes`;
}

export default sql;
