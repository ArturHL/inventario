import supabase from "./index.js";

export async function getProductosConReceta() {
  const { data, error } = await supabase
    .from("productos")
    .select(`
      producto_id,
      nombre,
      recetas!inner(receta_id)
    `);

  if (error) throw error;

  return data;
}

export async function getRecetaByProducto(productoId) {
  const { data, error } = await supabase
    .from("recetas")
    .select(`
      cantidad_por_unidad,
      insumos (
        insumo_id,
        nombre,
        unidad_base
      )
    `)
    .eq("producto_id", productoId);

  if (error) throw error;

  return data;
}

