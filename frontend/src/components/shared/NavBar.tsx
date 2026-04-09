import { Link } from "react-router-dom";
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

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <img src={logo} alt="Logo" width="34" height="30" />

        <div className="navbar-brand">VolunteerAnchorage</div>

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

            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/your-opportunities">
                  Your Opportunities
                </Link>
              </li>
            )}
          </ul>

          <SignInDropdown />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;