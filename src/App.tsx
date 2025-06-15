
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import AppPage from './pages/App';
import Auth from './pages/Auth';
import Goals from './pages/Goals';
import Projects from './pages/Projects';
import Investment from './pages/Investment';
import Personal from './pages/Personal';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/app/*" element={
          <Routes>
            <Route index element={<AppPage />} />
            <Route path="goals" element={<Goals />} />
            <Route path="projects" element={<Projects />} />
            <Route path="investment" element={<Investment />} />
            <Route path="personal" element={<Personal />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
