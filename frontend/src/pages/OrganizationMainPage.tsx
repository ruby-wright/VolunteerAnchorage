import React from "react";

function OrganizationMainPage() {
  return (
    <main role="main">
      <section className="text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Share Your Volunteer Opportunities</h1>
            <div className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Details of the volunteer opportunity. Still working on it </p>
                   <button className="btn btn-primary" type="submit">Delete</button>
                </div>
            </div>
        </div>
      </section>          
    </main>
  );
}

export default OrganizationMainPage;