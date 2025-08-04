import axios from "axios";
import config from "../config/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
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
      const response = await axios.post(`${config.apiUrl}/api/auth/register`, formValues, { withCredentials: true });
      if (response.status !== 201) {
        throw new Error("Registration failed");
      }
      // Set user.
      login({ email: formValues.email as string, password: formValues.password as string });
      // Redirect to homepage.
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    // Handle errors.
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="registration-form"
    >
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        minLength={6}
        required
      />
      <button
        type="submit"
        className="button-primary"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
