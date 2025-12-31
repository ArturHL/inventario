import supabase from "./index.js";

export async function createVenta({ producto_id, cantidad }) {
  const { data, error } = await supabase
    .from("ventas")
    .insert([
      {
        producto_id,
        cantidad
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}