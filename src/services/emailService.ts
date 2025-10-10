// EmailJS 邮件发送服务
export interface EmailData {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  message?: string;
  inquiry_type: 'consultation' | 'general';
}

class EmailService {
  private userId = 'gsMwOtnc9ibXKlAh1';
  private serviceId = 'service_qeix8ow';
  private templateId = 'template_hqse8mm';
  private isInitialized = false;

  // 初始化EmailJS
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // 动态加载EmailJS SDK
      if (typeof window !== 'undefined' && !window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.async = true;
        document.head.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      // 初始化EmailJS
      if (window.emailjs) {
        await window.emailjs.init(this.userId);
        this.isInitialized = true;
        console.log('EmailJS 初始化成功');
      } else {
        throw new Error('EmailJS SDK 加载失败');
      }
    } catch (error) {
      console.error('EmailJS 初始化失败:', error);
      throw error;
    }
  }

  // 发送邮件
  async sendEmail(data: EmailData): Promise<void> {
    try {
      await this.initialize();

      const templateParams = {
        to_email: 'joe384326366@gmail.com',
        from_name: data.name,
        from_company: data.company || '未提供',
        from_phone: data.phone,
        from_email: data.email || '未提供',
        message: data.message || '无详细描述',
        inquiry_type: data.inquiry_type === 'consultation' ? '咨询预约' : '一般咨询',
        reply_to: data.email || data.phone
      };

      console.log('发送邮件参数:', templateParams);

      const result = await window.emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log('邮件发送成功:', result);
    } catch (error) {
      console.error('邮件发送失败:', error);
      throw error;
    }
  }

  // 发送客户确认邮件（如果有邮箱）
  async sendConfirmationEmail(data: EmailData): Promise<void> {
    if (!data.email) return; // 没有邮箱就不发送确认邮件

    try {
      await this.initialize();

      const templateParams = {
        to_email: data.email,
        from_name: '捷瀚液压 JIEHAN HYDRAULIC',
        customer_name: data.name,
        inquiry_type: data.inquiry_type === 'consultation' ? '咨询预约' : '一般咨询',
        reply_to: 'joe384326366@gmail.com'
      };

      // 使用不同的模板ID发送确认邮件（如果有的话）
      // 这里暂时使用同一个模板，但可以后续创建专门的确认邮件模板
      await window.emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log('确认邮件发送成功');
    } catch (error) {
      console.error('确认邮件发送失败:', error);
      // 确认邮件失败不影响主流程
    }
  }
}

// 声明全局类型
declare global {
  interface Window {
    emailjs: any;
  }
}

export const emailService = new EmailService();
