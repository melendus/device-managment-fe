import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signIn } from "../../services/authApi";
import { useAppDispatch } from "../../hooks/hooks";
import { updateCurrentUser } from "../../redux/slices/UserSlice";
import { getAllUsers } from "../../services/UserApi";
import { useState } from "react";

const theme = createTheme();

interface SignInProps {
  setToken: (value: any) => void;
}

const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

const SignInPage = ({ setToken }: SignInProps) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const dispatch = useAppDispatch();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await signIn(formData);
    const status = localStorage.getItem("loggedIn");
    if (status === "true") {
      setToken(localStorage.getItem("token"));
      const user = response.user;
      delete user.password;
      dispatch(updateCurrentUser(user));
    } else {
      setToken("");
    }

    await getAllUsers();
  };

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={({ target }) => handleChange(target.name, target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={({ target }) => handleChange(target.name, target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInPage;
