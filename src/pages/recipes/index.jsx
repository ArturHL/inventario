// src/components/Recipes.jsx
import { FaRegEdit } from "react-icons/fa";

export default function Recipes() {
  return (
    <div className="Container">
      <h1>Recetas</h1>

      <h2>Crear Receta</h2>
      <form className="Card">
        <label>Producto Final:</label>
        <input type="text" placeholder="Ej: Latte Grande" />

        <label>Insumo:</label>
        <input type="text" placeholder="Ej: Café" />

        <label>Cantidad:</label>
        <input type="text" placeholder="Ej: 18g" />

        <button type="button">Guardar Receta</button>
      </form>

      <h2>Recetas Registradas</h2>
      <ul className="recipe-list">
        <li>
          Latte Grande <FaRegEdit />
        </li>
        <li>
          Capuchino <FaRegEdit />
        </li>
        <li>
          Mocha <FaRegEdit />
        </li>
      </ul>

      <div className="editMenu Card inactive">
        <h3>Editar Receta: Latte Grande</h3>

        <table>
          <thead>
            <tr>
              <th>Insumo</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Café</td>
              <td>18g</td>
            </tr>
            <tr>
              <td>Leche</td>
              <td>240ml</td>
            </tr>
            <tr>
              <td>Jarabe de Vainilla</td>
              <td>30ml</td>
            </tr>
          </tbody>
        </table>

        <button type="button">Guardar Cambios</button>
      </div>
    </div>
  );
}
