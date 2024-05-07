import { RefObject } from "react";

type InputProps = {
  placeholder: string;
  type: string;
  forwardedRef: RefObject<HTMLInputElement>;
};

const Input = ({ placeholder, type, forwardedRef }: InputProps) => {
  return (
    <input
      className="rounded-md border-tertiary-200 border bg-transparent outline-none
                    px-3 py-2 my-3 w-full
                    font-light text-black
                    focus:border-tertiary-600"
      type={type}
      placeholder={placeholder}
      ref={forwardedRef}
    />
  );
};

export default Input;
