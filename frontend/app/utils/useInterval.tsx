'use client';
import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: null | number = 5000) => {

  const intervalRef = useRef<number|undefined>();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);

  return intervalRef;

}

export default useInterval;