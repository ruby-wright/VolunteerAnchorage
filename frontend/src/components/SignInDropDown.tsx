import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInOrganization } from "../lib/auth";
import { supabase } from "../lib/supabaseClient";

function SignInDropdown() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<null | { email?: string }>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user ? { email: user.email } : null);
    };

    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { email: session.user.email } : null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      await signInOrganization(loginData.email, loginData.password);

      setLoginData({
        email: "",
        password: "",
      });

      alert("Logged in successfully.");
      navigate("/home");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Login failed.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setUser(null);
      setLoginData({
        email: "",
        password: "",
      });

      alert("Signed out successfully.");
      navigate("/home");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Sign out failed.";
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
        data-bs-auto-close="true"
        disabled={loading}
      >
        {user ? "Account" : "Sign In"}
      </button>

      <div
        className="dropdown-menu dropdown-menu-end p-4"
        style={{ minWidth: "250px" }}
      >
        {user ? (
          <>
            <p className="mb-3">Signed in as {user.email}</p>

            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? "Signing out..." : "Sign Out"}
            </button>
          </>
        ) : (
          <>
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

            <Link to="/signup" className="btn btn-outline-success w-100">
              Create Account
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default SignInDropdown;