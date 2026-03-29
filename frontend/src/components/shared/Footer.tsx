import logo from "../../assets/logo.png";

function Footer() {
  return (
    <footer
      className="text-center text-lg-start text-dark"
      style={{ backgroundColor: "#ECEFF1" }}
    >
      <div className="container-fluid p-4 pb-0">
        <section>
          <div className="row">
            <div>
              <img
                className="mb-4"
                src={logo}
                alt="Logo"
                width="54"
                height="50"
              />
              <h6 className="mb-4 fw-bold">VolunteerAnchorage</h6>
              <p>
                Connecting Anchorage with meaningful volunteer opportunities.
              </p>
            </div>
          </div>
        </section>

        <hr className="my-3" />

        <section className="p-3 pt-0">
          <div className="row d-flex align-items-center">
            <div className="col-md-12 text-center">
              <div className="p-3">
                © 2026 AnchorageVolunteer. All Rights Reserved
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;