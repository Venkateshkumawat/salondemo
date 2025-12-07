import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Appointments } from './pages/Appointments';
import { Clients } from './pages/Clients';
import { Services } from './pages/Services';
import { Billing } from './pages/Billing';
import { Settings } from './pages/Settings';
import { ThemeProvider } from './components/ThemeContext';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={
            !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />
          } />
          
          {/* Protected Routes */}
          <Route path="/" element={
            isAuthenticated ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="clients" element={<Clients />} />
            <Route path="billing" element={<Billing />} />
            <Route path="services" element={<Services />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
