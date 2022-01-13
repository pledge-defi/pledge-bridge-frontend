import { useState, useEffect } from 'react';

/** 倒计时 hooks */
const useCountdown = () => {
  const [countdown, setCountdown] = useState<number>();

  useEffect(() => {
    if (countdown === 0 || !countdown) return;

    const timer = setTimeout(() => {
      const newCountdown = countdown - 1;
      setCountdown(newCountdown);
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(timer);
  }, [countdown]);

  return [countdown, setCountdown] as const;
};

export { useCountdown };
