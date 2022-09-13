import useJsonFetch from "./useJsonFetch";
import { Link } from "react-router-dom";
import Preloader from "./Preloader";

function DataFetch() {
  const [data, loading, error] = useJsonFetch(
    "http://localhost:7070/api/top-sales",
    2
  );
  return (
    <>
      <section className="container">
        <h1 className="text-center">Хиты продаж!</h1>
        <div className="row">
          {(error && "Ошибка...") ||
            (loading ? (
          <Preloader></Preloader>
            ) : (
              data.map((data) => (
                <div className="col-4" key={data.id}>
                  {" "}
                  <div className="card catalog-item-card">
                    {" "}
                    <img
                      className="card-img-top img-fluid"
                      alt={data.title}
                      src={data.images[0]}
                    />{" "}
                    <div className="card-body">
                      <p className="card-text">{data.title}</p>
                      <p className="card-text">{data.price}</p>
                      <Link
                        to={`/products/${data.id}`}
                        className="btn btn-outline-primary"
                      >
                        Заказать{" "}
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              ))
            ))}
        </div>
      </section>
    </>
  );
}

function TopSales() {
  return (
    <>
      <DataFetch></DataFetch>
    </>
  );
}

export default TopSales;
