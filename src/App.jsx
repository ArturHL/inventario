import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("register");

  useEffect(() => {
    const saved = localStorage.getItem("page");
    if (saved) setPage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  return (
    <>
      <nav className="nav">
        <img src="/logoCafe.png" alt="Logo" />

        <span onClick={() => setPage("register")}>Registrar</span>
        <span onClick={() => setPage("recipes")}>Recetas</span>
        <span onClick={() => setPage("reports")}>Reportes</span>
        <span onClick={() => setPage("inventory")}>Inventario</span>
      </nav>

      <div>
        {/* ------------------ REGISTRAR (ENTRADAS Y SALIDAS) ------------------ */}
        {page === "register" && (
          <div>
            <h1>Registrar Movimientos</h1>

            <form>
             <label>Producto Final (venta):</label>
            <input
              type="text"
              name="producto_final"
              placeholder="Ej: Latte Grande"
              list="productosFinales"
            />

            <datalist id="productosFinales">
              <option value="Latte Grande" />
              <option value="Latte Chico" />
              <option value="Capuchino" />
              <option value="Mocha" />
              <option value="Americano" />
              <option value="Frappe Oreo" />
              <option value="Chai Latte" />
              <option value="Chocolate Caliente" />
            </datalist>
              <br />

              <label>Cantidad:</label>
              <input type="number" name="cantidad" />

              <br />

              <input type="radio" id="entrada" name="tipo" value="entrada" />
              <label htmlFor="entrada">Entrada (insumos)</label>

              <input type="radio" id="salida" name="tipo" value="salida" />
              <label htmlFor="salida">Salida (venta producto final)</label>

              <br />

              <button>Registrar</button>
            </form>
          </div>
        )}

        {/* ------------------ RECETAS ------------------ */}
        {page === "recipes" && (
          <div>
            <h1>Recetas</h1>

            <h2>Crear / Editar Receta</h2>
            <form>
              <label>Producto Final:</label>
              <input type="text" placeholder="Ej: Latte Grande" />

              <br />

              <label>Insumo:</label>
              <input type="text" placeholder="Ej: Café" />

              <label>Cantidad:</label>
              <input type="text" placeholder="Ej: 18g" />

              <button type="button">
                Agregar insumo a receta
              </button>

              <br />

              <button type="button">
                Guardar Receta
              </button>
            </form>

            <br />
            <hr />
            <br />

            <h2>Recetas Registradas</h2>

            <ul className="recipe-list">
              <li>
                <strong>Latte Grande</strong>
                <ul>
                  <li>Café — 18g</li>
                  <li>Leche — 250ml</li>
                  <li>Vaso Grande — 1</li>
                  <li>Tapa — 1</li>
                </ul>
                <button>Eliminar</button>
              </li>

              <li>
                <strong>Latte Chico</strong>
                <ul>
                  <li>Café — 12g</li>
                  <li>Leche — 180ml</li>
                  <li>Vaso Chico — 1</li>
                </ul>
                <button>Eliminar</button>
              </li>

              <li>
                <strong>Capuchino</strong>
                <ul>
                  <li>Café — 18g</li>
                  <li>Leche — 220ml</li>
                  <li>Canela — 1 pizca</li>
                  <li>Vaso Mediano — 1</li>
                </ul>
                <button>Eliminar</button>
              </li>
            </ul>
          </div>
        )}

        {/* ------------------ REPORTES (SALIDAS) ------------------ */}
        {page === "reports" && (
          <div>
            <h1>Reportes (Ventas / Salidas)</h1>
            <table>
              <thead>
                <tr>
                  <th>Producto Final</th>
                  <th>Cantidad Vendida</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Latte Grande</td>
                  <td>12</td>
                  <td>2024-01-01</td>
                </tr>
                <tr>
                  <td>Capuchino</td>
                  <td>8</td>
                  <td>2024-01-02</td>
                </tr>
                <tr>
                  <td>Oreo Frappé</td>
                  <td>5</td>
                  <td>2024-01-03</td>
                </tr>
                <tr>
                  <td>Latte Chico</td>
                  <td>14</td>
                  <td>2024-01-04</td>
                </tr>
              </tbody>
            </table>

            <h2>Entradas (Insumos Recibidos)</h2>
            <table>
              <thead>
                <tr>
                  <th>Insumo</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Café</td>
                  <td>5 kg</td>
                  <td>2024-01-01</td>
                </tr>
                <tr>
                  <td>Leche</td>
                  <td>20 L</td>
                  <td>2024-01-02</td>
                </tr>
                <tr>
                  <td>Vasos Grandes</td>
                  <td>200 piezas</td>
                  <td>2024-01-03</td>
                </tr>
                <tr>
                  <td>Jarabe de Vainilla</td>
                  <td>5 botellas</td>
                  <td>2024-01-05</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ------------------ INVENTARIO ------------------ */}
        {page === "inventory" && (
          <div>
            <h1>Inventario Actual (Insumos)</h1>
            <table>
              <thead>
                <tr>
                  <th>Insumo</th>
                  <th>Cantidad Disponible</th>
                  <th>Baja Disponibilidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Café</td>
                  <td>4.2 kg</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Leche</td>
                  <td>12 L</td>
                  <td>Sí</td>
                </tr>
                <tr>
                  <td>Vasos Grandes</td>
                  <td>120 piezas</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Tapas</td>
                  <td>40 piezas</td>
                  <td>Sí</td>
                </tr>
                <tr>
                  <td>Chocolate en Polvo</td>
                  <td>70 porciones</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Jarabe de Vainilla</td>
                  <td>8 botellas</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Café en grano mezcla casa</td>
                  <td>4.2 kg</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Café en grano espresso</td>
                  <td>3.2 kg</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Leche entera</td>
                  <td>18 L</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Leche deslactosada</td>
                  <td>12 L</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Jarabe de vainilla</td>
                  <td>950 ml</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Jarabe de caramelo</td>
                  <td>850 ml</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Jarabe de avellana</td>
                  <td>700 ml</td>
                  <td>Sí</td>
                </tr>
                <tr>
                  <td>Chocolate líquido</td>
                  <td>600 ml</td>
                  <td>Sí</td>
                </tr>
                <tr>
                  <td>Vasos 12 oz</td>
                  <td>180 piezas</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Vasos 16 oz</td>
                  <td>150 piezas</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Vasos 20 oz</td>
                  <td>120 piezas</td>
                  <td>Sí</td>
                </tr>
                <tr>
                  <td>Tapas 12 oz</td>
                  <td>190 piezas</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Tapas 16 oz</td>
                  <td>160 piezas</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Tapas 20 oz</td>
                  <td>140 piezas</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Popotes biodegradables</td>
                  <td>300 piezas</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Toallas desechables</td>
                  <td>500 piezas</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Servilletas</td>
                  <td>1000 piezas</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Jabón para trastes</td>
                  <td>1200 ml</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Líquido desinfectante</td>
                  <td>1500 ml</td>
                  <td>No</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <footer>
        <p>Sistema de Inventario · Click Cacao · Versión 0.1 (Demo)</p>
        <p>© 2025 Click Cacao — Uso interno</p>
      </footer>
    </>
  );
}

export default App;
