import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({component:Component, ...rest})=>{
    return(
        <Route path={rest.path} render={()=>rest.user?<Component />:<Redirect to="/signin" /> } />
    )
}

export default AuthenticatedRoute;