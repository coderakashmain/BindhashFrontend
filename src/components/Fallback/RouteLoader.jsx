import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

const RouteLoader = () => {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== previousPath.current) {
      NProgress.start();
      previousPath.current = location.pathname;

   
      setTimeout(() => {
        NProgress.done();
      }, 300); 
    }
  }, [location.pathname]);

  return null;
};

export default RouteLoader;
