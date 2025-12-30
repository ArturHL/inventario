import supabase from "./index.js";

export async function getProducts() {
  const { data, error } = await supabase
    .from("productos")
    .select("*");

  if (error) throw error;

  return data;
}

export async function postProduct(product) {
  const { data, error } = await supabase
    .from("productos")
    .insert([product])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function putProduct(id, updates) {
  const { data, error } = await supabase
    .from("productos")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteProduct(id) {
  const { data, error } = await supabase
    .from("productos")
    .delete()
    .eq("producto_id", id)

  if (error) throw error;

  return data;
}