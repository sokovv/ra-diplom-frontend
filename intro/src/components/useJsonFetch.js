import { useState, useEffect } from "react";

function useJsonFetch(url, opts = 1) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const params = { signal: controller.signal };
    fetch(url, params)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          setError(true);
        }
      })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData([...data]);
        } else {
          setData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "TypeError") {
          alert("Запрос Прерван!");
        }
      });

    return () => {
      controller.abort();
    };
  }, [url, opts]);

  return [data, loading, error];
}

export default useJsonFetch;
