/*
 * This file is your actual application.
 */

import React, { useEffect, useState, Suspense } from "react";
import { useAuth } from "./Firebase";
import { useUser } from "./UserProvider";
import { Switch } from "react-router";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, ApolloProvider, HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { CssBaseline, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { BuildRoutes } from "./Routes";
import { GRAPHQL_URL, Theme } from "./utils";
import { Header, Sidebar } from "./Components";
import Typography from "@material-ui/core/Typography";
import { Build } from "@material-ui/icons";

/* This object sets up the CSS class names that will be used for this component. */
const useStyles = makeStyles(() => ({
    /*
     * root is the highest level div/container in the application. Set width and height to 100% of the view width and
     * view height respectively. Set display to flex so children divs can behave responsively.
     */
    root: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflow: "hidden"
    },
    /*
     * The div that will hold our primary content. The flex property allows it to stretch and shrink with its parent.
     */
    content: {
        flex: "1 1 100%",
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden"
    },
    column: {},
    row: {
        width: "100%"
    }
}));

export default () => {
    /* Passes our Theme to the classes above, allowing us to access properties of the Theme like palette. */
    const classes = useStyles(Theme);

    const auth = useAuth();
    const user = useUser();

    /* The user's access token. Lets them access data based on their role; admin, user, or anonymous. */
    const [accessToken, setAccessToken] = useState("");
    const [allowedRoles, setAllowedRoles] = useState(["anonymous"]);
    const [userId, setUserId] = useState("");

    /*
     * Fetch the token asynchronously so it doesn't lock loading of other visual elements. If it fails display
     * an error message in the console.
     */

    /* HTTP link to the GraphQL engine */
    const httpLink = new HttpLink({
        uri: GRAPHQL_URL
    });
    /* Appends necessary headers to requests so that GraphQL engine can validate user access. */
    const authLink = setContext((_, { headers }) => {
        if (accessToken) {
            return {
                headers: {
                    ...headers,
                    Authorization: `Bearer ${accessToken}`
                }
            };
        } else {
            return {
                headers: {
                    ...headers
                }
            };
        }
    });

    /* Set up the Apollo Client for querying the GraphQL engine */
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    /* Display a message to users who like to look at console output */
    useEffect(() => {
        console.debug(`
    Move along people, nothing to see here.
    `);
    }, []);

    useEffect(() => {
        if (auth) {
            if (
                auth.token &&
                auth.allowedRoles &&
                Boolean(auth.allowedRoles.length) &&
                auth.userId
            ) {
                setAccessToken(auth["token"]);
                setAllowedRoles(auth["allowedRoles"]);
                setUserId(auth.userId);
            }
        }
    }, [auth]);

    useEffect(() => {
        if (user && userId) {
            user.updateUserId(userId);
        }
    }, [userId, user]);

    /*
     * Apollo Provider wraps the application so that any page within the application will use the same Apollo Provider.
     * Outer div conforms to fill the view port. Inner div fills its parent. Switch handles changing the application's
     * content when you navigate to a page. All pages render within the Switch. Use root if you want to add things like
     * header, footer, or navigation menus so they don't occlude your main content. Use content for components you want
     * occupy the same space as your main content.
     */
    return (
        <ApolloProvider client={client}>
            <div className={clsx(classes.root)}>
                <CssBaseline />
                <div className={clsx(classes.column)}>
                    <Sidebar />
                </div>
                <div className={clsx(classes.content)}>
                    <div className={clsx(classes.row)}>
                        <Header />
                    </div>
                    <div
                        className={clsx(classes.content)}
                        style={{
                            margin: Theme.spacing(1)
                        }}
                    >
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>{BuildRoutes(allowedRoles)}</Switch>
                        </Suspense>
                    </div>
                    <div
                        className={clsx(classes.row)}
                        style={{
                            backgroundColor: "yellow",
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <div className={clsx(classes.pad)}>
                            <Build />
                        </div>
                        <div className={clsx(classes.pad)}>
                            <Typography>
                                Excuse our mess while we are under construction.
                                Please report issues, bugs, suggestions, etc. to{" "}
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://github.com/SpeakEasy-tools/SpeakEasy/issues/new"
                                >
                                    this link
                                </a>
                            </Typography>
                        </div>
                        <div className={clsx(classes.pad)}>
                            <Build />
                        </div>
                    </div>
                </div>
            </div>
        </ApolloProvider>
    );
};
