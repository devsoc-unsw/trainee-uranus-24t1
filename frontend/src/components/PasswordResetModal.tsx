import React, { useContext, useRef, useState } from "react";
import { column, inputStyle } from "../resources";
import InputModalAction from "./InputModalAction";
import { Alert } from "react-bootstrap";
import { getSelfData, putSelfData } from "../backendCommunication";
import { AppContext } from "../contexts/AppContext";
import { AUTH_PATH, LOCAL_HOST, LOGIN_PATH } from "../utils/constants";
import axios from "axios";

interface PasswordResetModalProps {
  show: boolean;
  onHide: () => void;
}

function PasswordResetModal({ show, onHide }: PasswordResetModalProps) {
  const { token } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState("");

  const currPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const currPassword = currPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!currPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All fields must not be empty!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match!");
      return;
    }
    let email = "";
    try {
      const selfData = await getSelfData(token);
      email = selfData.email;
    } catch {
      setErrorMessage(
        "There was a problem updating your password. Please try again."
      );
      return;
    }

    try {
      await axios.post(LOCAL_HOST + AUTH_PATH + LOGIN_PATH, {
        email,
        currPassword,
      });
    } catch {
      setErrorMessage("Current password is incorrect.");
      return;
    }

    try {
      await putSelfData(token, {
        password: newPassword,
      });
    } catch {
      setErrorMessage(
        "There was a problem updating your password. Please try again."
      );
      return;
    } finally {
      onHide();
    }
  };
  console.log(errorMessage);
  return (
    <InputModalAction
      title="Password"
      show={show}
      onHide={onHide}
      action={handleSubmit}
    >
      <Alert
        variant="danger"
        onClose={() => setErrorMessage("")}
        show={!!errorMessage}
        dismissible={true}
      />
      <form className={`${column} gap-y-4`}>
        <input
          type="password"
          placeholder="Current Password"
          ref={currPasswordRef}
          className={inputStyle}
        />
        <input
          type="password"
          placeholder="New Password"
          ref={newPasswordRef}
          className={inputStyle}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          ref={confirmPasswordRef}
          className={inputStyle}
        />
      </form>
    </InputModalAction>
  );
}

export default PasswordResetModal;
