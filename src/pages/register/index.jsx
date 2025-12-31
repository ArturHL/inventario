import { useEffect, useState } from "react";
import { getMovements } from "../../api/movements.js";
import { getInsumos } from "../../api/insumos.js";
import { getProducts } from "../../api/products.js";
import { createMovimiento } from "../../api/movements.js";
import { createVenta } from "../../api/sales.js";

export default function RegisterMovements() {
  const [movements, setMovements] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [productos, setProductos] = useState([]);

  const [venta, setVenta] = useState({
    productoNombre: "",
    cantidad: ""
  });

  const [compra, setCompra] = useState({
    insumoNombre: "",
    cantidad: ""
  });

  const MOVIMIENTO_TIPO = {
    ENTRADA: "ENTRADA",
    VENTA: "VENTA",
  };

  useEffect(() => {
    getMovements().then(setMovements);
    getInsumos().then(setInsumos);
    getProducts().then(setProductos);
  }, []);

  /* ---------- VENTA ---------- */
  async function handleVenta(e) {
    e.preventDefault();

    const producto = productos.find(
      p => p.nombre === venta.productoNombre
    );

    if (!producto) {
      alert("Producto no válido");
      return;
    }

    try {
      // await createMovimiento({
      //   producto_id: producto.producto_id,
      //   tipo: MOVIMIENTO_TIPO.VENTA,
      //   cantidad: Number(venta.cantidad)
      // });


      await createVenta({
        producto_id: producto.producto_id,
        cantidad: Number(venta.cantidad)
      });

      alert("Venta registrada");
      setVenta({ productoNombre: "", cantidad: "" });
      getMovements().then(setMovements);
    } catch (err) {
      console.error(err);
      alert("Error al registrar venta");
    }
  }

  /* ---------- COMPRA ---------- */
  async function handleCompra(e) {
    e.preventDefault();

    const nombreLimpio = compra.insumoNombre.split(" (")[0];

    const insumo = insumos.find(
      i => i.nombre === nombreLimpio
    );

    if (!insumo) {
      alert("Insumo no válido");
      return;
    }

    try {
      await createMovimiento({
        insumo_id: insumo.insumo_id,
        tipo: MOVIMIENTO_TIPO.ENTRADA,
        cantidad: Number(compra.cantidad)
      });

      alert("Compra registrada");
      setCompra({ insumoNombre: "", cantidad: "" });
      getMovements().then(setMovements);
    } catch (err) {
      console.error(err);
      alert("Error al registrar compra");
    }
  }

  return (
    <div className="Container">
      <h1>Registrar Movimientos</h1>

      {/* --------- VENTAS --------- */}
      <form className="Card" onSubmit={handleVenta}>
        <label>Producto Final (venta):</label>
        <input
          list="productosFinales"
          value={venta.productoNombre}
          onChange={e =>
            setVenta({ ...venta, productoNombre: e.target.value })
          }
        />

        <datalist id="productosFinales">
          {productos.map(p => (
            <option key={p.producto_id} value={p.nombre} />
          ))}
        </datalist>

        <label>Cantidad:</label>
        <input
          type="number"
          min="1"
          value={venta.cantidad}
          onChange={e =>
            setVenta({ ...venta, cantidad: e.target.value })
          }
        />

        <button className="redButton">Registrar Venta</button>
      </form>

      {/* --------- COMPRAS --------- */}
      <form className="Card" onSubmit={handleCompra}>
        <label>Insumo (compra):</label>
        <input
          list="insumos"
          value={compra.insumoNombre}
          onChange={e =>
            setCompra({ ...compra, insumoNombre: e.target.value })
          }
        />

        <datalist id="insumos">
          {insumos.map(i => (
            <option
              key={i.insumo_id}
              value={`${i.nombre} (${i.unidad_base})`}
            />
          ))}
        </datalist>

        <label>Cantidad:</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={compra.cantidad}
          onChange={e =>
            setCompra({ ...compra, cantidad: e.target.value })
          }
        />

        <button className="greenButton">Registrar Compra</button>
      </form>

      {/* Tabla de reportes */}
      <div className="Container">
        <h1>Reportes</h1>
        <h2>Salidas (Insumos Utilizados)</h2>
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
              .filter(m => m.tipo === MOVIMIENTO_TIPO.VENTA)
              .map(m => (
                <tr key={m.movimiento_id}>
                  <td>{m.insumos?.nombre}</td>
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
              .filter(m => m.tipo === MOVIMIENTO_TIPO.ENTRADA)
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
