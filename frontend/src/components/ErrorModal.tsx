import { Modal } from "react-bootstrap";

type ErrorModalProps = {
  errorMessage: string;
  handleClose: () => void;
};

const ErrorModal = ({ errorMessage, handleClose }: ErrorModalProps) => {
  return (
    <Modal show={!!errorMessage} onHide={handleClose} centered={true}>
      <Modal.Header>
        <Modal.Title>
          <h1 className="text-3xl font-extrabold text-primary-500">Error</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{errorMessage}</Modal.Body>
      <Modal.Footer>
        <button
          onClick={handleClose}
          className="px-4 py-2 rounded-md bg-primary-bg-500 text-primary-500 font-bold duration-200 hover:bg-primary-500 hover:text-primary-bg-500"
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
