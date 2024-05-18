import Input from "../../components/Input";
import Heading from "../../components/Heading";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CatMascot from "../../assets/UNSWipe-cat.png";
import UNSWipeLogo from "../../assets/UNSWipe-logo-md.png";
import { FormEvent, useContext, useRef, useState } from "react";
import ErrorModal from "../../components/ErrorModal";
import { AUTH_PATH, LOCAL_HOST, LOGIN_PATH } from "../../utils/constants";
import axios from "axios";
import { AppContext } from "../../contexts/AppContext";
import { Spinner } from "react-bootstrap";
import CustomButton from "../../components/CustomButton";

const LoginPage = () => {
  const { token, updateToken } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()

  if (token) {
    return <Navigate to="/" />;
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    } else if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }
    try {
      setLoginLoading(true);
      const response = await axios.post(LOCAL_HOST + AUTH_PATH + LOGIN_PATH, {
        email,
        password,
      });
      updateToken(response.data.token);
      console.log(response.data.token);
    } catch {
      setErrorMessage("Invalid email or password.");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col h-svh w-svw items-center p-10">
        <div className="flex w-full mt-5 mb-20">
          <img src={UNSWipeLogo} alt="UNSWipe Logo Design" />
        </div>
        <div className="flex justify-center items-center flex-col w-full">
          <Heading>Log in</Heading>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center justify-center w-full"
          >
            <Input placeholder="email" type="text" forwardedRef={emailRef} />
            <Input
              placeholder="password"
              type="password"
              forwardedRef={passwordRef}
            />
            <CustomButton disabled={loginLoading} type="submit">
              {loginLoading ? <Spinner animation="border" /> : "LOGIN"}
            </CustomButton>
          </form>
          <p className="font-light">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary-500 no-underline">
              Sign up
            </Link>
          </p>
          <img src={CatMascot} alt="cat logo of UNSWipe" className="h-50" />
        </div>
      </div>
      <ErrorModal
        errorMessage={errorMessage}
        handleClose={() => setErrorMessage("")}
      />
    </>
  );
};

export default LoginPage;
