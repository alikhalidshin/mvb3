import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import OwnerDashboard from './pages/OwnerDashboard';
import AnalystDashboard from './pages/AnalystDashboard';
import TenantDashboard from './pages/TenantDashboard';
import InspectionDetail from './pages/InspectionDetail';
import AnalystInspection from './pages/AnalystInspection';
import ReportView from './pages/ReportView';
import PropertiesList from './pages/PropertiesList';
import Settings from './pages/Settings';
import TenantReports from './pages/TenantReports';
import Login from './pages/Login';

// Remove base styles that might conflict
// import './App.css'

// Protected Route Component
const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, isLoading } = useApp();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to their appropriate dashboard if they try to access unauthorized pages
    if (currentUser.role === 'owner') return <Navigate to="/owner" replace />;
    if (currentUser.role === 'analyst') return <Navigate to="/analyst" replace />;
    if (currentUser.role === 'tenant') return <Navigate to="/tenant" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Layout />}>
            {/* Redirect root based on role is handled in Login or manual nav, currently redirect to Login if no auth */}
            <Route index element={<Navigate to="/login" replace />} />
            
            {/* Owner Routes */}
            <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
              <Route path="owner" element={<OwnerDashboard />} />
              <Route path="owner/properties" element={<PropertiesList />} />
              <Route path="owner/items/:id" element={<InspectionDetail />} />
              <Route path="owner/settings" element={<Settings />} />
              <Route path="owner/*" element={<OwnerDashboard />} />
            </Route>

            {/* Analyst Routes */}
            <Route element={<ProtectedRoute allowedRoles={['analyst']} />}>
              <Route path="analyst" element={<AnalystDashboard />} />
              <Route path="analyst/inspection/:id" element={<AnalystInspection />} />
            </Route>
            
            {/* Tenant Routes */}
            <Route element={<ProtectedRoute allowedRoles={['tenant']} />}>
              <Route path="tenant" element={<TenantDashboard />} />
              <Route path="tenant/reports" element={<TenantReports />} />
            </Route>
          </Route>
          
          {/* Standalone Inspection Report - Protected for all authenticated users? or public? Let's say authenticated */}
          <Route element={<ProtectedRoute allowedRoles={['owner', 'analyst', 'tenant']} />}>
            <Route path="/report/:id" element={<ReportView />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
