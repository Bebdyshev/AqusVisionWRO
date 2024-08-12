import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function usePageLoader() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/model') {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); 

      return () => clearTimeout(timer);
    }
  }, [location]);

  return loading;
}

export default usePageLoader;
