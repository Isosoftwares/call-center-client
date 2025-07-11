import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import F404Page from "./F404Page";
import Login from "./Login";
import Unauthorized from "./Unauthorized";

// Main Pages
import Home from "./website/Home";

// Layout
import useScrollToTop from "./components/useScrollToTop";
import Dashboard from "./website/Dashboard";
import CallManagement from "./website/CallManagement";
import CallHistory from "./website/CallHistory";
import AgentManagement from "./website/AgentManagement";
import QueueManagement from "./website/QueueManagement";
import Analytics from "./website/Analytics";
import PhoneNumbers from "./website/PhoneNumbers";
import Settings from "./website/Settings";
import Layout from "./website/components/Layout";
import Softphone from "./website/SoftPhone";
import DashboardLayout from "./agent-dashboard/DashboardLayout";
import AgentCallHistory from "./agent-dashboard/AgentCallHistory";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  const location = useLocation();
  useScrollToTop();

  return (
    <div className="relative">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<PersistLogin />}>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes */}
            <Route
              element={<RequireAuth allowedRoles={["supervisor", "admin"]} />}
            >
              <Route path="/dashboard" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="softphone" element={<Softphone />} />
                <Route path="overview" element={<Dashboard />} />
                <Route path="calls" element={<CallManagement />} />
                <Route path="calls/history" element={<CallHistory />} />
                <Route path="agents" element={<AgentManagement />} />
                <Route path="queues" element={<QueueManagement />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="phone-numbers" element={<PhoneNumbers />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Protected Routes */}
            <Route element={<RequireAuth allowedRoles={["agent"]} />}>
              <Route path="/agent" element={<DashboardLayout />}>
                <Route index element={<Softphone />} />
                <Route path="softphone" element={<Softphone />} />
                <Route path="calls/history" element={<AgentCallHistory />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            <Route path="/*" element={<F404Page />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
