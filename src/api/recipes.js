import supabase from "./index.js";

export async function getRecipes() {
  const { data, error } = await supabase
    .from("recetas")
    .select("*");

  if (error) throw error;

  return data;
}