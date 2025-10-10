import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { inquiryApi } from '@/db/api';
import { InquiryFormData } from '@/types/types';
import { emailService } from '@/services/emailService';
import { Phone, Mail, Building, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ConsultationForm: React.FC = () => {
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
        inquiry_type: 'consultation'
      };
      
      // 1. 先发送邮件通知
      await emailService.sendEmail(inquiryData);
      
      // 2. 发送客户确认邮件（如果有邮箱）
      await emailService.sendConfirmationEmail(inquiryData);
      
      // 3. 提交到数据库
      await inquiryApi.submitInquiry(inquiryData);
      
      toast.success(language === 'zh' ? '咨询申请提交成功！我们将在24小时内与您联系。' : 'Inquiry submitted successfully! We will contact you within 24 hours.');
      
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
      toast.error(language === 'zh' ? '提交失败，请稍后重试或直接联系我们。' : 'Submission failed, please try again or contact us directly.');
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

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center">
          {language === 'zh' ? '预约一对一咨询' : 'Book One-on-One Consultation'}
        </DialogTitle>
        <DialogDescription className="text-center text-gray-600">
          {language === 'zh' 
            ? '请填写您的联系信息，我们的专业团队将为您提供定制化的液压解决方案' 
            : 'Please fill in your contact information, our professional team will provide you with customized hydraulic solutions'
          }
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* 姓名 - 必填 */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            {language === 'zh' ? '姓名' : 'Name'} <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
              className="pl-10 min-h-[100px]"
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
            : (language === 'zh' ? '提交咨询' : 'Submit Inquiry')
          }
        </Button>
      </form>

      {/* 联系信息 */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">
          {language === 'zh' ? '热线电话' : 'Hotline'}
        </h4>
        <p className="text-blue-800 text-sm">
          {language === 'zh' 
            ? '如需紧急咨询，请直接拨打：+86 15313015206' 
            : 'For urgent inquiries, please call directly: +86 15313015206'
          }
        </p>
      </div>
    </div>
  );
};

export default ConsultationForm;