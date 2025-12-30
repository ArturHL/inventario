import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories";
import { getStock } from "../../api/stock";
import { addInsumo } from "../../api/insumos";
import { deleteInsumo } from "../../api/insumos";
import { RiDeleteBinFill } from "react-icons/ri";

export default function Inventory() {
    const [stock, setStock] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        availability: "all",
        order: "asc",
        category: "all",
    });
    const [newInsumo, setNewInsumo] = useState({
        nombre: "",
        categoria_id: null,
        unidad_base: "gr",
        stock_minimo: 0,
    });
    const filteredStock = stock
        .filter(item =>
            item.nombre
            .toLowerCase()
            .includes(filters.name.toLowerCase())
        )
        .filter(item =>
            filters.category === "all"
            ? true
            : item.categoria === filters.category
        )
        .filter(item => {
            if (filters.availability === "low") {
            return item.stock < 10; // ejemplo
            }
            return true;
        })
        .sort((a, b) => {
            if (filters.order === "asc") {
            return a.stock - b.stock;
            }
            return b.stock - a.stock;
    });

    useEffect(() => {
        getStock().then(data => setStock(data));
        getCategories().then(data => setCategories(data));
    }, []);

    return (
        <div className="Container">
        <h1>Inventario Actual (Insumos)</h1>

        <div className="Card">
            <h3>Filtrar</h3>
            Nombre:
            <input
                type="text"
                placeholder="Busqueda por nombre"
                value={filters.name}
                onChange={e =>
                    setFilters({ ...filters, name: e.target.value })
                }
            />
            Disponibilidad:
            <select
                value={filters.availability}
                onChange={e =>
                setFilters({ ...filters, availability: e.target.value })
                }
                >
                <option value="all">Todos</option>
                <option value="low">Baja Disponibilidad</option>
            </select>

            Categoria:
            <select
                value={filters.category}
                onChange={e =>
                    setFilters({ ...filters, category: e.target.value })
                }
                >
                <option value="all">Todas</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                    </option>
                ))}
            </select>
        </div>

        <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Insumo</th>
                <th>Unidad Base</th>
                <th>Categoría</th>
                <th>Stock</th>
                </tr>
            </thead>

            <tbody>
                {filteredStock.length === 0 ? (
                <tr>
                    <td colSpan="5">No hay insumos</td>
                </tr>
                ) : (
                filteredStock.map(item => (
                    <tr key={item.insumo_id}>
                    <td>
                        <RiDeleteBinFill
                            style={{ cursor: "pointer", marginRight: "8px", color: "crimson" }}
                            onClick={async () => {
                                if (!confirm("¿Eliminar este insumo?")) return;

                                try {
                                    await deleteInsumo(item.insumo_id);
                                    setStock(prev =>
                                    prev.filter(i => i.insumo_id !== item.insumo_id)
                                    );
                                } catch (err) {
                                    console.error(err);
                                    alert("Error al eliminar insumo");
                                }
                            }}
                        />
                        {item.insumo_id}
                        </td>
                    <td>{item.nombre}</td>
                    <td>{item.unidad_base}</td>
                    <td>{item.categoria}</td>
                    <td>{item.stock}</td>
                    </tr>
                ))
                )}
            </tbody>
        </table>

        <h2>Agregar Nuevo insumo al inventario</h2>

        <form
            className="Card"
            onSubmit={async e => {
                e.preventDefault();

                await addInsumo(newInsumo);
                // opcional: limpiar formulario
                setNewInsumo({
                nombre: "",
                categoria_id: null,
                unidad_base: "gr",
                stock_minimo: 0,
                });
            }}
            >
            <label>Nombre del insumo:</label>
            <input
                type="text"
                placeholder="Café"
                value={newInsumo.nombre}
                onChange={e =>
                setNewInsumo({ ...newInsumo, nombre: e.target.value })
                }
            />

            <label>Categoría:</label>
            <select
                value={newInsumo.categoria_id ?? ""}
                onChange={e =>
                setNewInsumo({
                    ...newInsumo,
                    categoria_id: Number(e.target.value),
                })
                }
            >
                <option value="">Selecciona una categoría</option>
                {categories.map(cat => (
                <option key={cat.categoria_id} value={cat.categoria_id}>
                    {cat.nombre}
                </option>
                ))}
            </select>

            <label>Unidad base:</label>
            <select
                value={newInsumo.unidad_base}
                onChange={e =>
                setNewInsumo({
                    ...newInsumo,
                    unidad_base: e.target.value,
                })
                }
            >
                <option value="gr">Gramos (gr)</option>
                <option value="ml">Mililitros (ml)</option>
                <option value="pza">Piezas (pza)</option>
            </select>

            <button type="submit">Agregar</button>
        </form>
        </div>
    );
}