import Input from "../../components/Input";
import Heading from "../../components/Heading";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FormEvent, useContext, useRef, useState } from "react";
import ErrorModal from "../../components/ErrorModal";
import { Spinner } from "react-bootstrap";
import { AppContext } from "../../contexts/AppContext";
import CatMascot from "../../assets/UNSWipe-cat.png";
import UNSWipeLogo from "../../assets/UNSWipe-logo-md.png";
import CustomButton from "../../components/CustomButton";

const RegisterPage = () => {
  const { token } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [registerLoading] = useState<boolean>(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/" />;
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    if (!firstName) {
      setErrorMessage("Please enter your first name.");
      return;
    } else if (!lastName) {
      setErrorMessage("Please enter your last name.");
      return;
    } else if (!email) {
      setErrorMessage("Please enter an email.");
      return;
    } else if (!password) {
      setErrorMessage("Please enter a password.");
      return;
    } else if (!confirmPassword) {
      setErrorMessage("Please confirm your password.");
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    localStorage.setItem("email", email);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("password", password);
    navigate("/register/current-courses");
  };

  return (
    <>
      <div className="flex flex-col h-svh w-svw items-center p-10">
        <div className="flex w-full mt-5 mb-20">
          <img src={UNSWipeLogo} alt="UNSWipe Logo Design" />
        </div>
        <div className="flex h-screen w-full flex-col items-center justify-evenly">
          <div className="w-full">
            <Heading>Sign up</Heading>
            <form
              onSubmit={handleRegister}
              className="flex flex-col items-center justify-center w-full"
            >
              <Input
                placeholder="first name"
                type="text"
                initialValue={localStorage.getItem("firstName") || ""}
                forwardedRef={firstNameRef}
              />
              <Input
                placeholder="last name"
                type="text"
                initialValue={localStorage.getItem("lastName") || ""}
                forwardedRef={lastNameRef}
              />
              <Input
                placeholder="email"
                type="text"
                forwardedRef={emailRef}
                initialValue={localStorage.getItem("email") || ""}
              />
              <Input
                placeholder="password"
                type="password"
                initialValue={localStorage.getItem("password") || ""}
                forwardedRef={passwordRef}
              />
              <Input
                placeholder="confirm password"
                type="password"
                forwardedRef={confirmPasswordRef}
              />
              <CustomButton disabled={registerLoading} type="submit">
                {registerLoading ? <Spinner /> : "SIGN UP"}
              </CustomButton>
            </form>
            <p className="m-0">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-500 no-underline">
                Log in
              </Link>
            </p>
            <div className="flex w-full justify-center items-center">
              <img src={CatMascot} alt="UNSWipe Cat Mascot" className="h-56" />
            </div>
          </div>
        </div>
      </div>
      <ErrorModal
        errorMessage={errorMessage}
        handleClose={() => setErrorMessage("")}
      />
    </>
  );
};

export default RegisterPage;
