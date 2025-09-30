import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import routes from './routes';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CustomerService from '@/components/common/CustomerService';
import { LanguageProvider } from '@/contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <CustomerService />
          <Toaster position="top-right" />
        </div>
      </LanguageProvider>
    </Router>
  );
};

export default App;
