import supabase from "./index.js";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categorias")
    .select("*");

  if (error) throw error;

  return data;
}

export async function createCategory(category) {
  const { data, error } = await supabase
    .from("categorias")
    .insert([category])
    .single();

  if (error) throw error;

  return data;
}

export async function updateCategory(id, updates) {
  const { data, error } = await supabase
    .from("categorias")
    .update(updates)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function deleteCategory(id) {
  const { data, error } = await supabase
    .from("categorias")
    .delete()
    .eq("categoria_id", id);

  if (error) throw error;

  return data;
}