const { useCallback, useEffect, useRef, useState } = require("react");

module.exports = function useAsync(promise) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const cancelled = useRef(false);

  useEffect(
    () => () => {
      cancelled.current = true;
    },
    []
  );

  const call = useCallback(
    (...args) => {
      setError(undefined);
      setResult(undefined);
      setLoading(true);
      promise(...args)
        .then(res => {
          if (!cancelled.current) {
            setResult(res);
            setLoading(false);
          }
        })
        .catch(err => {
          if (!cancelled.current) {
            setError(err);
            setLoading(false);
          }
        });
    },
    [promise, cancelled]
  );

  return { call, result, loading, error };
};
