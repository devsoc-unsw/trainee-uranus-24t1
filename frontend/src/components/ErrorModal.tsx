import { Modal } from "react-bootstrap";

type ErrorModalProps = {
  errorMessage: string;
  handleClose: () => void;
};

const ErrorModal = ({ errorMessage, handleClose }: ErrorModalProps) => {
  return (
    <Modal show={!!errorMessage} onHide={handleClose} centered={true}>
      <Modal.Header>
        <Modal.Title>Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>{errorMessage}</Modal.Body>
    </Modal>
  );
};

export default ErrorModal;
