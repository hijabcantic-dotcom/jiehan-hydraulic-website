import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  ArrowRight, 
  CheckCircle, 
  Truck, 
  Factory, 
  Zap, 
  Wrench, 
  Shield, 
  Clock,
  Phone,
  Settings,
  Target,
  Award
} from 'lucide-react';
import ConsultationForm from '@/components/forms/ConsultationForm';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/seo/SEOHead';
import { seoConfig, generateStructuredData } from '@/config/seo';

const Solutions: React.FC = () => {
  const { language } = useLanguage();

  // 多语言内容
  const content = {
    zh: {
      hero: {
        title: '解决方案',
        subtitle: '为不同行业提供专业的液压系统解决方案，满足各种复杂工况需求'
      },
      industry: {
        title: '行业解决方案',
        subtitle: '基于15年的行业经验，为不同领域客户提供量身定制的液压系统解决方案'
      },
      solutions: [
        {
          id: 1,
          title: '工程机械液压系统',
          description: '为挖掘机、装载机、起重机等工程机械提供完整的液压动力解决方案',
          image: 'https://miaoda-site-img.cdn.bcebos.com/bff9fb0c-512c-495e-85cc-12750806669e/images/c6ff1362-9df2-11f0-b42d-8af640abeb71_0.jpg',
          features: ['高压大流量', '精确控制', '节能环保', '可靠耐用'],
          applications: ['挖掘机', '装载机', '起重机', '压路机', '推土机'],
          benefits: [
            '提高作业效率30%以上',
            '降低能耗20%',
            '延长设备使用寿命',
            '减少维护成本'
          ]
        },
        {
          id: 2,
          title: '工业制造液压系统',
          description: '为机床设备、注塑机、压力机等工业设备提供精密液压控制方案',
          image: 'https://miaoda-site-img.cdn.bcebos.com/983d1e53-e45e-4ef8-9402-c9ddd1a17fdc/images/c754ebd4-9df2-11f0-ab42-ead8d933836c_0.jpg',
          features: ['精密控制', '快速响应', '稳定可靠', '智能监控'],
          applications: ['数控机床', '注塑机', '冲压机', '液压机', '成型设备'],
          benefits: [
            '提高加工精度',
            '缩短生产周期',
            '降低废品率',
            '提升产品质量'
          ]
        },
        {
          id: 3,
          title: '农业机械液压系统',
          description: '为拖拉机、收割机、播种机等农业机械提供高效液压驱动方案',
          image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
          features: ['高效节能', '适应性强', '维护简便', '经济实用'],
          applications: ['拖拉机', '收割机', '播种机', '施肥机', '植保机械'],
          benefits: [
            '提高作业效率',
            '降低燃油消耗',
            '适应恶劣环境',
            '减少人工成本'
          ]
        },
        {
          id: 4,
          title: '海洋工程液压系统',
          description: '为海洋平台、船舶设备提供耐腐蚀、高可靠性的液压解决方案',
          image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
          features: ['耐腐蚀', '高可靠性', '防爆设计', '远程监控'],
          applications: ['海洋平台', '船舶设备', '海底设备', '海洋工程', '港口机械'],
          benefits: [
            '适应海洋环境',
            '提高安全性',
            '降低维护频率',
            '延长使用寿命'
          ]
        }
      ],
      features: {
        title: '核心优势',
        items: [
          {
            icon: Target,
            title: '专业定制',
            description: '根据客户具体需求，提供量身定制的液压系统解决方案'
          },
          {
            icon: Shield,
            title: '质量保证',
            description: '严格的质量控制体系，确保每个产品都达到最高标准'
          },
          {
            icon: Clock,
            title: '快速响应',
            description: '专业的技术团队，提供7×24小时的技术支持服务'
          },
          {
            icon: Award,
            title: '经验丰富',
            description: '15年行业经验，服务超过500家客户，获得广泛认可'
          }
        ]
      },
      cta: {
        title: '需要定制解决方案？',
        subtitle: '我们的专业团队将为您提供最适合的液压系统解决方案',
        button: '立即咨询'
      }
    },
    en: {
      hero: {
        title: 'Solutions',
        subtitle: 'Providing professional hydraulic system solutions for different industries, meeting various complex working condition requirements'
      },
      industry: {
        title: 'Industry Solutions',
        subtitle: 'Based on 15 years of industry experience, providing customized hydraulic system solutions for customers in different fields'
      },
      solutions: [
        {
          id: 1,
          title: 'Construction Machinery Hydraulic Systems',
          description: 'Providing complete hydraulic power solutions for construction machinery such as excavators, loaders, and cranes',
          image: 'https://miaoda-site-img.cdn.bcebos.com/bff9fb0c-512c-495e-85cc-12750806669e/images/c6ff1362-9df2-11f0-b42d-8af640abeb71_0.jpg',
          features: ['High Pressure & Large Flow', 'Precise Control', 'Energy Saving & Environmental Protection', 'Reliable & Durable'],
          applications: ['Excavators', 'Loaders', 'Cranes', 'Rollers', 'Bulldozers'],
          benefits: [
            'Improve work efficiency by more than 30%',
            'Reduce energy consumption by 20%',
            'Extend equipment service life',
            'Reduce maintenance costs'
          ]
        },
        {
          id: 2,
          title: 'Industrial Manufacturing Hydraulic Systems',
          description: 'Providing precision hydraulic control solutions for industrial equipment such as machine tools, injection molding machines, and presses',
          image: 'https://miaoda-site-img.cdn.bcebos.com/983d1e53-e45e-4ef8-9402-c9ddd1a17fdc/images/c754ebd4-9df2-11f0-ab42-ead8d933836c_0.jpg',
          features: ['Precision Control', 'Fast Response', 'Stable & Reliable', 'Intelligent Monitoring'],
          applications: ['CNC Machine Tools', 'Injection Molding Machines', 'Punching Machines', 'Hydraulic Presses', 'Forming Equipment'],
          benefits: [
            'Improve processing accuracy',
            'Shorten production cycle',
            'Reduce defect rate',
            'Enhance product quality'
          ]
        },
        {
          id: 3,
          title: 'Agricultural Machinery Hydraulic Systems',
          description: 'Providing efficient hydraulic drive solutions for agricultural machinery such as tractors, harvesters, and seeders',
          image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
          features: ['High Efficiency & Energy Saving', 'Strong Adaptability', 'Easy Maintenance', 'Economical & Practical'],
          applications: ['Tractors', 'Harvesters', 'Seeders', 'Fertilizer Spreaders', 'Plant Protection Machinery'],
          benefits: [
            'Improve work efficiency',
            'Reduce fuel consumption',
            'Adapt to harsh environments',
            'Reduce labor costs'
          ]
        },
        {
          id: 4,
          title: 'Marine Engineering Hydraulic Systems',
          description: 'Providing corrosion-resistant and highly reliable hydraulic solutions for offshore platforms and marine equipment',
          image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
          features: ['Corrosion Resistant', 'High Reliability', 'Explosion Proof Design', 'Remote Monitoring'],
          applications: ['Offshore Platforms', 'Marine Equipment', 'Subsea Equipment', 'Marine Engineering', 'Port Machinery'],
          benefits: [
            'Adapt to marine environment',
            'Improve safety',
            'Reduce maintenance frequency',
            'Extend service life'
          ]
        }
      ],
      features: {
        title: 'Core Advantages',
        items: [
          {
            icon: Target,
            title: 'Professional Customization',
            description: 'Provide customized hydraulic system solutions according to specific customer needs'
          },
          {
            icon: Shield,
            title: 'Quality Assurance',
            description: 'Strict quality control system to ensure every product meets the highest standards'
          },
          {
            icon: Clock,
            title: 'Fast Response',
            description: 'Professional technical team providing 7×24 hours technical support service'
          },
          {
            icon: Award,
            title: 'Rich Experience',
            description: '15 years of industry experience, serving more than 500 customers, widely recognized'
          }
        ]
      },
      cta: {
        title: 'Need Custom Solutions?',
        subtitle: 'Our professional team will provide you with the most suitable hydraulic system solutions',
        button: 'Consult Now'
      }
    }
  };

  const currentContent = content[language];
  const seoData = seoConfig.pages.solutions[language];
  const currentPath = language === 'en' ? '/en/solutions' : '/solutions';
  const structuredData = generateStructuredData('SolutionsPage', {
    '@type': 'SolutionsPage',
    name: seoData.title,
    description: seoData.description,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: currentContent.solutions.map((solution, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: solution.title,
        description: solution.description
      }))
    }
  });

  return (
    <div className="min-h-screen pt-16">
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={currentPath}
        structuredData={structuredData}
        alternateHrefs={[
          { href: `${seoConfig.site.url}/solutions`, hrefLang: 'zh' },
          { href: `${seoConfig.site.url}/en/solutions`, hrefLang: 'en' }
        ]}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://miaoda-site-img.cdn.bcebos.com/bff9fb0c-512c-495e-85cc-12750806669e/images/c6ff1362-9df2-11f0-b42d-8af640abeb71_0.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {currentContent.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto">
            {currentContent.hero.subtitle}
          </p>
        </div>
      </section>

      {/* 行业解决方案 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {currentContent.industry.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentContent.industry.subtitle}
            </p>
          </div>

          <div className="space-y-20">
            {currentContent.solutions.map((solution, index) => (
              <div key={solution.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">{solution.title}</h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">{solution.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        {language === 'zh' ? '核心特性' : 'Core Features'}
                      </h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        {language === 'zh' ? '应用领域' : 'Applications'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {solution.applications.map((app, appIndex) => (
                          <Badge key={appIndex} variant="secondary" className="text-sm">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="rounded-lg shadow-xl w-full h-80 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {currentContent.features.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'zh' 
                ? '我们致力于为客户提供最优质的液压系统解决方案' 
                : 'We are committed to providing customers with the highest quality hydraulic system solutions'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.features.items.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {currentContent.cta.title}
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            {currentContent.cta.subtitle}
          </p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                {currentContent.cta.button}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <ConsultationForm />
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
};

export default Solutions;