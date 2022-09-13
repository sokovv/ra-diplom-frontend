import { useState, useEffect } from "react";

function useJsonFetch(url, opts = 1) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
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
      });
  }, [url, opts]);

  return [data, loading, error];
}

export default useJsonFetch;
