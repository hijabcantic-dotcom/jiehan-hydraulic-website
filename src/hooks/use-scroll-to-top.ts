import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 每次路由变化时滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
};
