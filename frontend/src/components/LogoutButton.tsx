import { useAuth } from "../hooks/useAuth";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await logout();
  };

  return (
    <form onSubmit={handleLogout}>
      <button type="submit" className="logout-button">Logout</button>
    </form>
  );
};

export default LogoutButton;
