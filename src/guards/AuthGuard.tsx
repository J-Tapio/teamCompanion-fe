import { useState, ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { PATH_AUTH } from '../routes/paths';

//==============================================================================

type AuthGuardProps = {
  children: ReactNode;
};

function AuthGuard({ children }: AuthGuardProps) {
  //TODO: Consider adding implementation where, eg. requesting some route leads to login but after login takes back to route where user tried to make the request previously.
  //const { pathname } = useLocation();
  //const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  //const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  const accessToken = localStorage.getItem("accessToken");

  if(accessToken) {
    const {isExpired} = useJwt(accessToken);
    if(isExpired) {
      //TODO: Add later axios fetch for new tokens with refresh-token.
      return <Navigate to={PATH_AUTH.login} replace/>
    } else {
      return <>{children}</>
    }
  } else if(!accessToken) {
    return <Navigate to={PATH_AUTH.login} replace/>;
  } else {
    return <>{children}</>;
  }
}

export default AuthGuard;