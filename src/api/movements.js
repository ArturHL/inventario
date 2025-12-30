import supabase from "./index.js";

export async function getMovements() {
  const { data, error } = await supabase
    .from("movimientos")
    .select(`
      movimiento_id,
      tipo,
      cantidad,
      fecha,
      productos (
        producto_id,
        nombre
      ),
      insumos (
        insumo_id,
        nombre
      )
    `)
    .order("fecha", { ascending: false });

  if (error) throw error;
  return data;
}
