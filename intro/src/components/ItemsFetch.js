import useJsonFetch from "./useJsonFetch";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Preloader from "./Preloader";
import { useNavigate } from "react-router";

function ItemsFetch(props) {
  const search = useSelector((state) => state.search.value);
  const value = useSelector((state) => state.value.value);
  const { pId } = useParams();
  const [con, setCon] = useState(6);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [len, setLen] = useState(false);
  const [errorAdd, setErrorAdd] = useState(false);
  const [dataStart, setDataStart] = useState([]);
  const [url, setUrl] = useState(`${process.env.REACT_APP_SHOP_API}/items`);
  const navigate = useNavigate();

  const [data, loading, error] = useJsonFetch(url, 3);

  useEffect(() => {
    if (pId !== "items" && value.length === 0) {
      setUrl(`${process.env.REACT_APP_SHOP_API}/items?categoryId=${pId}`);
      setLen(true);
      setCon(6);
    }
    if (pId !== "items" && search.length === 0 && value.length > 0) {
      setDataStart([]);
      setLen(false);
      setCon(6);
    }
    if ((pId === undefined || pId === "items") && value.length === 0) {
      setUrl(`${process.env.REACT_APP_SHOP_API}/items`);
      setLen(true);
      setCon(6);
    }
  }, [url, pId, search, value.length]);

  useEffect(() => {
    setCon(6);
  }, [value]);

  useEffect(() => {
    setDataStart(data);
  }, [data]);

  useEffect(() => {
    if (
      props.filter === "ok" &&
      search.length > 0 &&
      (value.length > 0 || value.length === 0)
    ) {
      setDataStart(search);
      setCon(6);
      setLen(true);
    }
  }, [pId, props.filter, search, value.length]);

  useEffect(() => {
    if (dataStart.length === 0 && pId !== undefined && pId !== "items") {
      navigate("/notFound");
    }
  }, [dataStart.length, navigate, pId]);

  function addItem() {
    setCon((prev) => prev + 6);
    if (
      value.length > 0 &&
      search.length > 0 &&
      pId !== "items" &&
      pId !== undefined
    ) {
      setLoadingAdd(true);
      const controller = new AbortController();
      const params = { signal: controller.signal };
      fetch(
        `${process.env.REACT_APP_SHOP_API}/items?categoryId=${pId}&q=${value}&offset=${con}`,
        params
      )
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            setErrorAdd(true);
          }
        })
        .then((response) => response.json())
        .then((result) => {
          setDataStart([...dataStart, ...result]);
          setLoadingAdd(false);
          if (result.length < 6 || result === []) {
            setLen(false);
          }
        })
        .catch((err) => {
          if (err.name === "TypeError") {
            alert("Запрос Прерван!");
          }
        });

      return () => {
        controller.abort();
      };
    }
    if (
      value.length > 0 &&
      search.length > 0 &&
      (pId === undefined || pId === "items")
    ) {
      setLoadingAdd(true);
      const controller = new AbortController();
      const params = { signal: controller.signal };
      fetch(`${process.env.REACT_APP_SHOP_API}/items?q=${value}&offset=${con}`, params)
        .then((response) => response.json())
        .then((result) => {
          setDataStart([...dataStart, ...result]);
          setLoadingAdd(false);
          if (result.length < 6 || result === []) {
            setLen(false);
          }
        })
        .catch((err) => {
          if (err.name === "TypeError") {
            alert("Запрос Прерван!");
          }
        });

      return () => {
        controller.abort();
      };
    }
    if ((pId === undefined || pId === "items") && value.length === 0) {
      setLoadingAdd(true);
      const controller = new AbortController();
      const params = { signal: controller.signal };
      fetch(`${process.env.REACT_APP_SHOP_API}/items?offset=${con}`, params)
        .then((response) => response.json())
        .then((result) => {
          setDataStart([...dataStart, ...result]);
          setLoadingAdd(false);
          if (result.length < 6 || result === []) {
            setLen(false);
          }
        })
        .catch((err) => {
          if (err.name === "TypeError") {
            alert("Запрос Прерван!");
          }
        });

      return () => {
        controller.abort();
      };
    }
    if (pId !== "items" && pId !== undefined && value.length === 0) {
      setLoadingAdd(true);
      const controller = new AbortController();
      const params = { signal: controller.signal };
      fetch(
        `${process.env.REACT_APP_SHOP_API}/items?categoryId=${pId}&offset=${con}`,
        params
      )
        .then((response) => response.json())
        .then((result) => {
          setDataStart([...dataStart, ...result]);
          setLoadingAdd(false);
          if (result.length < 6) {
            setLen(false);
          }
        })
        .catch((err) => {
          if (err.name === "TypeError") {
            alert("Запрос Прерван!");
          }
        });

      return () => {
        controller.abort();
      };
    }
  }

  return (
    <>
      {" "}
      <div className="container">
        <div className="row">
          {" "}
          {((error || errorAdd) && "Ошибка...") ||
            (loading ? (
              <Preloader></Preloader>
            ) : (
              dataStart.map((data) => (
                <div className="col-4" key={uuidv4()}>
                  {" "}
                  <div className="card catalog-item-card">
                    {" "}
                    <img
                      className="card-img-top img-fluid"
                      alt={data.title}
                      src={data.images[0]}
                    />{" "}
                    <div className="card-body">
                      <p className="card-text"> {data.title} </p>{" "}
                      <p className="card-text"> {data.price} </p>{" "}
                      <Link
                        to={`/products/${data.id}`}
                        className="btn btn-outline-primary"
                      >
                        Заказать{" "}
                      </Link>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
              ))
            ))}{" "}
        </div>{" "}
        {len && (
          <div className="text-center">
            {!loadingAdd && !loading && (
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  addItem();
                }}
              >
                Загрузить ещё
              </button>
            )}
            {loadingAdd && !loading && <Preloader></Preloader>}
          </div>
        )}{" "}
      </div>{" "}
    </>
  );
}

export default ItemsFetch;
