import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import ConsultationForm from '@/components/forms/ConsultationForm';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), path: language === 'en' ? '/en' : '/' },
    { name: t('nav.about'), path: language === 'en' ? '/en/about' : '/about' },
    { name: t('nav.products'), path: language === 'en' ? '/en/products' : '/products' },
    { name: t('nav.solutions'), path: language === 'en' ? '/en/solutions' : '/solutions' },
    { name: t('nav.news'), path: language === 'en' ? '/en/news' : '/news' },
    { name: t('nav.contact'), path: language === 'en' ? '/en/contact' : '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 处理语言切换
  const handleLanguageChange = (newLanguage: 'zh' | 'en') => {
    setLanguage(newLanguage);
    
    // 获取当前路径并转换为对应语言的路径
    const currentPath = location.pathname;
    let newPath = currentPath;
    
    if (newLanguage === 'en') {
      // 切换到英文
      if (currentPath === '/') {
        newPath = '/en';
      } else if (!currentPath.startsWith('/en')) {
        newPath = '/en' + currentPath;
      }
    } else {
      // 切换到中文
      if (currentPath === '/en') {
        newPath = '/';
      } else if (currentPath.startsWith('/en')) {
        newPath = currentPath.replace('/en', '');
        if (newPath === '') {
          newPath = '/';
        }
      }
    }
    
    // 导航到新路径
    navigate(newPath);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">捷</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">捷瀚液压</span>
                <span className="text-xs text-gray-500">JIEHAN HYDRAULIC</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'text-blue-600 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Language Switcher & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32 h-9">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <Phone className="w-4 h-4 mr-2" />
                  {t('nav.consultation')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <ConsultationForm />
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="px-3 py-2">
                <Select value={language} onValueChange={(value: 'zh' | 'en') => setLanguage(value)}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      {t('nav.consultation')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <ConsultationForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;