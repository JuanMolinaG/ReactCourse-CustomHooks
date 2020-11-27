import { useEffect, useRef, useState } from 'react';

export const useFetch = (url) => {
  const isMounted = useRef(true);

  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({
      data: null,
      error: null,
      loading: true,
    });

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (!isMounted.current) return;

        setState({
          loading: false,
          error: null,
          data,
        });
      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error: 'No se pudo obtener la info',
        });
      });
  }, [url]);

  return state;
};
