import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Award, Users, Globe, Factory, Zap, Shield, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://miaoda-img.cdn.bcebos.com/img/corpus/78e517e9e0a648bea592f0d52fd85b16.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              关于捷瀚液压
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
              专注液压技术15年，致力于为全球客户提供最可靠、最高效的液压解决方案
            </p>
          </div>
        </div>
      </section>

      {/* 公司简介 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">企业概况</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  捷瀚液压成立于2010年，是一家专注于液压泵、液压阀及液压附件制造的高新技术企业。
                  公司位于江苏省苏州市工业园区，拥有现代化的生产基地和完善的研发体系。
                </p>
                <p>
                  经过15年的发展，捷瀚液压已成为国内外知名的液压设备制造商，产品广泛应用于
                  工程机械、冶金、化工、建材等多个领域，赢得了客户的广泛认可和信赖。
                </p>
                <p>
                  我们始终坚持"质量第一、客户至上"的经营理念，不断创新技术，提升产品质量，
                  为客户提供更加优质的产品和服务。
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://miaoda-site-img.cdn.bcebos.com/983d1e53-e45e-4ef8-9402-c9ddd1a17fdc/images/c754ebd4-9df2-11f0-ab42-ead8d933836c_0.jpg"
                alt="捷瀚液压工厂"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">年行业经验</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">核心优势</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              凭借先进的技术、严格的质量控制和完善的服务体系，为客户创造更大价值
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Factory className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">先进设备</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  拥有先进的生产设备和检测仪器，采用CAD/CAM技术，确保产品精度和质量
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">质量认证</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  通过ISO9001-2015质量管理体系认证，建立了完善的质量控制体系
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">技术创新</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  持续投入研发，不断推出新产品和新技术，满足客户多样化需求
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">全球服务</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  产品远销30多个国家和地区，建立了完善的销售和服务网络
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 发展历程 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">发展历程</h2>
            <p className="text-xl text-gray-600">
              从创立到今天，我们始终专注于液压技术的创新与发展
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2010年</h3>
                    <p className="text-gray-600">
                      公司成立，开始专注于液压泵、液压阀的研发和生产
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                <div className="flex-1 text-left pl-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2015年</h3>
                    <p className="text-gray-600">
                      通过ISO9001质量管理体系认证，产品质量达到国际标准
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2018年</h3>
                    <p className="text-gray-600">
                      产品开始大规模出口，业务拓展至全球30多个国家和地区
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                <div className="flex-1 text-left pl-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2022年</h3>
                    <p className="text-gray-600">
                      推出智能液压系统解决方案，引领行业技术发展
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2025年</h3>
                    <p className="text-gray-600">
                      持续创新发展，致力于成为全球领先的液压设备制造商
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                <div className="flex-1 pl-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 资质认证 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">资质认证</h2>
            <p className="text-xl text-gray-600">
              严格的质量标准和完善的认证体系，确保产品质量和服务水平
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-blue-600" />
                </div>
                <CardTitle className="text-xl">ISO9001-2015</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  质量管理体系认证，确保产品质量和服务质量达到国际标准
                </p>
                <Badge variant="secondary">已认证</Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="text-xl">CE认证</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  欧盟安全认证标志，产品符合欧盟安全、健康、环保要求
                </p>
                <Badge variant="secondary">已认证</Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-red-600" />
                </div>
                <CardTitle className="text-xl">高新技术企业</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  国家高新技术企业认定，具备持续创新能力和核心技术优势
                </p>
                <Badge variant="secondary">已认定</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 企业文化 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">企业文化</h2>
            <p className="text-xl text-gray-600">
              以人为本，追求卓越，为客户创造价值，为社会承担责任
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">企业使命</h3>
              <p className="text-gray-600">
                为客户提供可靠、高效的液压解决方案，推动工业发展
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">企业愿景</h3>
              <p className="text-gray-600">
                成为全球领先的液压设备制造商和解决方案提供商
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">核心价值观</h3>
              <p className="text-gray-600">
                诚信、创新、品质、服务，以客户为中心，持续创造价值
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">经营理念</h3>
              <p className="text-gray-600">
                质量第一、客户至上，追求卓越，持续改进
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;