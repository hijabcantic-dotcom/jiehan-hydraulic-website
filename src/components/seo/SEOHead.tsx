import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
  noindex?: boolean;
  alternateHrefs?: { href: string; hrefLang: string }[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/images/logo/logo-icon.svg',
  ogType = 'website',
  structuredData,
  noindex = false,
  alternateHrefs = []
}) => {
  const { language } = useLanguage();
  const siteUrl = 'https://www.jiehanhydraulic.com'; // 替换为实际域名
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // 默认的alternate hrefs - 根据当前路径生成对应的多语言版本
  const getDefaultAlternateHrefs = () => {
    const currentPath = window.location.pathname;
    const isEnglish = currentPath.startsWith('/en');
    const basePath = isEnglish ? currentPath.replace('/en', '') : currentPath;
    
    return [
      { href: `${siteUrl}${basePath}`, hrefLang: 'zh-CN' },
      { href: `${siteUrl}/en${basePath}`, hrefLang: 'en-US' }
    ];
  };

  const allAlternateHrefs = alternateHrefs.length > 0 ? alternateHrefs : getDefaultAlternateHrefs();

  return (
    <Helmet>
      {/* 基础SEO标签 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="language" content={language} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* 规范链接 */}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* 多语言hreflang */}
      {allAlternateHrefs.map((alt, index) => (
        <link key={index} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />
      
      {/* 额外的hreflang标签 */}
      <link rel="alternate" hrefLang="zh" href={`${siteUrl}/`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
      
      {/* Open Graph标签 */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical || `${siteUrl}${window.location.pathname}`} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="捷瀚液压" />
      <meta property="og:locale" content={language === 'zh' ? 'zh_CN' : 'en_US'} />
      
      {/* Twitter Card标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* 结构化数据 */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
