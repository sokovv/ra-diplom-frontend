import { useState, useEffect } from "react";
import useJsonFetch from "./useJsonFetch";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchResult } from "../slice/search";
import { valueResult } from "../slice/value";

export default function Search() {
  const text = useSelector((state) => state.text.value);
  const { pId } = useParams();
  const dispatch = useDispatch();
  const searchClear = "";
  const [form, setForm] = useState(searchClear);
  const [formSearch, setFormSearch] = useState();
  const [url, setUrl] = useState(
    `http://localhost:7070/api/items?q=${formSearch}`
  );


  useEffect(() => {
    setForm(text);
    setFormSearch(text)
    dispatch(valueResult(text));
  }, [dispatch, text]);

  useEffect(() => {
    if (pId === undefined || pId === "items") {
      setUrl(`http://localhost:7070/api/items?q=${formSearch}`);
    }
    if (pId !== "items" && pId !== undefined) {
      setUrl(
        `http://localhost:7070/api/items?categoryId=${pId}&q=${formSearch}`
      );
    }
  }, [formSearch, pId, text]);

  const [data] = useJsonFetch(url, 2);

  useEffect(() => {
    dispatch(searchResult(data));
  }, [dispatch, data]);

  const submitHandler = (e) => {
    e.preventDefault();
    setFormSearch(form);
  };

  const handleChange = ({ target }) => {
    setForm(target.value);
    setFormSearch(target.value);
    dispatch(valueResult(target.value));
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={submitHandler}>
      <input
        className="form-control"
        value={form}
        onChange={handleChange}
        placeholder="Поиск"
      ></input>
    </form>
  );
}
