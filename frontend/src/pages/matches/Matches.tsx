import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";

const Matches = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="relative flex flex-col h-screen w-screen">
        <div className="content-center grow">la matches</div>
        <div className="absolute bottom-0 w-full">
          <NavBar navigate={navigate} index={1}/>
        </div>
      </div>
    </>
  );
};

export default Matches;
