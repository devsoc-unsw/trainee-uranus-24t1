import Input from "../../components/Input";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <Heading>Login</Heading>
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            {/* Add real button component later */}
            <button className="my-4">LOGIN</button>
            <p>
                Don't have an account? <Link to="/register">Sign up</Link>
            </p>
        </div>
    );
};

export default LoginPage;
