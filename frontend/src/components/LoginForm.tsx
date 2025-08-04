import axios from "axios";
import config from "../config/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formValues = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Send request.
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/auth/login`,
        formValues,
        { withCredentials: true }
      );
      if (response.status !== 200) {
        throw new Error("Login failed");
      }
      // Set user.
      login({
        email: formValues.email as string,
        password: formValues.password as string,
      });
      // Redirect to homepage.
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <input type="email" name="email" placeholder="Email" required />
      <input
        type="password"
        name="password"
        minLength={6}
        required
      />
      <button type="submit" className="button-primary">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
