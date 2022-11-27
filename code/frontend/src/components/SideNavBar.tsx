import {
  Favorite,
  HealthAndSafetyRounded,
  HomeRounded,
  MyLocationRounded,
  SettingsRounded,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  ListSubheader,
} from "@mui/joy";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SideNavBar() {
  const [index, setIndex] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/home") {
      setIndex(0);
    } else if (path === "/location") {
      setIndex(1);
    } else if (path === "/health") {
      setIndex(2);
    } else if (path === "/settings") {
      setIndex(3);
    } else {
      setIndex(0);
    }
  }, []);

  // navbar btn list
  const navList = [
    {
      icon: <HomeRounded />,
      text: "Home",
      path: "/home",
    },
    {
      icon: <MyLocationRounded />,
      text: "Location",
      path: "/location",
    },
    {
      icon: <Favorite />,
      text: "Health",
      path: "/health",
    },
    {
      icon: <SettingsRounded />,
      text: "Settings",
      path: "/settings",
    },
  ];

  return (
    <List size="sm" sx={{ "--List-item-radius": "8px" }}>
      <ListItem nested>
        <ListSubheader>Dashboard</ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          {navList.map((item, i) => (
            <ListItem key={i}>
              <ListItemButton
                selected={index === i}
                variant={index === i ? "soft" : "plain"}
                onClick={() => {
                  navigate(item.path);
                  setIndex(i);
                }}
              >
                <ListItemDecorator sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemDecorator>
                <ListItemContent>{item.text}</ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </ListItem>
    </List>
  );
}
