import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import { signInOrganization } from "../../lib/auth";

function NavBar() {
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
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Volunteer Anchorage
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/home">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/opportunities">
                Opportunities
              </Link>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary ms-2 dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
          >
            Sign In
          </button>

          <div
            className="dropdown-menu dropdown-menu-end p-4"
            style={{ minWidth: "250px" }}
          >
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
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
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-2" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <hr />

            <Link to="/signup" className="btn btn-outline-success w-100">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;