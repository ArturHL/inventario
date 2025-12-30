import supabase from "./index.js";

export async function getMovements() {
  const { data, error } = await supabase
    .from("movimientos")
    .select("*");

  if (error) throw error;

  return data;
}