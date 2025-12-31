// src/components/Recipes.jsx
import './index.css';
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  getProductosConReceta,
  getRecetaByProducto,
  updateRecetas,
  deleteRecetas,
  createReceta
} from "../../api/recipes";
import { getProducts } from "../../api/products";
import { getInsumos } from "../../api/insumos";

export default function Recipes() {
  const [productosConReceta, setProductosConReceta] = useState([]);
  const [productos, setProductos] = useState([]);
  const [insumos, setInsumos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [productoActivo, setProductoActivo] = useState(null);

  const [receta, setReceta] = useState([]);
  const [recetaOriginal, setRecetaOriginal] = useState([]);

  const [editOpen, setEditOpen] = useState(false);

  const [newReceta, setNewReceta] = useState({
    producto_id: null,
    insumo_id: null,
    cantidad_por_unidad: ""
  });
  const insumosDisponibles = newReceta.producto_id
  ? insumos.filter(
      i =>
        !receta.some(r => r.insumo_id === i.insumo_id)
    )
  : insumos;


  async function handleEdit(producto) {
    try {
      const data = await getRecetaByProducto(producto.producto_id);

      setProductoActivo(producto);
      setReceta(data);
      setRecetaOriginal(JSON.parse(JSON.stringify(data))); // copia profunda
      setEditOpen(true);
    } catch (err) {
      console.error(err);
      alert("Error al cargar la receta");
    }
  }

  async function handleSaveChanges() {
    try {
      const updates = [];
      const deletes = [];

      receta.forEach((item, index) => {
        const original = recetaOriginal[index];

        // DELETE si queda en 0
        if (item.cantidad_por_unidad === 0) {
          deletes.push(item.receta_id);
          return;
        }

        // UPDATE si cambió
        if (item.cantidad_por_unidad !== original.cantidad_por_unidad) {
          updates.push({
            receta_id: item.receta_id,
            cantidad_por_unidad: item.cantidad_por_unidad
          });
        }
      });

      if (updates.length) await updateRecetas(updates);
      if (deletes.length) await deleteRecetas(deletes);

      alert("Receta actualizada correctamente");
      setEditOpen(false);

    } catch (err) {
      console.error(err);
      alert("Error al guardar cambios");
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const recetas = await getProductosConReceta();
        const prods = await getProducts();
        const ins = await getInsumos();

        setProductosConReceta(recetas);
        setProductos(prods);
        setInsumos(ins);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="Container">
      <h1>Recetas</h1>

      {/* CREAR RECETA */}
      <h2>Crear Receta</h2>

      <form
        className="Card"
        onSubmit={async e => {
          e.preventDefault();

          if (
            !newReceta.producto_id ||
            !newReceta.insumo_id ||
            Number(newReceta.cantidad_por_unidad) <= 0
          ) {
            alert("Completa todos los campos correctamente");
            return;
          }

          try {
            await createReceta(newReceta);

            alert("Receta creada correctamente");

            // Reset form
            setNewReceta({
              producto_id: null,
              insumo_id: null,
              cantidad_por_unidad: ""
            });

            // Refrescar productos con receta
            const recetas = await getProductosConReceta();
            setProductosConReceta(recetas);

          } catch (err) {
            alert(err.message || "Error al crear receta");
            console.error(err);
          }
        }}
      >
        <label>Producto Final:</label>
        <select
          value={newReceta.producto_id ?? ""}
          onChange={e =>
            setNewReceta({
              ...newReceta,
              producto_id: Number(e.target.value)
            })
          }
        >
          <option value="" disabled>Selecciona un producto</option>
          {productos.map(p => (
            <option key={p.producto_id} value={p.producto_id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <label>Insumo:</label>
        <select
          value={newReceta.insumo_id ?? ""}
          onChange={e =>
            setNewReceta({
              ...newReceta,
              insumo_id: Number(e.target.value)
            })
          }
        >
          <option value="" disabled>Selecciona un insumo</option>
          {insumosDisponibles.map(i => (
            <option key={i.insumo_id} value={i.insumo_id}>
              {i.nombre} ({i.unidad_base})
            </option>
          ))}
        </select>

        <label>Cantidad por unidad:</label>
        <input
          type="number"
          step="0.01"
          value={newReceta.cantidad_por_unidad}
          onChange={e =>
            setNewReceta({
              ...newReceta,
              cantidad_por_unidad: e.target.value
            })
          }
        />

        <button type="submit">Guardar Receta</button>
      </form>

      {/* LISTADO */}
      <h2>Recetas Registradas</h2>
      {loading ? (
        <p>Cargando recetas...</p>
      ) : productosConReceta.length === 0 ? (
        <p>No hay recetas registradas</p>
      ) : (
        <ul className="recipe-list">
          {productosConReceta.map(producto => (
            <li key={producto.producto_id}>
              {producto.nombre}
              <FaRegEdit
                className="editIcon"
                onClick={() => handleEdit(producto)}
              />
            </li>
          ))}
        </ul>
      )}

      {/* EDITAR */}
      {editOpen && (
        <div className="editMenu Card">
          <h3>Editar Receta: {productoActivo.nombre}</h3>

          <table>
            <thead>
              <tr>
                <th>Insumo</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {receta.map((item, index) => (
                <tr key={item.receta_id}>
                  <td>
                    {item.insumos.nombre} ({item.insumos.unidad_base})
                  </td>
                  <td>
                    <input
                      className="inputRecipeEdit"
                      type="number"
                      value={item.cantidad_por_unidad}
                      onChange={e => {
                        const copia = [...receta];
                        copia[index].cantidad_por_unidad = Number(e.target.value);
                        setReceta(copia);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button type="button" onClick={handleSaveChanges}>
            Guardar Cambios
          </button>
        </div>
      )}
    </div>
  );
}
