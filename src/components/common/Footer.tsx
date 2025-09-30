import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer: React.FC = () => {
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
                <h3 className="text-xl font-bold">捷瀚液压</h3>
                <p className="text-blue-300 text-sm">JIEHAN HYDRAULIC</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              专注于液压泵、液压阀及液压附件制造，成立于2010年。拥有先进设备、CAD/CAM技术、自动测试手段，
              通过ISO9001-2015认证，产品广泛应用于工程机械、冶金、化工、建材等领域。
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                ISO
              </div>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                CE
              </div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                质
              </div>
            </div>
          </div>

          {/* 联系信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">联系我们</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">江苏省苏州市工业园区</p>
                  <p className="text-gray-300 text-sm">液压产业园A区8号</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">400-888-6688</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">info@jiehan-hydraulic.com</p>
              </div>
            </div>
          </div>

          {/* 服务时间 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">服务时间</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">周一至周五</p>
                  <p className="text-gray-300 text-sm">8:00 - 18:00</p>
                </div>
              </div>
              <div className="text-gray-400 text-sm">
                <p>技术支持：24小时在线</p>
                <p>紧急服务：随时响应</p>
              </div>
            </div>
          </div>
        </div>

        {/* 快速链接 */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-wrap justify-center space-x-6 mb-6">
            <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
              关于企业
            </Link>
            <Link to="/products" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
              产品展示
            </Link>
            <Link to="/solutions" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
              解决方案
            </Link>
            <Link to="/news" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
              新闻中心
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
              联系我们
            </Link>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="text-center text-gray-400 text-sm">
          <p>2025 捷瀚液压</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;