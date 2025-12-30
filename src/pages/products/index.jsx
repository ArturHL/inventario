import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories";
import { getProducts, postProduct, deleteProduct } from "../../api/products";
import { RiDeleteBinFill } from "react-icons/ri";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    category: null,
  });

  const [newProduct, setNewProduct] = useState({
    nombre: "",
    categoria_id: null,
  });


  const filteredProducts = products
    .filter(p =>
      p.nombre.toLowerCase().includes(filters.name.toLowerCase())
    )
    .filter(p =>
      filters.category === null
        ? true
        : p.categoria_id === filters.category
    );

  useEffect(() => {
    getProducts().then(data => setProducts(data));
    getCategories().then(data => setCategories(data));
  }, []);

  return (
    <div className="Container">
      <h1>Productos</h1>

      {/* FILTROS */}
      <div className="Card">
        <h3>Filtrar</h3>

        Nombre:
        <input
          type="text"
          placeholder="Buscar producto"
          value={filters.name}
          onChange={e =>
            setFilters({ ...filters, name: e.target.value })
          }
        />

        Categoría:
        <select
          value={filters.category ?? "all"}
          onChange={e =>
            setFilters({ ...filters, category: e.target.value === "all" ? null : Number(e.target.value) })
          }
        >
          <option value="all">Todas</option>
          {categories.map(cat => (
            <option key={cat.categoria_id} value={cat.categoria_id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* TABLA */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="3">No hay productos</td>
            </tr>
          ) : (
            filteredProducts.map(prod => (
              <tr key={prod.producto_id}>
                <td>
                  <RiDeleteBinFill
                    style={{ cursor: "pointer", marginRight: "8px", color: "crimson" }}
                    onClick={async () => {
                      if (!confirm("¿Eliminar este producto?")) return;

                      try {
                        await deleteProduct(prod.producto_id);
                        setProducts(prev =>
                          prev.filter(p => p.producto_id !== prod.producto_id)
                        );
                      } catch (err) {
                        console.error(err);
                        alert("Error al eliminar producto");
                      }
                    }}
                  />
                  {prod.producto_id}
                </td>
                <td>{prod.nombre}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* FORMULARIO */}
      <h2>Agregar nuevo producto</h2>
      <form
        className="Card"
        onSubmit={async e => {
          e.preventDefault();

          if (!newProduct.nombre || !newProduct.categoria_id) {
            alert("Completa todos los campos");
            return;
          }

          try {
            const created = await postProduct(newProduct);
            setProducts([...products, created]);
            setNewProduct({ nombre: "", categoria_id: null });
          } catch (err) {
            console.error(err);
            alert("Error al agregar producto");
          }
        }}
      >
        <label>Nombre del producto:</label>
        <input
          type="text"
          placeholder="Espresso 4 oz"
          value={newProduct.nombre}
          onChange={e =>
            setNewProduct({
              ...newProduct,
              nombre: e.target.value,
            })
          }
        />

        <label>Categoría:</label>
        <select
          value={newProduct.categoria_id ?? ""}
          onChange={e =>
            setNewProduct({
              ...newProduct,
              categoria_id: Number(e.target.value),
            })
          }
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>

          {categories.map(cat => (
            <option
              key={cat.categoria_id}
              value={cat.categoria_id}
            >
              {cat.nombre}
            </option>
          ))}
        </select>

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}
