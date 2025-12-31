import supabase from "./index.js";

/* -------------------------------------------
   PRODUCTOS QUE TIENEN RECETA
-------------------------------------------- */
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

/* -------------------------------------------
   RECETA POR PRODUCTO (PARA EDITAR)
-------------------------------------------- */
export async function getRecetaByProducto(productoId) {
  const { data, error } = await supabase
    .from("recetas")
    .select(`
      receta_id,
      producto_id,
      insumo_id,
      cantidad_por_unidad,
      insumos (
        nombre,
        unidad_base
      )
    `)
    .eq("producto_id", productoId)
    .order("receta_id");

  if (error) throw error;
  return data;
}

/* -------------------------------------------
   UPDATE RECETAS (SOLO CAMBIOS)
-------------------------------------------- */
export async function updateRecetas(updates) {
  /**
   * updates = [
   *   { receta_id: 1, cantidad_por_unidad: 25 },
   *   { receta_id: 3, cantidad_por_unidad: 10 }
   * ]
   */
  const promises = updates.map(update =>
    supabase
      .from("recetas")
      .update({ cantidad_por_unidad: update.cantidad_por_unidad })
      .eq("receta_id", update.receta_id)
  );

  const results = await Promise.all(promises);

  results.forEach(({ error }) => {
    if (error) throw error;
  });
}

/* -------------------------------------------
   DELETE RECETAS (CANTIDAD = 0)
-------------------------------------------- */
export async function deleteRecetas(recetaIds) {
  /**
   * recetaIds = [1, 5, 9]
   */
  const { error } = await supabase
    .from("recetas")
    .delete()
    .in("receta_id", recetaIds);

  if (error) throw error;
}

/* -------------------------------------------
   CREAR NUEVA RECETA
-------------------------------------------- */
export async function createReceta({ producto_id, insumo_id, cantidad_por_unidad }) {
  const { data, error } = await supabase
    .from("recetas")
    .insert([
      {
        producto_id,
        insumo_id,
        cantidad_por_unidad: Number(cantidad_por_unidad)
      }
    ])
    .select()
    .single();

  if (error) {
    // error típico: receta duplicada
    if (error.code === "23505") {
      throw new Error("Este insumo ya existe en la receta del producto");
    }
    throw error;
  }

  return data;
}

