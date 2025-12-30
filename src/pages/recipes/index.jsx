// src/components/Recipes.jsx
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getProductosConReceta, getRecetaByProducto } from "../../api/recipes";
import { getProducts } from "../../api/products";
import { getInsumos } from "../../api/insumos";

export default function Recipes() {
  const [productosConReceta, setProductosConReceta] = useState([]);
  const [productos, setProductos] = useState([]);
  const [insumos, setInsumos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [productoActivo, setProductoActivo] = useState(null);
  const [receta, setReceta] = useState([]);
  const [editOpen, setEditOpen] = useState(false);

  const [newReceta, setNewReceta] = useState({
    producto_id: null,
    insumo_id: null,
    cantidad_por_unidad: ""
  });


  async function handleEdit(producto) {
    try {
      const data = await getRecetaByProducto(producto.producto_id);
      setProductoActivo(producto);
      setReceta(data);
      setEditOpen(true);
    } catch (err) {
      console.error(err);
      alert("Error al cargar la receta");
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

    <h2>Crear Receta</h2>

    <form
      className="Card"
      onSubmit={e => {
        e.preventDefault();

        if (
          !newReceta.producto_id ||
          !newReceta.insumo_id ||
          !newReceta.cantidad_por_unidad
        ) {
          alert("Completa todos los campos");
          return;
        }

        console.log(newReceta); // aquí luego llamas al endpoint
      }}
    >
      {/* PRODUCTO */}
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
        <option value="" disabled>
          Selecciona un producto
        </option>

        {productos.map(p => (
          <option key={p.producto_id} value={p.producto_id}>
            {p.nombre}
          </option>
        ))}
      </select>

      {/* INSUMO */}
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
        <option value="" disabled>
          Selecciona un insumo
        </option>

        {insumos.map(i => (
          <option key={i.insumo_id} value={i.insumo_id}>
            {i.nombre} ({i.unidad_base})
          </option>
        ))}
      </select>

      {/* CANTIDAD */}
      <label>Cantidad por unidad:</label>
      <input
        type="number"
        step="0.01"
        placeholder="Ej: 18"
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


      <h2>Recetas Registradas</h2>
      {loading ? (
        <p>Cargando recetas...</p>
      ) : productos.length === 0 ? (
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
                <tr key={index}>
                  <td>
                    {item.insumos.nombre} ({item.insumos.unidad_base})
                  </td>
                  <td>
                    <input
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

          <button type="button">Guardar Cambios</button>
        </div>
      )}

    </div>
  );
}
