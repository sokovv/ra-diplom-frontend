import useJsonFetch from "./useJsonFetch";
import { NavLink } from "react-router-dom";
import ItemsFetch from "./ItemsFetch";
import { useState } from "react";
import Search from "./Search";
import Preloader from "./Preloader";

function CategoryFetch() {
  const [loc, setLoc] = useState(window.location.pathname);
  if (loc === "/catalog") {
    setLoc("/catalog/");
  }

  const [data, loading, error] = useJsonFetch(
    " http://localhost:7070/api/categories",
    2
  );
  const category = [{ id: "items", title: "Все" }, ...data];

  return (
    <>
      <h1 className="text-center">Каталог</h1>
      {loc === "/catalog/" && <Search></Search>}
      <ul className="catalog-categories nav justify-content-center">
        {(error && "Ошибка...") ||
          (loading ? (
         <Preloader></Preloader>
          ) : (
            category.map((data) => (
              <NavLink
                to={`${loc}${data.id}`}
                key={data.id}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link "
                }
              >
                {data.title}
              </NavLink>
            ))
          ))}
      </ul>
    </>
  );
}

function Catalog() {
  return (
    <>
      {" "}
      <section className=" container">
        <CategoryFetch></CategoryFetch>
        <ItemsFetch></ItemsFetch>
      </section>
    </>
  );
}

export default Catalog;
