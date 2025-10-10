import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

import routes from './routes';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CustomerService from '@/components/common/CustomerService';
import { LanguageProvider } from '@/contexts/LanguageContext';

// 语言检测组件
const LanguageDetector: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // 根据URL路径检测语言
  const isEnglish = location.pathname.startsWith('/en');
  
  return (
    <LanguageProvider initialLanguage={isEnglish ? 'en' : 'zh'}>
      {children}
    </LanguageProvider>
  );
};

// 应用内容组件
const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <LanguageDetector>
      <div className="flex flex-col min-h-screen">
        {!isAdminPage && <Header />}
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
        {!isAdminPage && <Footer />}
        {!isAdminPage && <CustomerService />}
        <Toaster position="top-right" />
      </div>
    </LanguageDetector>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
