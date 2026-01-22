import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // We will need to update this too
import AlertMessage from './components/AlertMessage';
import './App.css';
import { useAuth } from './hooks/useAuth';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AdminPetManager from './pages/AdminPetManager';
import AdminRequestManager from './pages/AdminRequestManager';
import ClientPetBrowser from './pages/ClientPetBrowser';
import WelcomePage from './pages/WelcomePage';

// Helper component to redirect if already authenticated
const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

// Update ProtectedRoute to use useAuth? 
// Or update the file ProtectedRoute.tsx itself. 
// I will assume ProtectedRoute.tsx needs update, but for now I will rely on it being there 
// and update App.tsx to use the Provider.

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AlertMessage />
          <Routes>
            <Route path="/login" element={
              <PublicRoute><LoginPage /></PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute><RegisterPage /></PublicRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/pets" element={
              <ProtectedRoute>
                <AdminPetManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/requests" element={
              <ProtectedRoute>
                <AdminRequestManager />
              </ProtectedRoute>
            } />
            <Route path="/browse" element={
              <ProtectedRoute>
                <ClientPetBrowser />
              </ProtectedRoute>
            } />
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
