import axios from "axios";
import config from "../config/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterForm: React.FC = () => {
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

    try {
      const response = await axios.post(`${config.apiUrl}/api/auth/register`, formValues, { withCredentials: true });
      if (response.status !== 201) {
        throw new Error("Registration failed");
      }
      login({ email: formValues.email as string, password: formValues.password as string });
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        const message =
          err.response.data?.message ||
          err.response.data?.errors?.[0]?.msg ||
          "Registration failed. Try again.";
        console.log(message);
        setError(message);
      } else {
        console.error(err);
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h1>Register</h1>
      {error && <p className="error-message">{error}</p>}
      <input type="text" name="firstName" placeholder="First Name" required />
      <input type="text" name="lastName" placeholder="Last Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input
        type="password"
        name="password"
        placeholder="Password"
        minLength={6}
        required
      />
      <button type="submit" className="button-primary">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
