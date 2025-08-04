import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../hooks/useAuth";
import "../App.css";

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <LogoutButton />
      <h1>
        Hello {user?.firstName} {user?.lastName}
      </h1>
    </div>
  );
};

export default HomePage;
