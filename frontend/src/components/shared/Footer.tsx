import React from 'react';
import logo from '../../assets/logo.png';

function Footer() {
  return (
    <div className="container my-5">
        <footer className="text-center text-lg-start text-dark" style={{ 'backgroundColor': '#ECEFF1' }}>
            <div className="container p-4 pb-0">
            <section className="">
                <div className="row">
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <img className="mb-4" src={logo} alt="" width="54" height="50" />
                    <h6 className="mb-4 font-weight-bold">
                    AnchorageVolunteer
                    </h6>
                    <p>
                    Connecting Anchorage with meaningful volunteer opportunities.
                    </p>
                </div>
                <hr className="w-100 clearfix d-md-none" />
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-bold">
                    Explore
                    </h6>
                    <p>
                    <a className="text-dark">
                        All Opportunities
                    </a>
                    </p>
                    <p>
                    <a className="text-dark">
                        Advance Search
                    </a>
                    </p>
                </div>
                <hr className="w-100 clearfix d-md-none" />
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">
                    About
                    </h6>
                    <p>
                    <a className="text-dark">
                        Organizations
                    </a>
                    </p>
                    <p>
                    <a className="text-dark">
                        FAQ  
                    </a>
                    </p>
                </div>
                </div>
                {/* Grid row */}
            </section>
            <hr className="my-3" />
            <section className="p-3 pt-0">
                <div className="row d-flex align-items-center">
                <div className="col-md-7 col-lg-8 text-center text-md-start">
                    <div className="p-3 text-center">
                    © 2020 Copyright. All Rights Reserved
                    </div>
                </div>
                </div>
            </section>
            </div>
        </footer>
        </div>
    );
}
export default Footer;