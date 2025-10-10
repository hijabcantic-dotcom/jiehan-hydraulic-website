import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
import { emailService } from '@/services/emailService';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/seo/SEOHead';
import { seoConfig, generateStructuredData } from '@/config/seo';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language, t } = useLanguage();
  
  // 表单数据状态
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: ''
  });
  
  // 表单错误状态
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // 表单验证
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // 姓名必填
    if (!formData.name.trim()) {
      newErrors.name = language === 'zh' ? '请输入姓名' : 'Please enter your name';
    }
    
    // 中文模式：电话必填
    if (language === 'zh') {
      if (!formData.phone.trim()) {
        newErrors.phone = '请输入联系电话';
      }
    } else {
      // 英文模式：邮箱必填
      if (!formData.email.trim()) {
        newErrors.email = 'Please enter your email';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 提交表单
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      const inquiryData: InquiryFormData = {
        name: formData.name,
        company: formData.company || undefined,
        phone: formData.phone,
        email: formData.email || undefined,
        message: formData.message || undefined,
        inquiry_type: 'general'
      };
      
      // 1. 先发送邮件通知
      await emailService.sendEmail(inquiryData);
      
      // 2. 发送客户确认邮件（如果有邮箱）
      await emailService.sendConfirmationEmail(inquiryData);
      
      // 3. 提交到数据库
      await inquiryApi.submitInquiry(inquiryData);
      
      toast.success(language === 'zh' ? '您的咨询已提交成功！我们将在24小时内与您联系。' : 'Your inquiry has been submitted successfully! We will contact you within 24 hours.');
      
      // 重置表单
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        message: ''
      });
      setErrors({});
      
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error(language === 'zh' ? '提交失败，请稍后重试或直接拨打我们的联系电话。' : 'Submission failed, please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 更新表单数据
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除该字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: language === 'zh' ? '联系电话' : 'Phone',
      content: '+86 15313015206',
      description: language === 'zh' ? '工作日 9:00-18:00' : 'Weekdays 9:00-18:00'
    },
    {
      icon: Mail,
      title: language === 'zh' ? '邮箱地址' : 'Email',
      content: 'joe384326366@gmail.com',
      description: language === 'zh' ? '24小时内回复' : 'Reply within 24 hours'
    },
    {
      icon: MapPin,
      title: language === 'zh' ? '公司地址' : 'Address',
      content: language === 'zh' 
        ? '中国广东省佛山市南海区狮山镇罗村佛罗路中段1号第J座第壹层101号'
        : 'No. 1, Middle Section of Foluo Road, Luocun, Shishan Town, Nanhai District, Foshan City, Guangdong Province, China',
      description: language === 'zh' ? '欢迎预约参观' : 'Welcome to visit by appointment'
    }
  ];

  const services = [
    {
      icon: Headphones,
      title: language === 'zh' ? '技术支持' : 'Technical Support',
      description: language === 'zh' ? '专业的技术团队为您提供产品咨询和技术指导' : 'Professional technical team provides product consultation and technical guidance'
    },
    {
      icon: Shield,
      title: language === 'zh' ? '售后服务' : 'After-sales Service',
      description: language === 'zh' ? '完善的售后服务体系，确保您的设备稳定运行' : 'Complete after-sales service system to ensure stable operation of your equipment'
    },
    {
      icon: Globe,
      title: language === 'zh' ? '全球服务' : 'Global Service',
      description: language === 'zh' ? '服务网络覆盖全球，为海外客户提供本地化支持' : 'Service network covers the world, providing localized support for overseas customers'
    }
  ];

  const seoData = seoConfig.pages.contact[language];
  const currentPath = language === 'en' ? '/en/contact' : '/contact';
  const structuredData = generateStructuredData('ContactPage', {
    '@type': 'ContactPage',
    name: seoData.title,
    description: seoData.description,
    mainEntity: {
      '@type': 'Organization',
      name: 'Jiehan Hydraulic',
      telephone: '+86-15313015206',
      email: 'joe384326366@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '中国广东省佛山市南海区狮山镇罗村佛罗路中段1号第J座第壹层101号',
        addressCountry: 'CN',
        addressRegion: '广东省',
        addressLocality: '佛山市'
      }
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
          { href: `${seoConfig.site.url}/contact`, hrefLang: 'zh' },
          { href: `${seoConfig.site.url}/en/contact`, hrefLang: 'en' }
        ]}
      />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {language === 'zh' ? '联系我们' : 'Contact Us'}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto">
            {language === 'zh' 
              ? '专业的液压解决方案团队，随时为您提供技术支持和咨询服务' 
              : 'Professional hydraulic solutions team, ready to provide technical support and consultation services'
            }
          </p>
        </div>
      </section>

      {/* 联系信息卡片 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-gray-900 mb-2">{info.content}</p>
                  <p className="text-gray-600">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 联系表单和服务 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 联系表单 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {language === 'zh' ? '发送消息' : 'Send Message'}
              </h2>
              
              <form onSubmit={onSubmit} className="space-y-6">
                {/* 姓名 - 必填 */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    {language === 'zh' ? '姓名' : 'Name'} <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder={language === 'zh' ? '请输入您的姓名' : 'Please enter your name'}
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* 中文模式：公司名称 - 选填 */}
                {language === 'zh' && (
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium">
                      公司名称
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="company"
                        type="text"
                        placeholder="请输入公司名称（选填）"
                        value={formData.company}
                        onChange={(e) => updateFormData('company', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                {/* 中文模式：联系电话 - 必填 */}
                {language === 'zh' && (
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      联系电话 <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="请输入手机号码"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                )}

                {/* 英文模式：邮箱 - 必填 */}
                {language === 'en' && (
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Please enter your email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                )}

                {/* 英文模式：WhatsApp - 选填 */}
                {language === 'en' && (
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      WhatsApp
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Please enter your WhatsApp number"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                {/* 详细需求描述 - 选填 */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    {language === 'zh' ? '详细需求描述' : 'Detailed Requirements'}
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <Textarea
                      id="message"
                      placeholder={language === 'zh' 
                        ? '请详细描述您的需求，包括应用场景、技术要求等' 
                        : 'Please describe your requirements in detail, including application scenarios, technical requirements, etc.'
                      }
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      className="pl-10 min-h-[120px]"
                    />
                  </div>
                </div>

                {/* 提交按钮 */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (language === 'zh' ? '提交中...' : 'Submitting...')
                    : (language === 'zh' ? '发送消息' : 'Send Message')
                  }
                </Button>
              </form>
            </div>

            {/* 服务特色 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {language === 'zh' ? '服务特色' : 'Service Features'}
              </h2>
              
              <div className="space-y-6">
                {services.map((service, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* 工作时间 */}
              <Card className="mt-8 p-6 bg-blue-50">
                <div className="flex items-center space-x-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      {language === 'zh' ? '工作时间' : 'Working Hours'}
                    </h3>
                    <p className="text-blue-800">
                      {language === 'zh' 
                        ? '周一至周五：9:00 - 18:00\n周六：9:00 - 12:00\n周日：休息'
                        : 'Monday to Friday: 9:00 - 18:00\nSaturday: 9:00 - 12:00\nSunday: Closed'
                      }
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;