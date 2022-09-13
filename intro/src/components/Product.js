import useJsonFetch from "./useJsonFetch";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Counter from "./Counter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsBasketResult } from "../slice/productsBasket";
import Preloader from "./Preloader";

export default function Product() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [selectedSize, setSelectedSize] = useState(null);
  const [active, setActive] = useState(true);
  const { pId } = useParams();
  const counter = useSelector((state) => state.counter.value);

  const [data, loading, error] = useJsonFetch(
    `http://localhost:7070/api/items/${pId}`,
    5
  );

  useEffect(() => {
    setProduct(data);
  }, [data]);

  const handleSize = (size) => {
    return () => {
      setSelectedSize(size);
    };
  };

  const handleSubmit = () => {
    const item = {
      id: product.id,
      title: product.title,
      price: Number(product.price),
      size: selectedSize,
      count: counter,
    };
    dispatch(productsBasketResult(item));
  };

  useEffect(() => {
    if (selectedSize !== null) {
      setActive(false);
    }
  }, [selectedSize]);

  return (
    <div className="container">
      {(error && "Ошибка...") ||
        (loading ? (
          <Preloader></Preloader>
        ) : (
          <section className="catalog-item">
            {product !== undefined && Array.isArray(product) !== true && (
              <>
                <h2 className="text-center">{product.title}</h2>
                <div className="row">
                  <div className="col-5">
                    <img src={product.images[0]} className="img-fluid" alt="" />
                  </div>
                  <div className="col-7">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>Артикул</td>
                          <td>{product.sku}</td>
                        </tr>
                        <tr>
                          <td>Производитель</td>
                          <td>{product.manufacturer}</td>
                        </tr>
                        <tr>
                          <td>Цвет</td>
                          <td>{product.color}</td>
                        </tr>
                        <tr>
                          <td>Материалы</td>
                          <td>{product.material}</td>
                        </tr>
                        <tr>
                          <td>Сезон</td>
                          <td>{product.season}</td>
                        </tr>
                        <tr>
                          <td>Повод</td>
                          <td>{product.reason}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-center">
                      <p>
                        Размеры в наличии:
                        {product.sizes.map((size) => (
                          <span
                            key={uuidv4()}
                            onClick={handleSize(size.size)}
                            style={{ cursor: "pointer" }}
                            className={
                              "catalog-item-size" +
                              (selectedSize === size.size ? " selected" : "")
                            }
                          >
                            {size.avalible && size.size}
                          </span>
                        ))}
                      </p>
                      {product.sizes.filter((size) => size.avalible).length !==
                        0 && (
                        <p>
                          <Counter></Counter>
                        </p>
                      )}
                    </div>
                    {product.sizes.filter((size) => size.avalible).length !==
                      0 && (
                      <Link to="/cart">
                        <button
                          className="btn btn-danger btn-block btn-lg"
                          disabled={active}
                          onClick={handleSubmit}
                        >
                          В корзину
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </>
            )}
          </section>
        ))}
    </div>
  );
}
