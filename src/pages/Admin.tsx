import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  BarChart3, 
  Package, 
  Newspaper, 
  Users, 
  Plus, 
  Edit, 
  Trash2,
  Upload,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';
import { productApi, newsApi, inquiryApi } from '@/db/api';
import { Product, NewsArticle, CustomerInquiry } from '@/types/types';
import AdminAuth from '@/components/admin/AdminAuth';
import HTMLRichEditor from '@/components/admin/HTMLRichEditor';
import ImageUpload from '@/components/admin/ImageUpload';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [loading, setLoading] = useState(false);

  // 认证处理
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    toast.success('已退出登录');
  };

  // 产品表单状态
  const [productForm, setProductForm] = useState({
    name_zh: '',
    name_en: '',
    model: '',
    description_zh: '',
    description_en: '',
    category: '',
    specifications: '',
    features: '',
    applications: '',
    image_url: '',
    is_featured: false
  });

  // 新闻表单状态
  const [newsForm, setNewsForm] = useState({
    title_zh: '',
    title_en: '',
    content_zh: '',
    content_en: '',
    summary_zh: '',
    summary_en: '',
    category: '',
    image_url: '',
    image_description: '',
    is_featured: false
  });

  // 编辑状态 - 强制初始化为null
  const [editingNews, setEditingNews] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  // 强制重置编辑状态
  const resetEditingStates = () => {
    console.log('强制重置编辑状态 - 开始');
    console.log('重置前 editingProduct:', editingProduct);
    
    // 检查localStorage是否有相关数据
    console.log('localStorage keys:', Object.keys(localStorage));
    console.log('localStorage内容:', localStorage.getItem('adminAuth'));
    
    setEditingProduct(null);
    setEditingNews(null);
    console.log('强制重置编辑状态 - 完成');
  };

  // 监听编辑状态变化
  useEffect(() => {
    console.log('editingProduct 状态变化:', editingProduct);
  }, [editingProduct]);

  // 加载数据
  useEffect(() => {
    // 首先重置编辑状态
    resetEditingStates();
    // 然后加载数据
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, newsData, inquiriesData] = await Promise.all([
        productApi.getAllProducts(),
        newsApi.getPublishedNews(),
        inquiryApi.getAllInquiries()
      ]);
      
      setProducts(productsData);
      setNews(newsData);
      setInquiries(inquiriesData);
      
      // 数据加载完成后，再次强制重置编辑状态
      console.log('数据加载完成，再次强制重置编辑状态');
      setTimeout(() => {
        console.log('延迟重置编辑状态');
        setEditingProduct(null);
        setEditingNews(null);
      }, 100);
      
    } catch (error) {
      console.error('加载数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 创建产品
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    const validationErrors = validateProductForm();
    if (validationErrors.length > 0) {
      toast.error(`表单验证失败：${validationErrors.join('，')}`);
      return;
    }

    setLoading(true);
    
    try {
      console.log('当前编辑状态:', { editingProduct, isEditing: !!editingProduct });
      
      // 如果编辑状态存在但产品不存在，强制重置为创建模式
      if (editingProduct) {
        const productExists = products.find(p => p.id === editingProduct);
        if (!productExists) {
          console.log('编辑的产品不存在，强制重置为创建模式');
          setEditingProduct(null);
        }
      }

      const newProduct: Omit<Product, 'id' | 'created_at' | 'updated_at'> = {
        ...productForm,
        name_zh: productForm.name_zh.trim(),
        name_en: productForm.name_en.trim(),
        model: productForm.model.trim() || undefined,
        description_zh: productForm.description_zh.trim() || undefined,
        description_en: productForm.description_en.trim() || undefined,
        features: productForm.features.split(',').map(f => f.trim()).filter(f => f),
        applications: productForm.applications.split(',').map(a => a.trim()).filter(a => a),
        sort_order: products.length + 1
      };

      let result;
      if (editingProduct) {
        // 编辑模式
        console.log('编辑模式：更新产品ID:', editingProduct);
        result = await productApi.updateProduct(editingProduct, newProduct);
        setProducts(prev => prev.map(p => p.id === editingProduct ? result : p));
        setEditingProduct(null);
        toast.success('产品更新成功！');
      } else {
        // 创建模式
        console.log('创建模式：创建新产品');
        result = await productApi.createProduct(newProduct);
        setProducts(prev => [result, ...prev]);
        toast.success('产品创建成功！');
      }
      
      // 重置表单
      setProductForm({
        name_zh: '',
        name_en: '',
        model: '',
        description_zh: '',
        description_en: '',
        category: '',
        specifications: '',
        features: '',
        applications: '',
        image_url: '',
        is_featured: false
      });
    } catch (error) {
      console.error('创建产品失败:', error);
      toast.error('创建产品失败');
    } finally {
      setLoading(false);
    }
  };

  // 表单验证函数
  const validateNewsForm = () => {
    const errors: string[] = [];

    if (!newsForm.title_zh.trim()) {
      errors.push('中文标题不能为空');
    }
    if (!newsForm.title_en.trim()) {
      errors.push('英文标题不能为空');
    }
    if (!newsForm.summary_zh.trim()) {
      errors.push('中文摘要不能为空');
    }
    if (!newsForm.summary_en.trim()) {
      errors.push('英文摘要不能为空');
    }
    if (!newsForm.content_zh.trim()) {
      errors.push('中文内容不能为空');
    }
    if (!newsForm.content_en.trim()) {
      errors.push('英文内容不能为空');
    }
    if (!newsForm.category) {
      errors.push('请选择新闻分类');
    }

    return errors;
  };

  // 产品表单验证函数
  const validateProductForm = () => {
    const errors: string[] = [];

    if (!productForm.name_zh.trim()) {
      errors.push('中文产品名称不能为空');
    }
    if (!productForm.name_en.trim()) {
      errors.push('英文产品名称不能为空');
    }
    if (!productForm.category) {
      errors.push('请选择产品分类');
    }

    return errors;
  };

  // 创建新闻
  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    const validationErrors = validateNewsForm();
    if (validationErrors.length > 0) {
      toast.error(`表单验证失败：${validationErrors.join('，')}`);
      return;
    }

    setLoading(true);

    try {
      // 分类映射：中文 -> 英文
      const categoryMap: { [key: string]: string } = {
        '公司新闻': 'company',
        '行业动态': 'industry', 
        '产品发布': 'product',
        '展会活动': 'exhibition'
      };

      // 确保必填字段不为空
      const newsData = {
        ...newsForm,
        title_zh: newsForm.title_zh.trim() || '未设置标题',
        title_en: newsForm.title_en.trim() || 'No Title Set',
        category: categoryMap[newsForm.category] || newsForm.category, // 映射分类
        published_at: new Date().toISOString() // 直接发布
      };

      console.log('发送的新闻数据:', newsData);

      let result;
      if (editingNews) {
        // 编辑模式
        result = await newsApi.updateNews(editingNews, newsData);
        setNews(prev => prev.map(n => n.id === editingNews ? result : n));
        setEditingNews(null);
        toast.success('新闻更新成功！');
      } else {
        // 创建模式
        result = await newsApi.createNews(newsData);
        setNews(prev => [result, ...prev]);
        toast.success('新闻创建并发布成功！');
      }

      // 重置表单
      setNewsForm({
        title_zh: '',
        title_en: '',
        content_zh: '',
        content_en: '',
        summary_zh: '',
        summary_en: '',
        category: '',
        image_url: '',
        image_description: '',
        is_featured: false
      });
    } catch (error) {
      console.error('创建新闻失败:', error);
      toast.error('创建新闻失败');
    } finally {
      setLoading(false);
    }
  };

  // 编辑新闻
  const handleEditNews = (newsId: string) => {
    const article = news.find(n => n.id === newsId);
    if (article) {
      setEditingNews(newsId);
      setNewsForm({
        title_zh: article.title_zh || '',
        title_en: article.title_en || '',
        content_zh: article.content_zh || '',
        content_en: article.content_en || '',
        summary_zh: article.summary_zh || '',
        summary_en: article.summary_en || '',
        category: article.category || '',
        image_url: article.image_url || '',
        image_description: article.image_description || '',
        is_featured: article.is_featured || false
      });
    }
  };

  // 删除新闻
  const handleDeleteNews = async (newsId: string) => {
    if (window.confirm('确定要删除这条新闻吗？')) {
      try {
        console.log('开始删除新闻:', newsId);
        await newsApi.deleteNews(newsId);
        console.log('新闻删除API调用成功');
        
        // 更新本地状态
        setNews(prev => {
          const newNews = prev.filter(n => n.id !== newsId);
          console.log('本地状态更新:', { 删除前: prev.length, 删除后: newNews.length });
          return newNews;
        });
        
        toast.success('新闻删除成功！');
        
        // 重新加载数据以确保同步
        setTimeout(() => {
          loadData();
        }, 1000);
      } catch (error) {
        console.error('删除新闻失败:', error);
        toast.error(`删除新闻失败: ${error.message || '未知错误'}`);
      }
    }
  };

  // 编辑产品
  const handleEditProduct = (productId: string) => {
    console.log('编辑产品按钮被点击，产品ID:', productId);
    console.log('当前产品列表:', products);
    
    const product = products.find(p => p.id === productId);
    console.log('找到的产品:', product);
    
    if (product) {
      console.log('开始设置编辑状态和表单数据');
      setEditingProduct(productId);
      setProductForm({
        name_zh: product.name_zh || '',
        name_en: product.name_en || '',
        model: product.model || '',
        description_zh: product.description_zh || '',
        description_en: product.description_en || '',
        category: product.category || '',
        specifications: product.specifications || {},
        features: product.features || '',
        applications: Array.isArray(product.applications) 
          ? product.applications.join('\n') 
          : product.applications || '',
        image_url: product.image_url || '',
        is_featured: product.is_featured || false
      });
      console.log('编辑状态和表单数据设置完成');
    } else {
      console.error('未找到产品，ID:', productId);
    }
  };

  // 删除产品
  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('确定要删除这个产品吗？')) {
      try {
        console.log('开始删除产品:', productId);
        await productApi.deleteProduct(productId);
        console.log('产品删除API调用成功');
        
        // 更新本地状态
        setProducts(prev => {
          const newProducts = prev.filter(p => p.id !== productId);
          console.log('本地状态更新:', { 删除前: prev.length, 删除后: newProducts.length });
          return newProducts;
        });
        
        toast.success('产品删除成功！');
        
        // 重新加载数据以确保同步
        setTimeout(() => {
          loadData();
        }, 1000);
      } catch (error) {
        console.error('删除产品失败:', error);
        toast.error(`删除产品失败: ${error.message || '未知错误'}`);
      }
    }
  };

  // 统计数据
  const stats = {
    totalProducts: products.length,
    totalNews: news.length,
    totalInquiries: inquiries.length,
    featuredProducts: products.filter(p => p.is_featured).length
  };

  // 如果未认证，显示登录页面
  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">后台管理系统</h1>
              <p className="text-gray-600 mt-1">捷瀚液压 - 内容管理</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => window.open('/', '_blank')}
                variant="outline"
              >
                查看网站
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="products">产品管理</TabsTrigger>
            <TabsTrigger value="news">新闻管理</TabsTrigger>
            <TabsTrigger value="inquiries">咨询管理</TabsTrigger>
          </TabsList>

          {/* 概览 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">总产品数</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">总新闻数</CardTitle>
                  <Newspaper className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalNews}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">总咨询数</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalInquiries}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">推荐产品</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.featuredProducts}</div>
                </CardContent>
              </Card>
            </div>

            {/* 最新咨询 */}
            <Card>
              <CardHeader>
                <CardTitle>最新咨询</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries.slice(0, 5).map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{inquiry.name}</p>
                        <p className="text-sm text-gray-600">{inquiry.company || '未提供公司'}</p>
                        <p className="text-sm text-gray-500">{inquiry.phone}</p>
                      </div>
                      <Badge variant="outline">
                        {inquiry.inquiry_type === 'consultation' ? '咨询预约' : '一般咨询'}
                      </Badge>
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <p className="text-gray-500 text-center py-8">暂无咨询记录</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 产品管理 */}
          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 创建产品表单 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    {editingProduct ? '编辑产品' : '创建新产品'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateProduct} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name_zh">产品名称（中文）</Label>
                        <Input
                          id="name_zh"
                          value={productForm.name_zh}
                          onChange={(e) => setProductForm(prev => ({ ...prev, name_zh: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="name_en">产品名称（英文）</Label>
                        <Input
                          id="name_en"
                          value={productForm.name_en}
                          onChange={(e) => setProductForm(prev => ({ ...prev, name_en: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="model">产品型号</Label>
                      <Input
                        id="model"
                        value={productForm.model}
                        onChange={(e) => setProductForm(prev => ({ ...prev, model: e.target.value }))}
                        placeholder="例如：JHP-001"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="description_zh">产品描述（中文）</Label>
                        <Textarea
                          id="description_zh"
                          value={productForm.description_zh}
                          onChange={(e) => setProductForm(prev => ({ ...prev, description_zh: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description_en">产品描述（英文）</Label>
                        <Textarea
                          id="description_en"
                          value={productForm.description_en}
                          onChange={(e) => setProductForm(prev => ({ ...prev, description_en: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="category">产品分类</Label>
                      <Select value={productForm.category} onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择产品分类" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="液压泵">液压泵</SelectItem>
                          <SelectItem value="液压阀">液压阀</SelectItem>
                          <SelectItem value="液压配件">液压配件</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="specifications">技术参数</Label>
                      <Textarea
                        id="specifications"
                        value={productForm.specifications}
                        onChange={(e) => setProductForm(prev => ({ ...prev, specifications: e.target.value }))}
                        placeholder="每行一个参数，例如：排量: 0.5 ml/r"
                      />
                    </div>

                    <div>
                      <Label htmlFor="features">产品特点</Label>
                      <Input
                        id="features"
                        value={productForm.features}
                        onChange={(e) => setProductForm(prev => ({ ...prev, features: e.target.value }))}
                        placeholder="用逗号分隔，例如：结构紧凑,性能稳定,维护简便"
                      />
                    </div>

                    <div>
                      <Label htmlFor="applications">应用场景</Label>
                      <Input
                        id="applications"
                        value={productForm.applications}
                        onChange={(e) => setProductForm(prev => ({ ...prev, applications: e.target.value }))}
                        placeholder="用逗号分隔，例如：小型机械,测试设备,实验装置"
                      />
                    </div>

                    <div>
                      <Label>产品图片</Label>
                      <ImageUpload
                        onImageUpload={(imageUrl, description) => {
                          setProductForm(prev => ({
                            ...prev,
                            image_url: imageUrl
                          }));
                        }}
                        currentImageUrl={productForm.image_url}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is_featured"
                        checked={productForm.is_featured}
                        onChange={(e) => setProductForm(prev => ({ ...prev, is_featured: e.target.checked }))}
                        className="rounded"
                      />
                      <Label htmlFor="is_featured">设为推荐产品</Label>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1" disabled={loading}>
                        {loading ? (editingProduct ? '更新中...' : '创建中...') : (editingProduct ? '更新产品' : '创建产品')}
                      </Button>
                      {editingProduct && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            console.log('手动取消编辑，重置状态');
                            setEditingProduct(null);
                            setProductForm({
                              name_zh: '',
                              name_en: '',
                              model: '',
                              description_zh: '',
                              description_en: '',
                              category: '',
                              specifications: '',
                              features: '',
                              applications: '',
                              image_url: '',
                              is_featured: false
                            });
                          }}
                        >
                          取消
                        </Button>
                      )}
                      {/* 紧急重置按钮 - 仅在开发环境显示 */}
                      {process.env.NODE_ENV === 'development' && (
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            console.log('紧急重置所有编辑状态');
                            resetEditingStates();
                            setProductForm({
                              name_zh: '',
                              name_en: '',
                              model: '',
                              description_zh: '',
                              description_en: '',
                              category: '',
                              specifications: '',
                              features: '',
                              applications: '',
                              image_url: '',
                              is_featured: false
                            });
                          }}
                        >
                          重置
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* 产品列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>产品列表</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{product.name_zh}</p>
                          <p className="text-sm text-gray-600">{product.name_en}</p>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {product.is_featured && <Badge variant="default">推荐</Badge>}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('编辑按钮被点击！');
                              handleEditProduct(product.id);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {products.length === 0 && (
                      <p className="text-gray-500 text-center py-8">暂无产品</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 新闻管理 */}
          <TabsContent value="news" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 创建新闻表单 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    {editingNews ? '编辑新闻' : '创建新闻'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateNews} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title_zh">新闻标题（中文）</Label>
                        <Input
                          id="title_zh"
                          value={newsForm.title_zh}
                          onChange={(e) => setNewsForm(prev => ({ ...prev, title_zh: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="title_en">新闻标题（英文）</Label>
                        <Input
                          id="title_en"
                          value={newsForm.title_en}
                          onChange={(e) => setNewsForm(prev => ({ ...prev, title_en: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="summary_zh">新闻摘要（中文）</Label>
                        <Textarea
                          id="summary_zh"
                          value={newsForm.summary_zh}
                          onChange={(e) => setNewsForm(prev => ({ ...prev, summary_zh: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="summary_en">新闻摘要（英文）</Label>
                        <Textarea
                          id="summary_en"
                          value={newsForm.summary_en}
                          onChange={(e) => setNewsForm(prev => ({ ...prev, summary_en: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <Label htmlFor="content_zh">新闻内容（中文）</Label>
                        <div className="mt-2">
                          <HTMLRichEditor
                            content={newsForm.content_zh}
                            onChange={(content) => setNewsForm(prev => ({ ...prev, content_zh: content }))}
                            placeholder="请输入新闻的中文内容，支持富文本格式..."
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="content_en">新闻内容（英文）</Label>
                        <div className="mt-2">
                          <HTMLRichEditor
                            content={newsForm.content_en}
                            onChange={(content) => setNewsForm(prev => ({ ...prev, content_en: content }))}
                            placeholder="Enter the English content of the news, supporting rich text format..."
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="news_category">新闻分类</Label>
                      <Select value={newsForm.category} onValueChange={(value) => setNewsForm(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择新闻分类" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="公司新闻">公司新闻</SelectItem>
                          <SelectItem value="行业动态">行业动态</SelectItem>
                          <SelectItem value="技术资讯">技术资讯</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <ImageUpload
                        onImageUpload={(imageUrl, description) => {
                          setNewsForm(prev => ({
                            ...prev,
                            image_url: imageUrl,
                            image_description: description || ''
                          }));
                        }}
                        currentImageUrl={newsForm.image_url}
                        currentDescription={newsForm.image_description}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="news_is_featured"
                        checked={newsForm.is_featured}
                        onChange={(e) => setNewsForm(prev => ({ ...prev, is_featured: e.target.checked }))}
                        className="rounded"
                      />
                      <Label htmlFor="news_is_featured">设为推荐新闻</Label>
                    </div>


                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1" disabled={loading}>
                        {loading ? (editingNews ? '更新中...' : '创建中...') : (editingNews ? '更新新闻' : '创建新闻')}
                      </Button>
                      {editingNews && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setEditingNews(null);
                            setNewsForm({
                              title_zh: '',
                              title_en: '',
                              content_zh: '',
                              content_en: '',
                              summary_zh: '',
                              summary_en: '',
                              category: '',
                              image_url: '',
                              image_description: '',
                              is_featured: false
                            });
                          }}
                        >
                          取消
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* 新闻列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>新闻列表</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {news.map((article) => (
                      <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{article.title_zh}</p>
                          <p className="text-sm text-gray-600">{article.title_en}</p>
                          <p className="text-sm text-gray-500">{article.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {article.is_featured && <Badge variant="default">推荐</Badge>}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditNews(article.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteNews(article.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {news.length === 0 && (
                      <p className="text-gray-500 text-center py-8">暂无新闻</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 咨询管理 */}
          <TabsContent value="inquiries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>客户咨询</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{inquiry.name}</h3>
                            <Badge variant="outline">
                              {inquiry.inquiry_type === 'consultation' ? '咨询预约' : '一般咨询'}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            {inquiry.company && <p><strong>公司：</strong>{inquiry.company}</p>}
                            <p><strong>电话：</strong>{inquiry.phone}</p>
                            {inquiry.email && <p><strong>邮箱：</strong>{inquiry.email}</p>}
                            <p><strong>时间：</strong>{new Date(inquiry.created_at).toLocaleString('zh-CN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</p>
                          </div>
                          {inquiry.message && (
                            <div className="mt-2">
                              <p className="text-sm"><strong>需求描述：</strong></p>
                              <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded mt-1">
                                {inquiry.message}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <p className="text-gray-500 text-center py-8">暂无咨询记录</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
