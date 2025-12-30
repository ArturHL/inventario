// src/components/RegisterMovements.jsx

export default function RegisterMovements() {
  return (
    <div className="Container">
      <h1>Registrar Movimientos</h1>

      <form className="Card">
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

        <label>Cantidad:</label>
        <input type="number" name="cantidad" />

        <button className="redButton">Registrar</button>
      </form>

      <form className="Card">
        <label>Insumo (compra):</label>
        <input
          type="text"
          name="insumo"
          placeholder="Ej: Café"
          list="insumos"
        />
        <datalist id="insumos">
          <option value="Café" />
          <option value="Leche" />
          <option value="Chocolate" />
          <option value="Canela" />
        </datalist>

        <label>Cantidad:</label>
        <input type="number" name="cantidad" />

        <button className="greenButton">Ingresar</button>
      </form>
          <div className="Container">
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
    </div>
  );
}
