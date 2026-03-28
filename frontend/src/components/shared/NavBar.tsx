import { Link } from "react-router-dom";

function NavBar() {
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

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary ms-2 dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Sign In
          </button>

          <div className="dropdown-menu dropdown-menu-end p-4" style={{ minWidth: "250px" }}>
            <form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-2">
                Log In
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