import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="relative flex flex-col h-screen w-screen">
        <div className="content-center grow">la dashboard</div>
        <div className="absolute bottom-0 w-full">
          <NavBar navigate={navigate} index={0}/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
