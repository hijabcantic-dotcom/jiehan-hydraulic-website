// 语言检测工具函数
export type SupportedLanguage = 'zh' | 'en';

// 支持的语言配置
export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, {
  code: string;
  name: string;
  nativeName: string;
  countries: string[];
  browserLanguages: string[];
}> = {
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    countries: ['CN', 'TW', 'HK', 'MO', 'SG'],
    browserLanguages: ['zh', 'zh-CN', 'zh-TW', 'zh-HK', 'zh-SG']
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    countries: ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA'],
    browserLanguages: ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-NZ']
  }
};

// 检测浏览器语言偏好
export const detectBrowserLanguage = (): SupportedLanguage | null => {
  const browserLanguage = navigator.language || navigator.languages?.[0];
  
  if (!browserLanguage) return null;
  
  // 检查每种支持的语言
  for (const [langCode, config] of Object.entries(SUPPORTED_LANGUAGES)) {
    if (config.browserLanguages.some(lang => browserLanguage.startsWith(lang))) {
      return langCode as SupportedLanguage;
    }
  }
  
  return null;
};

// 基于地理位置检测语言
export const detectLanguageByLocation = async (): Promise<SupportedLanguage | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    const countryCode = data.country_code;
    
    // 检查每种支持的语言
    for (const [langCode, config] of Object.entries(SUPPORTED_LANGUAGES)) {
      if (config.countries.includes(countryCode)) {
        return langCode as SupportedLanguage;
      }
    }
    
    // 默认返回英语
    return 'en';
  } catch (error) {
    console.warn('地理位置检测失败:', error);
    return null;
  }
};

// 检测URL路径中的语言
export const detectLanguageFromURL = (): SupportedLanguage | null => {
  const currentPath = window.location.pathname;
  
  // 检查每种支持的语言
  for (const [langCode, config] of Object.entries(SUPPORTED_LANGUAGES)) {
    if (langCode === 'zh') {
      // 中文是默认语言，不包含路径前缀
      if (!currentPath.startsWith('/en')) {
        return 'zh';
      }
    } else {
      // 其他语言有路径前缀
      if (currentPath.startsWith(`/${langCode}`)) {
        return langCode as SupportedLanguage;
      }
    }
  }
  
  return null;
};

// 综合语言检测
export const detectUserLanguage = async (): Promise<SupportedLanguage> => {
  // 1. 检查localStorage中保存的语言
  const savedLanguage = localStorage.getItem('language') as SupportedLanguage;
  if (savedLanguage && SUPPORTED_LANGUAGES[savedLanguage]) {
    return savedLanguage;
  }

  // 2. 检查URL路径
  const urlLanguage = detectLanguageFromURL();
  if (urlLanguage) {
    return urlLanguage;
  }

  // 3. 检查浏览器语言设置
  const browserLanguage = detectBrowserLanguage();
  if (browserLanguage) {
    return browserLanguage;
  }

  // 4. 基于地理位置检测（异步）
  const locationLanguage = await detectLanguageByLocation();
  if (locationLanguage) {
    return locationLanguage;
  }

  // 默认返回中文
  return 'zh';
};

// 生成语言切换URL
export const generateLanguageURL = (targetLanguage: SupportedLanguage, currentPath: string): string => {
  if (targetLanguage === 'zh') {
    // 切换到中文，移除语言前缀
    return currentPath.replace(/^\/en/, '') || '/';
  } else {
    // 切换到其他语言，添加语言前缀
    const basePath = currentPath.replace(/^\/en/, '') || '/';
    return `/${targetLanguage}${basePath === '/' ? '' : basePath}`;
  }
};

// 检查是否需要重定向
export const shouldRedirectToLanguage = (detectedLanguage: SupportedLanguage, currentPath: string): boolean => {
  // 如果是首次访问（没有保存的语言偏好）
  if (!localStorage.getItem('language')) {
    // 如果检测到英语但当前在中文首页，需要重定向
    if (detectedLanguage === 'en' && currentPath === '/') {
      return true;
    }
  }
  
  return false;
};
