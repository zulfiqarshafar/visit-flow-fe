import { useState } from "react";
import api from "../api/api";

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setError("Masukkan username dan password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", form);

      onLogin(response.data.user);
      window.history.replaceState({}, "", "/dashboard");
    } catch (err) {
      console.error("Gagal login", err);

      setError(err.response?.data?.message || "Gagal login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Log in to Visit Flow</h1>
      <div className="w-full max-w-sm rounded-lg p-6 border">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="border rounded p-2 w-full bg-white"
              value={form.username}
              onChange={handleChange}
              autoFocus
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="border rounded p-2 w-full bg-white"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded cursor-pointer"
          >
            {loading ? "Loading..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
