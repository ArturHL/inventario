import supabase from "./index.js";

export async function getStock() {
  const { data, error } = await supabase
    .from("stock_actual")
    .select("*")
    .order("insumo_id", { ascending: true });

  if (error) throw error;

  return data;
}