import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//============================================================================//
type ScrollTopProps = {
  children: JSX.Element;
}

function ScrollToTop({children}: ScrollTopProps):JSX.Element {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);

  return (
    <>
      {children}
    </>
  );
}

export default ScrollToTop;