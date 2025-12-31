import "./App.css";
import { useState, useEffect } from "react";
import RegisterMovements from "./pages/register";
import Recipes from "./pages/recipes";
import Inventory from "./pages/inventory";
import Products from "./pages/products";
import Categories from "./pages/categories";

function App() {
  const [page, setPage] = useState("register");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("page");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setPage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  function toggleMenu() {
    setMenuOpen(prev => !prev);
  }

  function goTo(pageName) {
    setPage(pageName);
    setMenuOpen(false); // CIERRA MENU Y RESETEA BOTÓN
  }

  return (
    <>
      <nav className="nav">
        <img src="/logoCafe.png" alt="Logo" />

        <div className="shopMenuSection">
          <div className="btnMenuNav">
            <input
              type="checkbox"
              id="checkbox2"
              className="checkbox2 visuallyHidden"
              checked={menuOpen}
              onChange={toggleMenu}
            />
            <label htmlFor="checkbox2">
              <div className="hamburger hamburger2">
                <span className="bar bar1"></span>
                <span className="bar bar2"></span>
                <span className="bar bar3"></span>
                <span className="bar bar4"></span>
              </div>
            </label>
          </div>
        </div>

        <menu
          className={`dropDownMenu ${
            menuOpen ? "drop" : "inactive"
          }`}
        >
          <ul>
            <li onClick={() => goTo("register")}>Movimientos</li>
            <li onClick={() => goTo("recipes")}>Recetas</li>
            <li onClick={() => goTo("categories")}>Categorias</li>
            <li onClick={() => goTo("inventory")}>Inventario</li>
            <li onClick={() => goTo("products")}>Productos</li>
          </ul>
        </menu>
      </nav>

      <div>
        {page === "register" && <RegisterMovements />}
        {page === "recipes" && <Recipes />}
        {page === "categories" && <Categories />}
        {page === "inventory" && <Inventory />}
        {page === "products" && <Products />}
      </div>

      <footer>
        <p>Sistema de Inventario · Click Cacao · Versión 1.0 (Beta)</p>
        <p>© 2026 Click Cacao — Uso interno</p>
      </footer>
    </>
  );
}

export default App;
