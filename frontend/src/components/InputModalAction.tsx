import { ReactElement, useState } from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "./CustomButton";

interface InputModalActionProps {
  title: string;
  show: boolean;
  onHide: () => void;
  action: () => void;
  children?: Array<ReactElement | string> | ReactElement | string;
}

const InputModalAction: React.FC<InputModalActionProps> = ({
  title,
  show,
  onHide,
  action,
  children,
}) => {
  const [actionLoading, setActionLoading] = useState(false);

  const handleExecuteAction = async () => {
    setActionLoading(true);
    await action();
    setActionLoading(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered={true}>
      <Modal.Header>
        <Modal.Title>
          <h1 className="text-3xl font-extrabold text-primary-500">{title}</h1>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="flex justify-center flex-col">{children}</div>
      </Modal.Body>

      <Modal.Footer>
        <CustomButton
          disabled={actionLoading}
          type="button"
          onClick={handleExecuteAction}
        >
          Update
        </CustomButton>
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

export default InputModalAction;
