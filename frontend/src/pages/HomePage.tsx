import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();
  return (
    <>
      <LogoutButton />
      <h1>Hello {user?.firstName} {user?.lastName}</h1>
    </>
  )
}

export default HomePage;
