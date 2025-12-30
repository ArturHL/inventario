import supabase from "./index.js";

export async function getInsumos() {
  const { data, error } = await supabase
    .from("insumos")
    .select("*");

  if (error) throw error;

  return data;
}

export async function addInsumo(insumo) {
  const { data, error } = await supabase
    .from("insumos")
    .insert([insumo]);

  if (error) throw error;

  return data;
}

export async function updateInsumo(id, updates) {
  const { data, error } = await supabase
    .from("insumos")
    .update(updates)
    .eq("id", id);

  if (error) throw error;

  return data;
}

export async function deleteInsumo(id) {
  const { data, error } = await supabase
    .from("insumos")
    .delete()
    .eq("insumo_id", id);

  if (error) throw error;

  return data;
}