import { useEffect, useState } from "react";
import api from "./api/api";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);

        if (!response.data.user) {
          window.history.replaceState({}, "", "/login");
        } else {
          window.history.replaceState({}, "", "/dashboard");
        }
      } catch (err) {
        console.error("Autentikasi gagal", err);
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      window.history.replaceState({}, "", "/login");
    } catch (err) {
      console.error("Gagal logout", err);
    } finally {
      setUser(null);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">Authenticating...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return <DashboardPage user={user} onLogout={handleLogout} />;
}

export default App;
