import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Suspense, lazy } from "react";
import LoginPage from "./pages/LoginPage";

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ListPage = lazy(() => import("./pages/ListPage"));
const EditLocationPage = lazy(() => import("./pages/EditLocationPage"));
// Protect Routes Component
function ProtectedRoute() {
  const token = sessionStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Only show AppBar if not at login
  const showAppBar = location.pathname !== "/";

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    navigate('/', { replace: true }); // Redirect to login
  };

  return (
    <>
      {showAppBar && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Location Picker App
            </Typography>
            <Button color="inherit" component={Link} to="/home">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/list">
              Locations
            </Button>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      )}

      <Container sx={{ marginTop: 4 }}>
        {/* Add Suspense fallback */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/edit/:id" element={<EditLocationPage />} />
            </Route>

            {/* Redirect everything unknown to Login */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
