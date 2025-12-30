import supabase from "./index.js";

export async function getSales() {
  const { data, error } = await supabase
    .from("ventas")
    .select("*");

  if (error) throw error;

  return data;
}