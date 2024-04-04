type Props = {
    placeholder: string;
};

const Input = (props: Props) => {
    return (
        <input
            className="rounded-lg border-tertiary-500 border bg-transparent outline-none
                    px-3 py-2 my-1 w-full
                    font-light text-black"
            type="text"
            placeholder={props.placeholder}
        />
    );
};

export default Input;
