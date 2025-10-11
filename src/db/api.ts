import { supabase } from './supabase';
import { CustomerInquiry, NewsArticle, Product, InquiryFormData } from '@/types/types';

// 检查是否是CORS或网络错误
const isNetworkError = (error: any) => {
  return error?.message?.includes('CORS') || 
         error?.message?.includes('fetch') || 
         error?.message?.includes('network') ||
         error?.message?.includes('Failed to fetch') ||
         error?.code === 'NETWORK_ERROR';
};

// 错误处理包装器
const handleApiError = (error: any, operation: string) => {
  if (isNetworkError(error)) {
    console.warn(`${operation} 网络错误，可能是CORS问题:`, error.message);
    // 不抛出错误，让调用者处理
    return null;
  } else {
    console.error(`Error in ${operation}:`, error);
    throw error;
  }
};

// 客户咨询相关API
export const inquiryApi = {
  // 提交客户咨询
  async submitInquiry(data: InquiryFormData): Promise<CustomerInquiry | null> {
    const { data: result, error } = await supabase
      .from('customer_inquiries')
      .insert([data])
      .select()
      .order('id', { ascending: true })
      .limit(1);

    if (error) {
      console.error('Error submitting inquiry:', error);
      throw error;
    }

    return Array.isArray(result) && result.length > 0 ? result[0] : null;
  },

  // 获取所有咨询记录
  async getAllInquiries(): Promise<CustomerInquiry[]> {
    const { data, error } = await supabase
      .from('customer_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching inquiries:', error);
      return [];
    }

    return Array.isArray(data) ? data : [];
  }
};

// 新闻文章相关API
export const newsApi = {
  // 获取已发布的新闻文章
  async getPublishedNews(): Promise<NewsArticle[]> {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching news:', error);
      return [];
    }

    return Array.isArray(data) ? data : [];
  },

  // 根据ID获取新闻文章
  async getNewsById(id: string): Promise<NewsArticle | null> {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .order('id', { ascending: true })
      .limit(1);

    if (error) {
      console.error('Error fetching news by id:', error);
      return null;
    }

    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  },

  // 获取最新新闻（限制数量）
  async getLatestNews(limit: number = 3): Promise<NewsArticle[]> {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching latest news:', error);
      return [];
    }

    return Array.isArray(data) ? data : [];
  },

  // 创建新闻
  async createNews(newsData: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>): Promise<NewsArticle> {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .insert([{
          ...newsData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating news:', error);
        throw error;
      }

      return data;
    } catch (error) {
      const result = handleApiError(error, '创建新闻');
      if (result === null) {
        // CORS错误，抛出更友好的错误信息
        throw new Error('数据库连接失败：CORS错误。请联系管理员检查服务器配置。');
      }
      throw error;
    }
  },

  // 更新新闻
  async updateNews(id: string, newsData: Partial<NewsArticle>): Promise<NewsArticle> {
    const { data, error } = await supabase
      .from('news_articles')
      .update({
        ...newsData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating news:', error);
      throw error;
    }

    return data;
  },

  // 删除新闻
  async deleteNews(id: string): Promise<void> {
    const { error } = await supabase
      .from('news_articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  }
};

// 产品相关API
export const productApi = {
  // 获取所有产品
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return Array.isArray(data) ? data : [];
  },

  // 根据分类获取产品
  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }

    return Array.isArray(data) ? data : [];
  },

  // 获取推荐产品
  async getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }

    return Array.isArray(data) ? data : [];
  },

  // 根据ID获取产品
  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .order('id', { ascending: true })
      .limit(1);

    if (error) {
      console.error('Error fetching product by id:', error);
      return null;
    }

    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  },

  // 创建产品
  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        ...productData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }

    return data;
  },

  // 更新产品
  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...productData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    return data;
  },

  // 删除产品
  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};