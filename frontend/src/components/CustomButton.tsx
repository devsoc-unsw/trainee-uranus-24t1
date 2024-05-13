type CustomButtonProps = {
  children: React.ReactNode;
  disabled: boolean;
  type: "button" | "submit" | "reset";
};

const CustomButton = ({ children, disabled, type }: CustomButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className="my-4 px-5 py-2 rounded-md bg-primary-bg-500 text-primary-500 font-extrabold text-2xl"
    >
      {children}
    </button>
  );
};

export default CustomButton;
