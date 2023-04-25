import "./App.css";

import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Catalog from "./components/Catalog";
import Contacts from "./components/Contacts";
import About from "./components/About";
import HomePage from "./components/HomePage";
import ItemsFetch from "./components/ItemsFetch";
import Product from "./components/Product";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import Danger from "./components/Danger";

const MENU = {
  "": {
    title: "Главная",
  },
  catalog: {
    title: "Каталог",
  },
  about: {
    title: "О магазине",
  },
  contacts: {
    title: "Контакты",
  },
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main menu={MENU} />}>
        <Route path="/" element={<HomePage />}>
          <Route path="/:pId" element={<ItemsFetch />} />
        </Route>
        <Route path="/catalog" element={<Catalog />}>
          <Route path="/catalog/:pId" element={<ItemsFetch />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/danger" element={<Danger />} />
        <Route path="/products/:pId" element={<Product />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/notFound" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
