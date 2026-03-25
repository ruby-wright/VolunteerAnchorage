import React from 'react';
import logo from '../../assets/logo.png';

function SignInPage(){
    return(
        <form className="form-signin">
            <img className="mb-4" src={logo} alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">
                Please sign in
            </h1>
            <label htmlFor="inputEmail" className="sr-only">
                Email address
            </label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required={true} autoFocus={true} />
            <label htmlFor="inputPassword" className="sr-only">
                Password
            </label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required={true} />
            <div className="checkbox mb-3">
                <label>
                <input type="checkbox" value="remember-me" />
                Remember me
                </label>
                <p><a href="#" className="link-underline-primary">Forgot Password</a></p>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
                Sign in
            </button>
            <p className="mt-5 mb-3 text-muted">
                © 2024 Volunteer Anchorage
            </p>
        </form>
    );

}

export default SignInPage;  