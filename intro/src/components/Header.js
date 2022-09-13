import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { textResult } from "../slice/text";

export default function Header(props) {
  const countBasket = useSelector((state) => state.countBasket.value);
  const dispatch = useDispatch();
  const [form, setForm] = useState();
  const [text, setText] = useState(false);
  const [inputSearch, setInputSearch] = useState(false);

  const openSearch = () => {
    setInputSearch(!inputSearch);
    dispatch(textResult(form));
  };

  const handleChange = ({ target }) => {
    setForm(target.value);
    if (inputSearch && form !== undefined && form.length > 0) {
      setText(true);
    } else {
      setText(false);
    }
  };

  return (
    <header className="container">
      <div className="navbar navbar-expand-sm navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <img className="image" src="./img/header-logo.png" alt="img" />
        </Link>
        <nav className="navbar-nav mr-auto">
          {Object.entries(props.menu).map(([rId, menu]) => (
            <NavLink to={`/${rId}`} key={rId} className="nav-link">
              {menu.title}
            </NavLink>
          ))}
        </nav>
        <div className="header-controls-pics">
          {inputSearch && (
            <input
              className="header-controls-search-form"
              onChange={handleChange}
            ></input>
          )}
          {!text && (
            <div
              className="header-controls-pic header-controls-search"
              onClick={openSearch}
            ></div>
          )}
          {text && (
            <Link
              to="/catalog"
              className="header-controls-pic header-controls-search"
              onClick={openSearch}
            ></Link>
          )}
          <Link to="/cart" className="header-controls-pic header-controls-cart">
            {countBasket > 0 && (
              <div className="header-controls-cart-full">{countBasket}</div>
            )}
            <div className="header-controls-cart-menu"></div>
          </Link>
        </div>
      </div>
      <div className="banner">
        <img
          className="img-fluid"
          src="./img/banner.jpg"
          alt="К весне готовы!"
        />
        <h2 className="banner-header">К весне готовы!</h2>
      </div>
    </header>
  );
}
