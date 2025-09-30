import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Building,
  User,
  Globe,
  Headphones,
  Shield
} from 'lucide-react';
import { inquiryApi } from '@/db/api';
import { InquiryFormData } from '@/types/types';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<InquiryFormData>({
    defaultValues: {
      inquiry_type: 'general'
    }
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    try {
      await inquiryApi.submitInquiry(data);
      toast.success('您的咨询已提交成功！我们将在24小时内与您联系。');
      reset();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('提交失败，请稍后重试或直接拨打我们的联系电话。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: '联系电话',
      content: '400-888-6688',
      description: '工作日 8:00-18:00',
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      title: '邮箱地址',
      content: 'info@jiehan-hydraulic.com',
      description: '24小时内回复',
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      title: '公司地址',
      content: '江苏省苏州市工业园区液压产业园A区8号',
      description: '欢迎实地考察',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: '服务时间',
      content: '周一至周五 8:00-18:00',
      description: '技术支持24小时在线',
      color: 'text-orange-600'
    }
  ];

  const serviceFeatures = [
    {
      icon: Headphones,
      title: '24小时技术支持',
      description: '专业技术团队随时为您解答技术问题'
    },
    {
      icon: Globe,
      title: '全球服务网络',
      description: '覆盖30多个国家和地区的服务网络'
    },
    {
      icon: Shield,
      title: '质量保证',
      description: 'ISO9001认证，严格的质量控制体系'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">联系我们</h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto">
            专业的技术团队随时为您提供优质的服务和支持
          </p>
        </div>
      </section>

      {/* 联系信息 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">联系方式</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              多种联系方式，确保您能够便捷地与我们取得联系
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-8 h-8 ${info.color}`} />
                    </div>
                    <CardTitle className="text-xl">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-gray-900 mb-2">{info.content}</p>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 联系表单和地图 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 联系表单 */}
            <div>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
                    在线咨询
                  </CardTitle>
                  <p className="text-gray-600">
                    请填写您的联系信息和需求，我们将尽快与您联系
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* 姓名 */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>姓名</span>
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="请输入您的姓名"
                        {...register('name', { required: '请输入姓名' })}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    {/* 公司名称 */}
                    <div className="space-y-2">
                      <Label htmlFor="company" className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>公司名称</span>
                      </Label>
                      <Input
                        id="company"
                        placeholder="请输入公司名称（选填）"
                        {...register('company')}
                      />
                    </div>

                    {/* 联系电话 */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>联系电话</span>
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="请输入手机号码"
                        {...register('phone', { 
                          required: '请输入联系电话',
                          pattern: {
                            value: /^1[3-9]\d{9}$/,
                            message: '请输入正确的手机号码'
                          }
                        })}
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* 邮箱 */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>邮箱地址</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="请输入邮箱地址（选填）"
                        {...register('email', {
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: '请输入正确的邮箱地址'
                          }
                        })}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    {/* 感兴趣的产品 */}
                    <div className="space-y-2">
                      <Label htmlFor="product_interest">感兴趣的产品类型</Label>
                      <Select onValueChange={(value) => setValue('product_interest', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择产品类型（选填）" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pump">液压泵</SelectItem>
                          <SelectItem value="valve">液压阀</SelectItem>
                          <SelectItem value="cylinder">液压缸</SelectItem>
                          <SelectItem value="accessory">液压附件</SelectItem>
                          <SelectItem value="solution">整体解决方案</SelectItem>
                          <SelectItem value="other">其他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 详细需求 */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>详细需求描述</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="请详细描述您的需求，包括应用场景、技术要求等"
                        rows={5}
                        {...register('message')}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>提交中...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          提交咨询
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* 地图和公司信息 */}
            <div className="space-y-8">
              {/* 公司位置 */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                    公司位置
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">地址</h4>
                      <p className="text-gray-700">江苏省苏州市工业园区液压产业园A区8号</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">交通指南</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• 距离苏州火车站约30分钟车程</li>
                        <li>• 距离苏州北站约25分钟车程</li>
                        <li>• 距离上海虹桥机场约1.5小时车程</li>
                        <li>• 地铁1号线可直达工业园区</li>
                      </ul>
                    </div>
                    
                    {/* 地图占位 */}
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <MapPin className="w-12 h-12 mx-auto mb-2" />
                        <p>地图位置</p>
                        <p className="text-sm">江苏省苏州市工业园区</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 服务特色 */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">服务特色</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serviceFeatures.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">常见问题</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              以下是客户经常咨询的问题，希望对您有所帮助
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">如何选择合适的液压泵？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  选择液压泵需要考虑流量、压力、转速、介质等因素。我们的技术团队可以根据您的具体应用场景，
                  为您推荐最适合的产品型号。
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">产品质保期是多长？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  我们的产品提供12个月质保期，在正常使用条件下，如出现质量问题，
                  我们将免费维修或更换。同时提供终身技术支持服务。
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">是否提供定制化服务？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  是的，我们可以根据客户的特殊需求提供定制化产品和解决方案。
                  请联系我们的技术团队，详细说明您的需求。
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">交货周期一般是多长？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  标准产品的交货周期一般为7-15个工作日，定制产品根据复杂程度，
                  交货周期为15-30个工作日。具体时间请咨询销售人员。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;