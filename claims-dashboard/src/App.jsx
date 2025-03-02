import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Dashboard from "./routes/Dashboard";
import ClaimsList from "./routes/ClaimsList";
import ClaimDetails from "./routes/ClaimDetails";
import Report from "./routes/Report";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Layout from "./components/Layout";
import { SidebarProvider } from "./SidebarContext";

const App = () => {
  return (
    <Router>
      <SidebarProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes inside Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} /> {/* Default route */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="claims" element={<ClaimsList />} />
            <Route path="claims/:id" element={<ClaimDetails />} />
            <Route path="report" element={<Report />} />
          </Route>
        </Routes>
      </SidebarProvider>
    </Router>
  );
};

export default App;
