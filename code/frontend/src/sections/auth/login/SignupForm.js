import { useState } from "react";
// @mui
import { Stack, IconButton, InputAdornment, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import axios from "axios";
import { useAuth } from "src/hooks/useAuth";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async () => {
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let device = document.getElementById("device").value;
    let pin = document.getElementById("pin").value;

    try {
      const result = await axios.post("http://43.205.113.198:3001/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        device: device,
        pin: pin,
      });

      if (result.status === 201) {
        login(result.data);
        navigate("/dashboard", { replace: true });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert(error.response.data);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <Stack spacing={3} marginBottom={3}>
        <Stack direction={"row"} spacing={3}>
          <TextField name="fname" id="fname" label="First Name" fullWidth />
          <TextField name="lname" id="lname" label="Last Name" fullWidth />
        </Stack>
        <TextField name="email" id="email" label="Email address" />
        <Stack direction={"row"} spacing={3}>
          <TextField name="device" id="device" label="Device Id" fullWidth />
          <TextField name="pin" id="pin" label="Device Pin" />
        </Stack>

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

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSignup}
      >
        Sign up
      </LoadingButton>
    </>
  );
}
