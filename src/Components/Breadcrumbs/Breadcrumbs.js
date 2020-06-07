import PropTypes from "prop-types";
import React from "react";
import { NavLink, Route } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Theme } from "../../utils";

function Breadcrumbs() {
    return <Route path="/:path" component={BreadcrumbItem} />;
}

function BreadcrumbItem({ match }) {
    return (
        <NavLink
            to={match.url || ""}
            activeStyle={{
                fontWeight: "bold",
                color: Theme.palette.secondary.contrastText
            }}
            style={{
                color: Theme.palette.secondary.contrastText
            }}
        >
            <Typography align="center">{match.url.toUpperCase()}</Typography>
            <Route path={`${match.url}/:path`} component={BreadcrumbItem} />
        </NavLink>
    );
}
BreadcrumbItem.propTypes = {
    match: PropTypes.any
};

Breadcrumbs.displayName = "BreadCrumbs";
export default Breadcrumbs;
