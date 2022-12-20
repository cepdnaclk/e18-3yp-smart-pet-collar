import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import { Link, Container, Typography } from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/logo";
// sections
import { LoginForm, SignupForm } from "../sections/auth/login";
import { useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import { Navigate } from "react-router-dom";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive("up", "md");
  const [isSignup, setIsSignup] = useState(false);

  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Helmet>
        <title> Login | PetSmart </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            {isSignup ? (
              <>
                <Typography variant="h4" gutterBottom>
                  Sign up to PetSmart
                </Typography>

                <Typography variant="body2" sx={{ mb: 5 }}>
                  Already have an account? {""}
                  <Link variant="subtitle2" onClick={() => setIsSignup(false)}>
                    Login
                  </Link>
                </Typography>

                <SignupForm />
              </>
            ) : (
              <>
                <Typography variant="h4" gutterBottom>
                  Sign in to PetSmart
                </Typography>

                <Typography variant="body2" sx={{ mb: 5 }}>
                  Don't have an account? {""}
                  <Link variant="subtitle2" onClick={() => setIsSignup(true)}>
                    Get started
                  </Link>
                </Typography>

                <LoginForm />
              </>
            )}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
