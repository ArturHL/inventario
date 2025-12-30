import "./App.css";
import { useState, useEffect } from "react";
import RegisterMovements from "./pages/register";
import Recipes from "./pages/recipes";
import Inventory from "./pages/inventory";
import Products from "./pages/products";
import Categories from "./pages/categories";

function App() {
  const [page, setPage] = useState("register");

  useEffect(() => {
    const saved = localStorage.getItem("page");
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        <span onClick={() => setPage("categories")}>Categorias</span>
        <span onClick={() => setPage("inventory")}>Inventario</span>
        <span onClick={() => setPage("products")}>Productos</span>
      </nav>
      <div>
        {/* ------------------ REGISTRAR (ENTRADAS Y SALIDAS) ------------------ */}
        {page === "register" && <RegisterMovements />}
        {/* ------------------ RECETAS ------------------ */}
        {page === "recipes" && <Recipes />}
        {/* ------------------ REPORTES (SALIDAS) ------------------ */}
        {page === "categories" && <Categories />}
        {/* ------------------ INVENTARIO ------------------ */}
        {page === "inventory" && <Inventory />}
        {/* ----------------------------PRODUCTOS---------------------------------- */}
        {page === "products" && <Products />}
      </div>
      <footer>
        <p>Sistema de Inventario · Click Cacao · Versión 0.1 (Demo)</p>
        <p>© 2025 Click Cacao — Uso interno</p>
      </footer>
    </>
  );
}

export default App;
