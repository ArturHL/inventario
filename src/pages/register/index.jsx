// src/components/RegisterMovements.jsx
import { useEffect, useState } from "react";
import { getMovements } from "../../api/movements.js";
import { getInsumos } from "../../api/insumos.js";
import { getProducts } from "../../api/products.js";


export default function RegisterMovements() {
  const [movements, setMovements] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getMovements().then(setMovements);
    getInsumos().then(setInsumos);
    getProducts().then(setProductos);
  }, []);

  return (
    <div className="Container">
      <h1>Registrar Movimientos</h1>

      {/* Formulario de ventas */}
      <form className="Card">
        <label>Producto Final (venta):</label>

        <input
          type="text"
          name="producto_final"
          placeholder="Ej: Latte Grande"
          list="productosFinales"
        />

        <datalist id="productosFinales">
          {productos.map(producto => (
            <option
              key={producto.producto_id}
              value={`${producto.nombre}`}
            />
          ))}
        </datalist>

        <label>Cantidad:</label>
        <input type="number" name="cantidad" />

        <button className="redButton">Registrar</button>
      </form>

      {/* Formulario de compras */}
      <form className="Card">
        <label>Insumo (compra):</label>

        <input
          type="text"
          name="insumo"
          placeholder="Ej: Café"
          list="insumos"
        />

        <datalist id="insumos">
          {insumos.map(insumo => (
            <option
              key={insumo.insumo_id}
              value={`${insumo.nombre} (${insumo.unidad_base})`}
            />
          ))}
        </datalist>

        <label>Cantidad:</label>
        <input type="number" name="cantidad" />

        <button className="greenButton">Ingresar</button>
      </form>

      {/* Tabla de reportes */}
      <div className="Container">
        <h1>Reportes</h1>
        <h2>Salidas (Productos Vendidos)</h2>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movements
              .filter(m => m.tipo === "salida")
              .map(m => (
                <tr key={m.movimiento_id}>
                  <td>{m.productos?.nombre}</td>
                  <td>{m.cantidad}</td>
                  <td>{new Date(m.fecha).toLocaleDateString()}</td>
                </tr>
              ))}
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
            {movements
              .filter(m => m.tipo === "entrada")
              .map(m => (
                <tr key={m.movimiento_id}>
                  <td>{m.insumos?.nombre}</td>
                  <td>{m.cantidad}</td>
                  <td>{new Date(m.fecha).toLocaleDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
