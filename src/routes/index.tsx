import { ReactNode } from "react";
import { Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import appRoutes from "./appRoutes";
import { RouteType } from "./config";

const generateRoute = (routes: RouteType[]): ReactNode => {
  return routes.map((route, index) => {
    let newRoute;
    if (route.path === "/signIn") {
      return;
    }

    if (route.path === "/profile") {
      newRoute = route.path + "/:id";
    } else {
      newRoute = route.path;
    }

    return route.index ? (
      <Route
        index
        path={newRoute}
        element={<PageWrapper state={route.state}>{route.element}</PageWrapper>}
        key={index}
      />
    ) : (
      <Route
        path={newRoute}
        element={
          <PageWrapper state={route.child ? undefined : route.state}>
            {route.element}
          </PageWrapper>
        }
        key={index}
      >
        {route.child && generateRoute(route.child)}
      </Route>
    );
  });
};

export const routes: ReactNode = generateRoute(appRoutes);
