
// Used for Organization Registration oraganizationAuthPage.tsx
// Including Organization Name, Description, Official Website, Email, Password, Confirm Password

import {Fragment} from 'react';


function OrganizationAuthPage(){
    return( 
        <Fragment> 
            <h1>Register Your Organization</h1>
            <p>Get connected with volunteers in through Volunteer Anchorage</p>
            <h4>Organization Profile</h4>
            <p>General information about your organization/non-profit </p>

            <form className = 'form'>
            <div className = "col-md-10">
                <label htmlFor="organizationName">Organization Name</label> 
                <input type="text" className="form-control" id="organizationName" placeholder="e.g. Anchorage Volunteer Network"/>
            </div>
            <div className = "col-md-10">
                <label htmlFor="Description">Description</label>
                <input type="text" className="form-control" id="Description" placeholder="Briefly describe your organization's purpose..."/>
            </div>
            <div className = "col-md-10">
                <label htmlFor="Official Website">Official Website</label>
                <input type="text" className="form-control" id="official_website" placeholder="https://www.official-organization-wesite.com"/>
            </div>
            <h4>Primary Contact</h4>
            <p> information about the primary contact for your organization</p>


            <div className = "row g-1">
            <div className="col-md-5">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="contact_email" placeholder='j.doe@organization.com'/>
            </div>
            </div>
            <div className = "row g-2">
            <div className="col-md-5">
                <label htmlFor="inputPassword4" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'/>
            </div>
            <div className="col-md-5">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder='Confirm Password'/>
            </div>
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
          </form>
        </Fragment>
    );
}

export default OrganizationAuthPage;