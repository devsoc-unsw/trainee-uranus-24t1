const Heading = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className="text-5xl font-black my-4 text-primary-500 self-start">
            {children}
        </h1>
    );
};

export default Heading;
