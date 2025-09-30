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

const Solutions: React.FC = () => {
  const solutions = [
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
      title: '冶金化工液压系统',
      description: '为钢铁冶炼、化工生产等重工业提供高可靠性液压解决方案',
      image: 'https://miaoda-site-img.cdn.bcebos.com/11b2194f-1864-46d8-bc05-5f1f7a1a353c/images/ca3308cc-9df2-11f0-a567-1ea3ef713798_0.jpg',
      features: ['耐高温', '抗腐蚀', '重载能力', '连续运行'],
      applications: ['轧钢设备', '炼钢炉', '化工反应器', '输送设备', '分离设备'],
      benefits: [
        '适应恶劣环境',
        '保证连续生产',
        '降低故障率',
        '提高安全性'
      ]
    },
    {
      id: 4,
      title: '建材设备液压系统',
      description: '为水泥、玻璃、陶瓷等建材生产设备提供专业液压动力方案',
      image: 'https://miaoda-site-img.cdn.bcebos.com/66486ea9-eadc-4dc4-83f6-8c1fa36e0357/images/ca4e77d8-9df2-11f0-b42d-8af640abeb71_0.jpg',
      features: ['防尘设计', '低噪音', '高效率', '易维护'],
      applications: ['水泥生产线', '玻璃成型', '陶瓷压制', '砖瓦生产', '石材加工'],
      benefits: [
        '提高生产效率',
        '改善工作环境',
        '降低运营成本',
        '确保产品质量'
      ]
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: '需求分析',
      description: '深入了解客户应用场景和技术要求',
      icon: Target
    },
    {
      step: 2,
      title: '方案设计',
      description: '制定最优的液压系统解决方案',
      icon: Settings
    },
    {
      step: 3,
      title: '产品制造',
      description: '采用先进工艺生产高质量产品',
      icon: Factory
    },
    {
      step: 4,
      title: '安装调试',
      description: '专业团队现场安装和系统调试',
      icon: Wrench
    },
    {
      step: 5,
      title: '售后服务',
      description: '提供全方位的技术支持和维护服务',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://miaoda-img.cdn.bcebos.com/img/corpus/78e517e9e0a648bea592f0d52fd85b16.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            解决方案
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
            为不同行业提供专业的液压系统解决方案，满足各种复杂工况需求
          </p>
        </div>
      </section>

      {/* 解决方案概览 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">行业解决方案</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于15年的行业经验，为不同领域客户提供量身定制的液压系统解决方案
            </p>
          </div>

          <div className="space-y-16">
            {solutions.map((solution, index) => (
              <div key={solution.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* 图片 */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-lg shadow-xl">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>

                {/* 内容 */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  {/* 核心特性 */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">核心特性</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 应用设备 */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">应用设备</h4>
                    <div className="flex flex-wrap gap-2">
                      {solution.applications.map((app, idx) => (
                        <Badge key={idx} variant="outline" className="text-sm">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 客户收益 */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">客户收益</h4>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                        <Phone className="w-5 h-5 mr-2" />
                        咨询此方案
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <ConsultationForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服务流程 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">服务流程</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              从需求分析到售后服务，我们提供全流程的专业服务
            </p>
          </div>

          <div className="relative">
            {/* 连接线 */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.step} className="text-center relative">
                    {/* 步骤圆圈 */}
                    <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* 步骤编号 */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold z-20">
                      {step.step}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 服务优势 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">服务优势</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专业的技术团队和完善的服务体系，确保为客户提供最优质的服务
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">专业团队</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  拥有15年行业经验的专业技术团队，提供权威的技术支持
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">快速响应</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  24小时技术支持热线，快速响应客户需求和技术问题
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">定制化服务</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  根据客户具体需求，提供个性化的液压系统解决方案
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">质量保证</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  严格的质量控制体系，确保每个项目的质量和可靠性
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 成功案例统计 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">成功案例</h2>
            <p className="text-xl text-blue-100">
              数字见证我们的专业实力和服务质量
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-200">成功项目</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">30+</div>
              <div className="text-blue-200">服务国家</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-blue-200">客户满意度</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">15</div>
              <div className="text-blue-200">年行业经验</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            需要专业的液压解决方案？
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            我们的技术专家将根据您的具体需求，为您量身定制最适合的液压系统解决方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <Phone className="w-5 h-5 mr-2" />
                  立即咨询
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <ConsultationForm />
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">
                联系我们 <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;