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

/* Registrar movimiento (entrada o salida) */
export async function createMovimiento({
  insumo_id = null,
  producto_id = null,
  tipo,
  cantidad,
  comentario = null
}) {
  const { data, error } = await supabase
    .from("movimientos")
    .insert([
      {
        insumo_id,
        producto_id,
        tipo,
        cantidad,
        comentario
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
