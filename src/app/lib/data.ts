import postgres from "postgres";
import { Picture } from "@/types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchData(): Promise<Picture[]> {
  return await sql`SELECT * FROM dinosaures`;
}

export default sql;
