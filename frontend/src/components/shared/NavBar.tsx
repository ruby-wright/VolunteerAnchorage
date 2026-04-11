import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import SignInDropdown from "../SignInDropDown";
import { supabase } from "../../lib/supabaseClient";

function NavBar() {
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

  const linkStyle = {
    fontSize: "1.05rem",
    fontWeight: 600,
    padding: "8px 12px",
    borderRadius: 8,
    transition: "all 0.15s ease",
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div className="container-fluid px-4">
        {/* Logo + Brand */}
        <NavLink
          to="/home"
          className="navbar-brand d-flex align-items-center gap-2"
          style={{
            fontWeight: 900,
            fontSize: "1.25rem",
            color: "#111827",
            textDecoration: "none",
          }}
        >
          <img src={logo} alt="Logo" width="34" height="30" />
          VolunteerAnchorage
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          {/* Nav Links */}
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0"
            style={{ gap: "6px" }}
          >
            <li className="nav-item">
              <NavLink
                to="/home"
                className="nav-link"
                style={({ isActive }) => ({
                  ...linkStyle,
                  color: isActive ? "#2563eb" : "#374151",
                  fontWeight: isActive ? 700 : 600,
                  background: isActive ? "#eff6ff" : "transparent",
                })}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/opportunities"
                className="nav-link"
                style={({ isActive }) => ({
                  ...linkStyle,
                  color: isActive ? "#2563eb" : "#374151",
                  fontWeight: isActive ? 700 : 600,
                  background: isActive ? "#eff6ff" : "transparent",
                })}
              >
                Opportunities
              </NavLink>
            </li>

            {user && (
              <li className="nav-item">
                <NavLink
                  to="/your-opportunities"
                  className="nav-link"
                  style={({ isActive }) => ({
                    ...linkStyle,
                    color: isActive ? "#2563eb" : "#374151",
                    fontWeight: isActive ? 700 : 600,
                    background: isActive ? "#eff6ff" : "transparent",
                  })}
                >
                  Your Opportunities
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <NavLink
                to="/connect"
                className="nav-link"
                style={({ isActive }) => ({
                  ...linkStyle,
                  color: isActive ? "#2563eb" : "#374151",
                  fontWeight: isActive ? 700 : 600,
                  background: isActive ? "#eff6ff" : "transparent",
                })}
              >
                Connect
              </NavLink>
            </li>
          </ul>

          {/* Right Side */}
          <SignInDropdown />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;