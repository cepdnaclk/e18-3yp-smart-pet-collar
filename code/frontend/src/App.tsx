import {
  Box,
  CssBaseline,
  CssVarsProvider,
  IconButton,
  Menu,
  Typography,
} from "@mui/joy";
import theme from "./theme";
import Layout from "./components/Layout";
import { AccountCircle, BookRounded, Face, PetsRounded } from "@mui/icons-material";
import { ColorSchemeToggle } from "./components/ColorSchemeToggle";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SideNavBar from "./components/SideNavBar";

const { Root, Header, SideNav, SideDrawer, Main } = Layout;

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <BrowserRouter>
      <CssVarsProvider disableTransitionOnChange theme={theme}>
        <CssBaseline />
        {drawerOpen && (
          <SideDrawer onClose={() => setDrawerOpen(false)}>
            <SideNavBar />
          </SideDrawer>
        )}
        <Root
          sx={{
            ...(drawerOpen && {
              height: "100vh",
              overflow: "hidden",
            }),
          }}
        >
          <Header>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <IconButton
                variant="outlined"
                size="sm"
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { sm: "none" } }}
              ></IconButton>
              <IconButton
                size="sm"
                variant="solid"
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                <PetsRounded />
              </IconButton>
              <Typography component="h1" fontWeight="xl">
                PetSmart
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
              <ColorSchemeToggle />
              <IconButton size="sm" variant="outlined" color="primary">
                <AccountCircle />
              </IconButton>
            </Box>
          </Header>
          <SideNav>
            <SideNavBar />
          </SideNav>
          <Main>
            <Routes>
              <Route path="/*" element={<Navigate replace to="/home" />} />
              <Route path="/home" element={"Home"} />
              <Route path="/location" element={"Location"} />
              <Route path="/health" element={"Health"} />
              <Route path="/settings" element={"Settings"} />
            </Routes>
          </Main>
        </Root>
      </CssVarsProvider>
    </BrowserRouter>
  );
}

export default App;
