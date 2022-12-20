import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { useAuth } from "src/hooks/useAuth";
import axios from "axios";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    try {
      const result = await axios.post("http://43.205.113.198:3001/login", {
        email: email,
        password: password,
      });

      if (result.status === 200) {
        login(result.data);
        navigate("/dashboard", { replace: true });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("Invalid credentials");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" id="email" label="Email address" />

        <TextField
          name="password"
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        {/* <Checkbox name="remember" label="Remember me" /> */}
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleLogin}
      >
        Login
      </LoadingButton>
    </>
  );
}
