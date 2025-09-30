import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译数据
const translations = {
  zh: {
    // 导航
    'nav.home': '首页',
    'nav.about': '关于企业',
    'nav.products': '产品展示',
    'nav.solutions': '解决方案',
    'nav.news': '新闻中心',
    'nav.contact': '联系我们',
    'nav.consultation': '预约一对一咨询',
    'nav.language': '中文',
    
    // 首页
    'home.hero.title': '精密液压解决方案',
    'home.hero.subtitle': '驱动未来工业',
    'home.hero.description': '专注液压泵、液压阀及液压附件制造15年，为全球客户提供可靠、高效的液压解决方案',
    'home.hero.consultation': '立即咨询',
    'home.hero.products': '查看产品',
    
    'home.stats.clients': '全球客户',
    'home.stats.experience': '年行业经验',
    'home.stats.countries': '服务国家',
    'home.stats.satisfaction': '客户满意度',
    
    'home.products.title': '核心产品',
    'home.products.subtitle': '专业的液压产品，满足各种工况需求',
    'home.products.viewAll': '查看全部产品',
    
    'home.news.title': '最新动态',
    'home.news.subtitle': '了解捷瀚液压最新资讯和行业动态',
    'home.news.viewAll': '查看更多新闻',
    
    // 产品相关
    'product.category.pump': '液压泵',
    'product.category.valve': '液压阀',
    'product.category.cylinder': '液压缸',
    'product.category.accessory': '液压附件',
    'product.viewDetails': '查看详情',
    'product.readMore': '阅读更多',
    
    // 新闻相关
    'news.category.company': '公司动态',
    'news.category.industry': '行业新闻',
    'news.category.product': '产品资讯',
    'news.readingTime': '分钟阅读',
    
    // 通用
    'common.learnMore': '了解更多',
    'common.contactUs': '联系我们',
    'common.submit': '提交',
    'common.loading': '加载中...',
    'common.phone': '电话',
    'common.email': '邮箱',
    'common.address': '地址',
    'common.copyright': '2025 捷瀚液压',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.solutions': 'Solutions',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.consultation': 'Book Consultation',
    'nav.language': 'English',
    
    // Home
    'home.hero.title': 'Precision Hydraulic Solutions',
    'home.hero.subtitle': 'Driving Future Industry',
    'home.hero.description': 'Specializing in hydraulic pumps, valves and accessories for 15 years, providing reliable and efficient hydraulic solutions for global customers',
    'home.hero.consultation': 'Get Quote',
    'home.hero.products': 'View Products',
    
    'home.stats.clients': 'Global Clients',
    'home.stats.experience': 'Years Experience',
    'home.stats.countries': 'Countries Served',
    'home.stats.satisfaction': 'Customer Satisfaction',
    
    'home.products.title': 'Core Products',
    'home.products.subtitle': 'Professional hydraulic products for various working conditions',
    'home.products.viewAll': 'View All Products',
    
    'home.news.title': 'Latest News',
    'home.news.subtitle': 'Stay updated with Jiehan Hydraulic news and industry trends',
    'home.news.viewAll': 'View More News',
    
    // Products
    'product.category.pump': 'Hydraulic Pumps',
    'product.category.valve': 'Hydraulic Valves',
    'product.category.cylinder': 'Hydraulic Cylinders',
    'product.category.accessory': 'Hydraulic Accessories',
    'product.viewDetails': 'View Details',
    'product.readMore': 'Read More',
    
    // News
    'news.category.company': 'Company News',
    'news.category.industry': 'Industry News',
    'news.category.product': 'Product News',
    'news.readingTime': 'min read',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.contactUs': 'Contact Us',
    'common.submit': 'Submit',
    'common.loading': 'Loading...',
    'common.phone': 'Phone',
    'common.email': 'Email',
    'common.address': 'Address',
    'common.copyright': '2025 Jiehan Hydraulic',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};