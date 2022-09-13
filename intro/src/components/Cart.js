import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { countBasketResult } from "../slice/countBasket";
import Preloader from "./Preloader";
import {
  productsBasketResult,
  postOrder,
  resetStatus,
  removeCart,
} from "../slice/productsBasket";

export default function Product() {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const productsBasket = useSelector((state) => state.productsBasket.items);
  const status = useSelector((state) => state.productsBasket.status);
  const [list, setList] = useState(() =>
    JSON.parse(localStorage.getItem("list"))
  );

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(productsBasket));
  }, [productsBasket]);

  useEffect(() => {
    if (productsBasket.length === 0 && status !== "success") {
      dispatch(productsBasketResult(list));
      if (status === "success") {
        setAddress("");
        setPhone("");
        setActive(false);
      }
    }
  }, [dispatch, list, productsBasket, status]);

  useEffect(() => {
    if (status === "success") {
      setAddress("");
      setPhone("");
      setActive(false);
    }
  }, [status]);

  useEffect(() => {
    dispatch(countBasketResult(productsBasket.length));
  }, [dispatch, productsBasket.length]);

  function handleRemove(id, size) {
    setList([]);
    dispatch(removeCart({ id, size }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(postOrder({ phone: phone, address: address }));
  }

  const handleChangePhone = ({ target }) => {
    setPhone(target.value);
  };

  const handleChangeAddress = ({ target }) => {
    setAddress(target.value);
  };

  const handleClicke = ({ target }) => {
    if (phone.length > 5 && address.length > 2 && productsBasket.length > 0) {
      setActive(target.checked);
    }
  };

  return (
    <>
      <div className="container">
        {status !== "success" && (
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {productsBasket !== undefined &&
                  productsBasket.map((item) => (
                    <tr key={uuidv4()}>
                      <td>{productsBasket.indexOf(item) + 1}</td>
                      <td>
                        <Link to={`/products/${item.id}`}>{item.title} </Link>{" "}
                      </td>
                      <td>{item.size}</td>
                      <td>{item.count}</td>
                      <td>{item.price}</td>
                      <td>{item.price * item.count}</td>
                      <td>
                        <button
                          onClick={() => handleRemove(item.id, item.size)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan="5" className="text-right">
                    Общая стоимость
                  </td>
                  <td>
                    {productsBasket !== undefined &&
                      productsBasket
                        .reduce((sum, item) => sum + item.price * item.count, 0)
                        .toLocaleString()}{" "}
                    руб.
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}
        <section className="order">
          <h2 className="text-center">
            {status === "success" && "Заказ успешно оформлен!"}
            {status === "error" && "Произошла ошибка, попробуйте снова"}
            {status === "idle" && "Оформить заказ"}
            {status === "pending" && (
             <Preloader></Preloader>
            )}
          </h2>
          {status !== "success" && (
            <div className="card" style={{ margin: "0 auto", width: "30rem" }}>
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    className="form-control"
                    id="phone"
                    placeholder="Ваш телефон"
                    onChange={handleChangePhone}
                    value={phone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    className="form-control"
                    id="address"
                    onChange={handleChangeAddress}
                    value={address}
                    placeholder="Адрес доставки"
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreement"
                    onClick={handleClicke}
                  />
                  <label className="form-check-label">
                    Согласен с правилами доставки
                  </label>
                </div>
                <button
                  disabled={!active}
                  type="submit"
                  className="btn btn-outline-secondary"
                >
                  Оформить
                </button>
              </form>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
