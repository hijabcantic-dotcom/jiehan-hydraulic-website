// 客户咨询表单类型
export interface CustomerInquiry {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email?: string;
  product_interest?: string;
  message?: string;
  inquiry_type: 'consultation' | 'general';
  status: 'pending' | 'processing' | 'completed';
  created_at: string;
}

// 新闻文章类型
export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary?: string;
  category: 'company' | 'industry' | 'product';
  image_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// 产品信息类型
export interface Product {
  id: string;
  name: string;
  model: string;
  category: 'pump' | 'valve' | 'cylinder' | 'accessory';
  description?: string;
  specifications?: Record<string, any>;
  image_url?: string;
  datasheet_url?: string;
  applications?: string[];
  featured: boolean;
  created_at: string;
}

// 表单提交类型
export interface InquiryFormData {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  product_interest?: string;
  message?: string;
  inquiry_type: 'consultation' | 'general';
}

// 路由配置类型
export interface RouteConfig {
  name: string;
  path: string;
  element: React.ReactElement;
  visible?: boolean;
  language?: 'zh' | 'en';
}