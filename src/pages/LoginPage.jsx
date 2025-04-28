import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../api/AuthController";
import Logo from "../assets/icons/logo.png";
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await LoginAPI(data.email, data.password);
      const token = response.token; // assuming { token: '...' }

      if (token) {
        sessionStorage.setItem("authToken", token);
        navigate("/home");
      } else {
        alert("Login failed. No token received.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{ padding: 6, borderRadius: 3, maxWidth: 400, width: "100%" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "80px", height: "80px" }}
          />
        </Box>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome Back!
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          gutterBottom
          sx={{ color: "text.secondary" }}
        >
          Please login to your account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 3 }}
        >
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
        <Typography
          variant="caption"
          align="center"
          display="block"
          sx={{ color: "text.secondary", marginTop: 4 }}
        >
          This test result is provided by <strong>Pyae Phyo Swe</strong>.
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginPage;
