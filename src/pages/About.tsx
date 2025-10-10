import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Award, Users, Globe, Factory, Zap, Shield, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/seo/SEOHead';
import { seoConfig, generateStructuredData } from '@/config/seo';

const About: React.FC = () => {
  const { language, t } = useLanguage();
  
  const seoData = seoConfig.pages.about[language];
  const currentPath = language === 'en' ? '/en/about' : '/about';
  const structuredData = generateStructuredData('AboutPage', {
    '@type': 'AboutPage',
    name: seoData.title,
    description: seoData.description,
    mainEntity: {
      '@type': 'Organization',
      name: 'Jiehan Hydraulic',
      foundingDate: '2008',
      numberOfEmployees: '50-100',
      industry: 'Hydraulic Equipment Manufacturing'
    }
  });

  // 多语言内容
  const content = {
    zh: {
      hero: {
        title: '关于捷瀚液压',
        subtitle: '专注液压技术15年，致力于为全球客户提供最可靠、最高效的液压解决方案'
      },
      company: {
        title: '企业概况',
        description1: '捷瀚液压成立于2008年，是一家专注于液压泵、液压阀及液压附件制造的高新技术企业。公司位于中国广东省佛山市南海区，拥有现代化的生产基地和完善的研发体系。',
        description2: '经过15年的发展，捷瀚液压已成为国内外知名的液压设备制造商，产品广泛应用于工程机械、冶金、化工、建材等多个领域，赢得了客户的广泛认可和信赖。',
        description3: '我们始终坚持"质量第一、客户至上"的经营理念，不断创新技术，提升产品质量，为客户提供更加优质的产品和服务。'
      },
      values: {
        title: '企业价值观',
        items: [
          {
            icon: Target,
            title: '质量第一',
            description: '严格的质量控制体系，确保每一件产品都达到最高标准'
          },
          {
            icon: Users,
            title: '客户至上',
            description: '以客户需求为导向，提供个性化的解决方案和优质服务'
          },
          {
            icon: Zap,
            title: '持续创新',
            description: '不断投入研发，推动液压技术的进步和发展'
          },
          {
            icon: Shield,
            title: '诚信经营',
            description: '坚持诚信为本，建立长期稳定的合作伙伴关系'
          }
        ]
      },
      achievements: {
        title: '发展成就',
        items: [
          {
            icon: Award,
            title: '500+',
            description: '全球客户'
          },
          {
            icon: Factory,
            title: '15',
            description: '年行业经验'
          },
          {
            icon: Globe,
            title: '30+',
            description: '服务国家'
          },
          {
            icon: CheckCircle,
            title: '98%',
            description: '客户满意度'
          }
        ]
      },
      certifications: {
        title: '资质认证',
        items: [
          { name: 'ISO 9001:2015', description: '质量管理体系认证' },
          { name: 'CE认证', description: '欧盟安全认证' },
          { name: 'RoHS认证', description: '环保认证' },
          { name: '专利证书', description: '多项技术专利' }
        ]
      }
    },
    en: {
      hero: {
        title: 'About Jiehan Hydraulic',
        subtitle: '15 years of hydraulic technology expertise, committed to providing the most reliable and efficient hydraulic solutions for global customers'
      },
      company: {
        title: 'Company Profile',
        description1: 'Jiehan Hydraulic was established in 2008, specializing in the manufacture of hydraulic pumps, valves and accessories. It is a high-tech enterprise. The company is located in Nanhai District, Foshan City, Guangdong Province, China, with a modern production base and a complete R&D system.',
        description2: 'After 15 years of development, Jiehan Hydraulic has become a well-known hydraulic equipment manufacturer at home and abroad. Its products are widely used in construction machinery, metallurgy, chemical industry, building materials and many other fields, winning wide recognition and trust from customers.',
        description3: 'We always adhere to the business philosophy of "quality first, customer first", continuously innovate technology, improve product quality, and provide customers with better products and services.'
      },
      values: {
        title: 'Corporate Values',
        items: [
          {
            icon: Target,
            title: 'Quality First',
            description: 'Strict quality control system to ensure every product meets the highest standards'
          },
          {
            icon: Users,
            title: 'Customer First',
            description: 'Customer demand-oriented, providing personalized solutions and quality service'
          },
          {
            icon: Zap,
            title: 'Continuous Innovation',
            description: 'Continuous R&D investment to promote the progress and development of hydraulic technology'
          },
          {
            icon: Shield,
            title: 'Integrity',
            description: 'Adhere to integrity, establish long-term and stable partnership'
          }
        ]
      },
      achievements: {
        title: 'Development Achievements',
        items: [
          {
            icon: Award,
            title: '500+',
            description: 'Global Clients'
          },
          {
            icon: Factory,
            title: '15',
            description: 'Years Experience'
          },
          {
            icon: Globe,
            title: '30+',
            description: 'Countries Served'
          },
          {
            icon: CheckCircle,
            title: '98%',
            description: 'Customer Satisfaction'
          }
        ]
      },
      certifications: {
        title: 'Certifications',
        items: [
          { name: 'ISO 9001:2015', description: 'Quality Management System Certification' },
          { name: 'CE Certification', description: 'EU Safety Certification' },
          { name: 'RoHS Certification', description: 'Environmental Certification' },
          { name: 'Patent Certificates', description: 'Multiple Technical Patents' }
        ]
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen pt-16">
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={currentPath}
        structuredData={structuredData}
        alternateHrefs={[
          { href: `${seoConfig.site.url}/about`, hrefLang: 'zh' },
          { href: `${seoConfig.site.url}/en/about`, hrefLang: 'en' }
        ]}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://miaoda-img.cdn.bcebos.com/img/corpus/78e517e9e0a648bea592f0d52fd85b16.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {currentContent.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
              {currentContent.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 公司简介 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{currentContent.company.title}</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>{currentContent.company.description1}</p>
                <p>{currentContent.company.description2}</p>
                <p>{currentContent.company.description3}</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://miaoda-site-img.cdn.bcebos.com/983d1e53-e45e-4ef8-9402-c9ddd1a17fdc/images/c754ebd4-9df2-11f0-ab42-ead8d933836c_0.jpg"
                alt={language === 'zh' ? '捷瀚液压工厂' : 'Jiehan Hydraulic Factory'}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 企业价值观 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{currentContent.values.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'zh' 
                ? '我们的核心价值观指导着我们的每一个决策和行动' 
                : 'Our core values guide every decision and action we take'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.values.items.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 发展成就 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{currentContent.achievements.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'zh' 
                ? '15年来的发展历程和取得的辉煌成就' 
                : '15 years of development history and brilliant achievements'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.achievements.items.map((achievement, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-gray-900 mb-2">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 font-medium">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 发展时间线 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'zh' ? '发展历程' : 'Development Timeline'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'zh' 
                ? '回顾捷瀚液压15年来的重要发展节点' 
                : 'Review the important development milestones of Jiehan Hydraulic over 15 years'
              }
            </p>
          </div>
          
          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              {/* 2008年 */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">2008</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '公司成立' : 'Company Founded'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'zh' 
                        ? '捷瀚液压正式成立，开始专注于液压设备制造' 
                        : 'Jiehan Hydraulic was officially established, focusing on hydraulic equipment manufacturing'
                      }
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* 2012年 */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">2012</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '技术突破' : 'Technical Breakthrough'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'zh' 
                        ? '成功开发出第一代高效液压泵，获得多项技术专利' 
                        : 'Successfully developed the first generation of high-efficiency hydraulic pumps, obtaining multiple technical patents'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* 2015年 */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">2015</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '质量认证' : 'Quality Certification'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'zh' 
                        ? '通过ISO9001:2015质量管理体系认证，建立完善的质量控制体系' 
                        : 'Passed ISO9001:2015 quality management system certification, established a complete quality control system'
                      }
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* 2018年 */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">2018</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '市场扩张' : 'Market Expansion'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'zh' 
                        ? '产品成功进入国际市场，服务客户遍布30多个国家' 
                        : 'Products successfully entered the international market, serving customers in more than 30 countries'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* 2020年 */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">2020</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '数字化转型' : 'Digital Transformation'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'zh' 
                        ? '启动智能制造项目，引入先进的CAD/CAM技术和自动化生产线' 
                        : 'Launched smart manufacturing project, introduced advanced CAD/CAM technology and automated production lines'
                      }
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* 2023年 */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">2023</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '创新突破' : 'Innovation Breakthrough'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'zh' 
                        ? '推出新一代智能液压系统，在节能环保方面取得重大突破' 
                        : 'Launched a new generation of intelligent hydraulic systems, achieving major breakthroughs in energy saving and environmental protection'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 资质认证 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{currentContent.certifications.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'zh' 
                ? '我们拥有完善的质量管理体系和多项国际认证' 
                : 'We have a complete quality management system and multiple international certifications'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentContent.certifications.items.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-600">{cert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;