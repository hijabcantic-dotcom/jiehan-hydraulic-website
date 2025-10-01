import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { inquiryApi } from '@/db/api';
import { InquiryFormData } from '@/types/types';
import { Phone, Mail, Building, MessageSquare } from 'lucide-react';

const ConsultationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<InquiryFormData>({
    defaultValues: {
      inquiry_type: 'consultation'
    }
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    try {
      // 提交到数据库
      await inquiryApi.submitInquiry(data);
      
      // 发送邮件通知
      try {
        const response = await fetch('/functions/v1/send-inquiry-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          console.warn('邮件发送失败，但数据已保存');
        }
      } catch (emailError) {
        console.warn('邮件发送失败:', emailError);
      }
      
      toast.success('咨询申请提交成功！我们将在24小时内与您联系。');
      reset();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('提交失败，请稍后重试或直接联系我们。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-blue-600" />
          <span>预约一对一咨询</span>
        </DialogTitle>
        <DialogDescription>
          请填写您的联系信息，我们的技术专家将在24小时内与您联系，为您提供专业的液压解决方案。
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 姓名 */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center space-x-1">
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
            placeholder="请描述您的具体需求，包括应用场景、技术要求等（选填）"
            rows={4}
            {...register('message')}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          disabled={isSubmitting}
        >
          {isSubmitting ? '提交中...' : '提交咨询申请'}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-500">
        <p>或直接拨打咨询热线：<span className="font-semibold text-blue-600">400-888-6688</span></p>
      </div>
    </div>
  );
};

export default ConsultationForm;