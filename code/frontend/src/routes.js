import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import Dashboard from "./pages/DashboardAppPage";
import HealthPage from "./pages/Health";
import TrainingPage from "./pages/TrainingPage";
import VaccinationPage from "./pages/VaccinationPage";
import LocationPage from "./pages/LocationPage";
import SettingsPage from "./pages/SettingsPage";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: "home", element: <Dashboard /> },
        { path: "health", element: <HealthPage /> },
        { path: "vaccination", element: <VaccinationPage /> },
        { path: "training", element: <TrainingPage /> },
        { path: "location", element: <LocationPage /> },
        { path: "settings", element: <SettingsPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
