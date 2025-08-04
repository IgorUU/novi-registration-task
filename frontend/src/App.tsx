import "./App.css";
import { AuthContextProvider } from "./contexts/AuthProvider";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;
