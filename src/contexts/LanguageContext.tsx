import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: Language;
}

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
    'product.all': '全部产品',
    'product.search': '搜索产品...',
    'product.filter': '筛选',
    'product.featured': '推荐',
    
    // 新闻相关
    'news.category.company': '公司动态',
    'news.category.industry': '行业新闻',
    'news.category.product': '产品资讯',
    'news.readingTime': '分钟阅读',
    'news.all': '全部新闻',
    'news.search': '搜索新闻标题、内容...',
    
    // 表单相关
    'form.title': '预约一对一咨询',
    'form.subtitle': '请填写您的联系信息，我们的专业团队将为您提供定制化的液压解决方案',
    'form.name': '姓名',
    'form.namePlaceholder': '请输入您的姓名',
    'form.nameRequired': '请输入姓名',
    'form.company': '公司名称',
    'form.companyPlaceholder': '请输入公司名称（选填）',
    'form.phone': '联系电话',
    'form.phonePlaceholder': '请输入手机号码',
    'form.phoneRequired': '请输入联系电话',
    'form.phoneInvalid': '请输入正确的手机号码',
    'form.email': '邮箱地址',
    'form.emailPlaceholder': '请输入邮箱地址（选填）',
    'form.emailInvalid': '请输入正确的邮箱地址',
    'form.productInterest': '感兴趣的产品类型',
    'form.productPlaceholder': '请选择产品类型（选填）',
    'form.solution': '整体解决方案',
    'form.other': '其他',
    'form.message': '详细需求描述',
    'form.messagePlaceholder': '请详细描述您的需求，包括应用场景、技术要求等',
    'form.submit': '提交咨询',
    'form.submitting': '提交中...',
    'form.success': '您的咨询已提交成功！我们将在24小时内与您联系。',
    'form.error': '提交失败，请稍后重试或直接拨打我们的联系电话。',
    
    // 通用
    'common.learnMore': '了解更多',
    'common.contactUs': '联系我们',
    'common.submit': '提交',
    'common.loading': '加载中...',
    'common.phone': '电话',
    'common.email': '邮箱',
    'common.address': '地址',
    'common.copyright': '2025 捷瀚液压',
    'common.backToTop': '返回顶部',
    'common.share': '分享',
    'common.download': '下载',
    'common.viewAll': '查看全部',
    'common.readMore': '阅读更多',
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
    'product.all': 'All Products',
    'product.search': 'Search products...',
    'product.filter': 'Filter',
    'product.featured': 'Featured',
    
    // News
    'news.category.company': 'Company News',
    'news.category.industry': 'Industry News',
    'news.category.product': 'Product News',
    'news.readingTime': 'min read',
    'news.all': 'All News',
    'news.search': 'Search news title, content...',
    
    // Form
    'form.title': 'Book One-on-One Consultation',
    'form.subtitle': 'Please fill in your contact information, our professional team will provide you with customized hydraulic solutions',
    'form.name': 'Name',
    'form.namePlaceholder': 'Please enter your name',
    'form.nameRequired': 'Please enter your name',
    'form.company': 'Company',
    'form.companyPlaceholder': 'Please enter company name (optional)',
    'form.phone': 'Phone',
    'form.phonePlaceholder': 'Please enter your phone number',
    'form.phoneRequired': 'Please enter your phone number',
    'form.phoneInvalid': 'Please enter a valid phone number',
    'form.email': 'Email',
    'form.emailPlaceholder': 'Please enter email address (optional)',
    'form.emailInvalid': 'Please enter a valid email address',
    'form.productInterest': 'Product Interest',
    'form.productPlaceholder': 'Please select product type (optional)',
    'form.solution': 'Complete Solution',
    'form.other': 'Other',
    'form.message': 'Detailed Requirements',
    'form.messagePlaceholder': 'Please describe your requirements in detail, including application scenarios, technical requirements, etc.',
    'form.submit': 'Submit Inquiry',
    'form.submitting': 'Submitting...',
    'form.success': 'Your inquiry has been submitted successfully! We will contact you within 24 hours.',
    'form.error': 'Submission failed, please try again later or call us directly.',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.contactUs': 'Contact Us',
    'common.submit': 'Submit',
    'common.loading': 'Loading...',
    'common.phone': 'Phone',
    'common.email': 'Email',
    'common.address': 'Address',
    'common.copyright': '2025 Jiehan Hydraulic',
    'common.backToTop': 'Back to Top',
    'common.share': 'Share',
    'common.download': 'Download',
    'common.viewAll': 'View All',
    'common.readMore': 'Read More',
  }
};


export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  initialLanguage = 'zh' 
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);

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
    // 直接访问翻译对象
    const currentTranslations = translations[language];
    if (currentTranslations && key in currentTranslations) {
      return currentTranslations[key as keyof typeof currentTranslations];
    }
    
    // 如果当前语言没有找到，尝试中文
    const zhTranslations = translations.zh;
    if (zhTranslations && key in zhTranslations) {
      return zhTranslations[key as keyof typeof zhTranslations];
    }
    
    // 如果都没有找到，返回原始key
    return key;
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