import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isSessionValid, touchSession } from '../utils/adminAuth';

export default function RequireAdmin({ children }) {
  const location = useLocation();

  useEffect(() => {
    // refresh session activity on every route visit
    touchSession();

    // auto-logout when the tab/window closes
    const onUnload = () => {
      // nothing to do; sessionStorage clears itself on tab close
    };
    window.addEventListener('beforeunload', onUnload);
    return () => window.removeEventListener('beforeunload', onUnload);
  }, [location.pathname]);

  if (!isSessionValid()) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }
  return children;
}