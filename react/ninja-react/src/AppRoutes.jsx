import React, { Fragment, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { PageSection } from "@patternfly/react-core";
import FormSection from "./components/UserRegistrationForm";
import AdminSection from "./components/AdminConfigurable";
import ScorecardSection from "./components/Scorecard";
import LoginSection from "./components/NinjaLogin";

/**
 * @author fostimus
 */

export const ninjaRoutes = [
  {
    id: 1,
    routeName: "Scorecards",
    routePath: "/scorecards",
    component: ScorecardSection
  },
  {
    id: 2,
    routeName: "Leaderboard",
    routePath: "/leaderboard"
  },
  {
    id: 3,
    routeName: "Events",
    routePath: "/events"
  },
  {
    id: 4,
    routeName: "Tasks",
    routePath: "/tasks"
  },
  {
    id: 5,
    routeName: "Registration Form",
    routePath: "/registration-form",
    component: FormSection
  },
  {
    id: 6,
    routeName: "Responses Spreadsheet",
    routePath: "/responses-spreadsheets"
  },
  {
    id: 7,
    routeName: "Support - Trello Query",
    routePath: "/support/trello-query"
  },
  {
    id: 8,
    routeName: "Support - Trello Reconciliation",
    routePath: "/support/trello-reconciliation"
  }
];

//TODO: leverage component field in <Switch> component
export const adminRoutes = [
  {
    id: 1,
    routeName: "Config",
    routePath: "/config",
    component: AdminSection,
    adminPage: "Config"
  },
  {
    id: 2,
    routeName: "Database",
    routePath: "/database",
    component: AdminSection,
    adminPage: "Database"
  }
];
//
// <Route exact path="/">
//   {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
// </Route>

const AppRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Fragment>
      <Switch>
        <Route key="home" exact path="/" render={() => <LoginSection />} />
        <Route key="login" path="/login" render={(props) => <LoginSection {...props} setLoggedIn={setLoggedIn} />} />

        {ninjaRoutes.map(route => (
          <Route
            key={route.routeName}
            path={route.routePath}
          >
            {loggedIn ? route.component : <Redirect to="/login" />}
          </Route>
        ))}

        {adminRoutes.map(route => (
          <Route key={route.routeName} path={route.routePath}>
            {loggedIn ? (
              //TODO: use route.component and pass in route.adminPage as prop
              <AdminSection adminPage={route.adminPage} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        ))}

        <Route
          key="not-found"
          path="*"
          render={() => (
            <PageSection>
              <div>Not Found</div>
            </PageSection>
          )}
        />
      </Switch>
    </Fragment>
  );
};

export default AppRoutes;
