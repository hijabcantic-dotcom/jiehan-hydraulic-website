import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer: React.FC = () => {
  const { language } = useLanguage();

  // 多语言内容
  const content = {
    zh: {
      company: {
        name: "捷瀚液压",
        nameEn: "JIEHAN HYDRAULIC",
        description: "专注于液压泵、液压阀及液压附件制造，成立于2008年。拥有先进设备、CAD/CAM技术、自动测试手段，通过ISO9001-2015认证，产品广泛应用于工程机械、冶金、化工、建材等领域。"
      },
      contact: {
        title: "联系我们",
        address: "中国广东省佛山市南海区",
        addressDetail: "狮山镇罗村佛罗路中段1号第J座第壹层101号",
        phone: "+86 15313015206",
        email: "joe384326366@gmail.com"
      },
      service: {
        title: "服务时间",
        hours: "周一至周五 8:00 - 18:00",
        support: "技术支持:24小时在线",
        emergency: "紧急服务:随时响应"
      },
      links: {
        about: "关于企业",
        products: "产品展示",
        solutions: "解决方案",
        news: "新闻中心",
        contact: "联系我们"
      },
      copyright: "2025 捷瀚液压"
    },
    en: {
      company: {
        name: "Jiehan Hydraulic",
        nameEn: "JIEHAN HYDRAULIC",
        description: "Specializing in the manufacture of hydraulic pumps, valves and accessories, established in 2008. With advanced equipment, CAD/CAM technology, automatic testing methods, passed ISO9001-2015 certification, products are widely used in engineering machinery, metallurgy, chemical, building materials and other fields."
      },
      contact: {
        title: "Contact Us",
        address: "Nanhai District, Foshan City, Guangdong Province, China",
        addressDetail: "No. 1, Middle Section of Foluo Road, Luocun, Shishan Town, Building J, Floor 1, Room 101",
        phone: "+86 15313015206",
        email: "joe384326366@gmail.com"
      },
      service: {
        title: "Service Hours",
        hours: "Monday to Friday 8:00 - 18:00",
        support: "Technical Support: 24 hours online",
        emergency: "Emergency Service: Respond at any time"
      },
      links: {
        about: "About Us",
        products: "Products",
        solutions: "Solutions",
        news: "News",
        contact: "Contact"
      },
      copyright: "2025 Jiehan Hydraulic"
    }
  };

  const currentContent = content[language];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 公司信息 */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">捷</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{currentContent.company.name}</h3>
                <p className="text-blue-300 text-sm">{currentContent.company.nameEn}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {currentContent.company.description}
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                ISO
              </div>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                CE
              </div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                {language === 'zh' ? '质' : 'Q'}
              </div>
            </div>
          </div>

          {/* 联系信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">{currentContent.contact.title}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">{currentContent.contact.address}</p>
                  <p className="text-gray-300 text-sm">{currentContent.contact.addressDetail}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{currentContent.contact.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{currentContent.contact.email}</p>
              </div>
            </div>
          </div>

          {/* 服务时间 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">{currentContent.service.title}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{currentContent.service.hours}</p>
              </div>
              <div className="text-gray-300 text-sm space-y-1">
                <p>{currentContent.service.support}</p>
                <p>{currentContent.service.emergency}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部链接和版权 */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 mb-4 md:mb-0">
              <Link 
                to={language === 'en' ? '/en/about' : '/about'} 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {currentContent.links.about}
              </Link>
              <Link 
                to={language === 'en' ? '/en/products' : '/products'} 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {currentContent.links.products}
              </Link>
              <Link 
                to={language === 'en' ? '/en/solutions' : '/solutions'} 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {currentContent.links.solutions}
              </Link>
              <Link 
                to={language === 'en' ? '/en/news' : '/news'} 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {currentContent.links.news}
              </Link>
              <Link 
                to={language === 'en' ? '/en/contact' : '/contact'} 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {currentContent.links.contact}
              </Link>
            </div>
            <div className="text-gray-400 text-sm">
              © {currentContent.copyright}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;