import { RouteType } from "./config";
import React from "react";
import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DevicesPage from "../pages/questions/DevicesPage";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import UserProfilePage from "../pages/userProfile/UserProfilePage";
import UserProfilesPage from "../pages/userProfile/UserProfilesPage";
import QuestionPage from "../components/common/question/QuestionPage";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const appRoutes: RouteType[] = [
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />,
    },
  },
  {
    path: "/questions",
    element: <DevicesPage />,
    state: "questions",
    sidebarProps: {
      displayText: "Questions",
      icon: <QuestionAnswerOutlinedIcon />,
    },
  },
  {
    path: "/users",
    element: <UserProfilesPage />,
    state: "users",
    sidebarProps: {
      displayText: "Users",
      icon: <AccountCircleOutlinedIcon />,
    },
  },
  {
    path: "/signIn",
    element: <DashboardPageLayout />, //doesn't matter what I put here
    state: "sign-out",
    sidebarProps: {
      displayText: "Sign Out",
      icon: <LogoutOutlinedIcon />,
    },
  },
  {
    path: "/userProfile",
    element: <UserProfilePage />,
    state: "profile",
  },
  {
    path: "/question",
    element: <QuestionPage />,
    state: "question",
  },
];

export default appRoutes;
