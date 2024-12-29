import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

const LoginPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const redirectURL = urlParams.get("redirectUrl");

  useEffect(() => {
    sessionStorage.setItem("redirectUrl", redirectURL);
  }, [redirectURL]);

  return (
    <div>
      <GoogleLoginButton redirectUrl={redirectURL} />
    </div>
  );
};

export default LoginPage;
