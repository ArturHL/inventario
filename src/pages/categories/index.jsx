// src/components/Categories.jsx
import { RiDeleteBinFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories";
import { createCategory } from "../../api/categories";
import { deleteCategory } from "../../api/categories";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    nombre: "",
  });

  useEffect(() => {
    getCategories().then(data => setCategories(data));
  }, []);

  return (  
    <div className="Container">
      <h1>Gestión de Categorías</h1>
      <h2>Agregar Nueva Categoría</h2>

      <form
        className="Card"
        onSubmit={async e => {
          e.preventDefault();
          await createCategory(newCategory);

          // limpiar input
          setNewCategory({ nombre: "" });
        }}
      >
        <label>Nombre de la categoría:</label>
        <input
          type="text"
          placeholder="Cafetería"
          value={newCategory.nombre}
          onChange={e =>
            setNewCategory({ nombre: e.target.value })
          }
        />

        <button type="submit">Agregar</button>
      </form>
      <h2>Lista de Categorías</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoría</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="2">No hay categorías</td>
            </tr>
          ) : (
            categories.map(cat => (
              <tr key={cat.categoria_id}>
                <td>
                  <RiDeleteBinFill
                    style={{ cursor: "pointer", marginRight: "8px", color: "crimson" }}
                    onClick={async () => {
                      if (!confirm("¿Eliminar esta categoría?")) return;
                      await deleteCategory(cat.categoria_id);
                      setCategories(prev =>
                        prev.filter(c => c.categoria_id !== cat.categoria_id)
                      );
                    }}
                  />
                  {cat.categoria_id}
                </td>
                <td>{cat.nombre}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}
