import axios from "axios";
import config from "../config/api";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
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
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          const message =
            err.response.data?.message ||
            err.response.data?.errors?.[0]?.msg ||
            "Login failed. Try again.";
          console.log(message);
          setError(message);
        } else {
          console.error(err);
          setError("An unexpected error occurred.");
        }
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength={6}
          required
        />
        <Link className="button-secondary" to="/register">
          Register
        </Link>
        <button type="submit" className="button-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
