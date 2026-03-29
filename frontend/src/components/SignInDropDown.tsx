import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signInOrganization } from "../lib/auth";

function SignInDropdown() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      await signInOrganization(loginData.email, loginData.password);

      alert("Logged in successfully.");
      setLoginData({ email: "", password: "" });
      navigate("/home");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Login failed.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dropdown ms-auto me-3">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
      >
        Sign In
      </button>

      <div className="dropdown-menu dropdown-menu-end p-4" style={{ minWidth: "250px" }}>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <hr />

        <a href="/signup" className="btn btn-outline-success w-100">
          Create Account
        </a>
      </div>
    </div>
  );
}

export default SignInDropdown;