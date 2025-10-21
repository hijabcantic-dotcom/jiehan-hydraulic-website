// SEO配置文件
export const seoConfig = {
  site: {
    name: '捷瀚液压',
    nameEn: 'Jiehan Hydraulic',
    url: 'https://www.jiehanhydraulic.com',
    description: '专注液压泵、液压阀及液压附件制造15年，为全球客户提供可靠、高效的液压解决方案',
    descriptionEn: 'Specialized in hydraulic pumps, valves and accessories manufacturing for 15 years, providing reliable and efficient hydraulic solutions for global customers',
    keywords: '液压泵,液压阀,液压缸,液压附件,液压系统,工程机械,捷瀚液压',
    keywordsEn: 'hydraulic pump,hydraulic valve,hydraulic cylinder,hydraulic accessories,hydraulic system,construction machinery,Jiehan Hydraulic'
  },
  
  pages: {
    home: {
      zh: {
        title: '捷瀚液压 - 专业液压泵、液压阀与液压系统制造商',
        description: '捷瀚液压(Foshan Jiehan) 专注液压泵、液压阀与液压系统研发制造, ISO9001认证,支持OEM定制与出口服务。',
        keywords: '液压泵、液压阀、液压系统、液压解决方案'
      },
      en: {
        title: 'Jiehan Hydraulic - Professional Hydraulic Pump & Valve Manufacturer',
        description: 'Jiehan Hydraulic specializes in manufacturing hydraulic pumps, valves and system solutions. ISO9001 certified. OEM and export supported.',
        keywords: 'hydraulic pump, hydraulic valve, hydraulic system'
      }
    },
    
    about: {
      zh: {
        title: '捷瀚液压 - 专业液压泵、液压阀与液压系统制造商',
        description: '捷瀚液压(Foshan Jiehan) 专注液压泵、液压阀与液压系统研发制造, ISO9001认证,支持OEM定制与出口服务。',
        keywords: '液压泵、液压阀、液压系统、液压解决方案'
      },
      en: {
        title: 'About Jiehan Hydraulic - Company Profile & Capabilities',
        description: 'Established in 2008, Jiehan Hydraulic manufactures high-performance hydraulic components and systems for global clients.',
        keywords: 'hydraulic company, hydraulic manufacturer, Jiehan Hydraulic'
      }
    },
    
    products: {
      zh: {
        title: '液压产品中心-齿轮泵、液压阀、液压附件',
        description: '浏览捷瀚液压全系列产品,包括齿轮泵、液压阀、控制模块与附件。支持OEM、定制设计与快速交付。',
        keywords: '液压产品、齿轮泵、液压阀、液压附件'
      },
      en: {
        title: 'Hydraulic Products - Gear Pumps, Valves & Components',
        description: 'Explore Jiehan Hydraulic\'s full product range: gear pumps, valves, and accessories. OEM and custom design supported.',
        keywords: 'hydraulic products, gear pump, hydraulic valve'
      }
    },
    
    productDetail: {
      zh: {
        title: '{productName} - 捷瀚液压专业产品',
        description: '{productName} - 捷瀚液压专业制造，{productDescription}。技术参数详细，应用场景广泛，安装维护简便。',
        keywords: '{productName},液压产品,技术参数,应用场景,安装说明'
      },
      en: {
        title: '{productName} - Jiehan Hydraulic Professional Product',
        description: '{productName} - Professionally manufactured by Jiehan Hydraulic, {productDescription}. Detailed technical specifications, wide application scenarios, easy installation and maintenance.',
        keywords: '{productName},hydraulic product,technical specifications,application scenarios,installation guide'
      }
    },
    
    solutions: {
      zh: {
        title: '液压系统解决方案-工程机械与工业应用',
        description: '捷瀚液压提供专业液压系统方案,涵盖工程机械、农业、冶金及工业自动化应用。查看典型案例与配置建议。',
        keywords: '液压系统、液压解决方案、液压应用'
      },
      en: {
        title: 'Hydraulic System Solutions - For Construction & Industrial Applications',
        description: 'Professional hydraulic system solutions for engineering machinery, agriculture, metallurgy and industrial automation.',
        keywords: 'hydraulic solutions, hydraulic system, industrial hydraulics'
      }
    },
    
    news: {
      zh: {
        title: '行业新闻与技术资讯-捷瀚液压动态',
        description: '获取液压行业最新新闻、产品更新与技术指南。关注捷瀚液压,了解液压系统趋势与维护技巧。',
        keywords: '液压新闻、液压知识、液压技术'
      },
      en: {
        title: 'News & Insights - Jiehan Hydraulic Updates',
        description: 'Latest hydraulic industry news, technical articles and company updates from Jiehan Hydraulic.',
        keywords: 'hydraulic news, hydraulic technology, industry updates'
      }
    },
    
    newsDetail: {
      zh: {
        title: '{newsTitle} - 捷瀚液压新闻中心',
        description: '{newsTitle} - 捷瀚液压新闻中心为您带来最新的行业资讯和公司动态。{newsSummary}',
        keywords: '{newsTitle},液压新闻,行业资讯,公司动态'
      },
      en: {
        title: '{newsTitle} - Jiehan Hydraulic News Center',
        description: '{newsTitle} - Jiehan Hydraulic News Center brings you the latest industry news and company updates. {newsSummary}',
        keywords: '{newsTitle},hydraulic news,industry news,company updates'
      }
    },
    
    contact: {
      zh: {
        title: '联系捷瀚液压-销售与技术支持',
        description: '联系捷瀚液压团队,获取报价、技术资料与售后支持。电话、邮箱、地址一览。',
        keywords: '捷瀚液压 联系方式、液压厂家联系'
      },
      en: {
        title: 'Contact Jiehan Hydraulic - Sales & Technical Support',
        description: 'Contact Jiehan Hydraulic for product inquiries, technical support and cooperation opportunities.',
        keywords: 'contact Jiehan Hydraulic, hydraulic supplier contact'
      }
    }
  }
};

// 生成结构化数据
export const generateStructuredData = (type: string, data: any) => {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: seoConfig.site.name,
    url: seoConfig.site.url,
    logo: `${seoConfig.site.url}/images/logo/logo-icon.svg`,
    description: seoConfig.site.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '中国广东省佛山市南海区狮山镇罗村佛罗路中段1号第J座第壹层101号',
      addressCountry: 'CN',
      addressRegion: '广东省',
      addressLocality: '佛山市'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-15313015206',
      contactType: 'customer service',
      email: 'joe384326366@gmail.com'
    }
  };

  return { ...baseStructuredData, ...data };
};

// 生成面包屑结构化数据
export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${seoConfig.site.url}${item.url}`
    }))
  };
};

// 生成产品结构化数据
export const generateProductStructuredData = (product: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Jiehan Hydraulic'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Jiehan Hydraulic',
      url: seoConfig.site.url
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'CNY',
      seller: {
        '@type': 'Organization',
        name: 'Jiehan Hydraulic'
      }
    }
  };
};

// 生成FAQ结构化数据
export const generateFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};
