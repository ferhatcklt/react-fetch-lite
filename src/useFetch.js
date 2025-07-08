import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => { // Değişiklik 1
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      
      try {
        const response = await fetch(url, { // Değişiklik 2
          ...options,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        setData(result);
        setError(null);

      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };

  }, [url, JSON.stringify(options)]); // Değişiklik 3

  return { data, loading, error };
};

export default useFetch;