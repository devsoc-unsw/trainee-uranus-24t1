import Input from "../../components/Input";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <Heading>Sign up</Heading>
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <Input placeholder="Confirm password" />
            <button className="my-4">SIGN UP</button>
            {/* Add real component later */}
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
