'use client';
import { useState } from "react";
import useInterval from "@/app/utils/useInterval";

const useRetryUntilResolved = (callback: () => Promise<boolean>, interval: number = 100) => {

  const [hasResolved, setHasResolved] = useState(false);

  useInterval(
    () => {
      callback().then((result) => {
        if(result)
          setHasResolved(true);
      });
    },
    hasResolved ? null : interval
  );

  return hasResolved;

}
export default useRetryUntilResolved;