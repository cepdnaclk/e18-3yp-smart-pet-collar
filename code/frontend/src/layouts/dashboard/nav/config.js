// component
import {
  Dashboard,
  Explore,
  MonitorHeart,
  Settings,
  SportsSoccer,
  Vaccines,
} from "@mui/icons-material";

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/home",
    icon: <Dashboard />,
  },
  {
    title: "location",
    path: "/dashboard/location",
    icon: <Explore />,
  },
  {
    title: "health",
    path: "/dashboard/health",
    icon: <MonitorHeart />,
  },
  {
    title: "vaccination",
    path: "/dashboard/vaccination",
    icon: <Vaccines />,
  },
  {
    title: "training",
    path: "/dashboard/training",
    icon: <SportsSoccer />,
  },
  {
    title: "settings",
    path: "/dashboard/settings",
    icon: <Settings />,
  },
];

export default navConfig;
