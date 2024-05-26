import { ReactElement } from "react";
import { Modal } from "react-bootstrap";

interface InputModalProps {
  title: string;
  show: boolean;
  onHide: () => void;
  children?: Array<ReactElement | string> | ReactElement | string;
}

const InputModal: React.FC<InputModalProps> = ({
  title,
  show,
  onHide,
  children,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered={true}>
      <Modal.Header>
        <Modal.Title>
          <h1 className="text-3xl font-extrabold text-primary-500">{title}</h1>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="flex justify-center">{children}</div>
      </Modal.Body>

      <Modal.Footer>
        <button
          onClick={() => onHide()}
          className="
            px-4
            py-2
            rounded-md
            bg-primary-bg-500
            text-primary-500
            font-bold
            duration-200
            hover:bg-primary-500
            hover:text-primary-500
          "
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default InputModal;
