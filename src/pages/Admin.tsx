import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import EnhancedRichEditor from '@/components/ui/enhanced-rich-editor';
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
  X,
  Image as ImageIcon
} from 'lucide-react';
import { productApi, newsApi, inquiryApi } from '@/db/api';
import { resetMockData } from '@/db/supabase';
import { Product, NewsArticle, CustomerInquiry } from '@/types/types';
import ImageUpload from '@/components/ui/ImageUpload';
import ImageManager from '@/components/admin/ImageManager';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 编辑状态
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 产品表单状态
  const [productForm, setProductForm] = useState({
    name_zh: '',
    name_en: '',
    description_zh: '',
    description_en: '',
    category: '',
    specifications: '',
    features: '',
    applications: '',
    image_url: '',
    image_description: '',
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
    is_featured: false,
    is_published: true
  });

  // 加载数据
  useEffect(() => {
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
    setLoading(true);
    
    try {
      const newProduct: Omit<Product, 'id' | 'created_at' | 'updated_at'> = {
        ...productForm,
        features: productForm.features.split(',').map(f => f.trim()).filter(f => f),
        applications: productForm.applications.split(',').map(a => a.trim()).filter(a => a),
        sort_order: products.length + 1
      };

      // 这里应该调用API创建产品，但由于使用模拟数据，我们直接添加到本地状态
      const createdProduct: Product = {
        ...newProduct,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setProducts(prev => [createdProduct, ...prev]);
      
      // 重置表单
      setProductForm({
        name_zh: '',
        name_en: '',
        description_zh: '',
        description_en: '',
        category: '',
        specifications: '',
        features: '',
        applications: '',
        image_url: '',
        image_description: '',
        is_featured: false
      });

      toast.success('产品创建成功！');
    } catch (error) {
      console.error('创建产品失败:', error);
      toast.error('创建产品失败');
    } finally {
      setLoading(false);
    }
  };

  // 创建新闻
  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newNews: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at' | 'published_at'> = {
        ...newsForm,
        published_at: new Date().toISOString()
      };

      // 这里应该调用API创建新闻，但由于使用模拟数据，我们直接添加到本地状态
      const createdNews: NewsArticle = {
        ...newNews,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setNews(prev => [createdNews, ...prev]);
      
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
        is_featured: false,
        is_published: true
      });

      toast.success('新闻创建成功！');
    } catch (error) {
      console.error('创建新闻失败:', error);
      toast.error('创建新闻失败');
    } finally {
      setLoading(false);
    }
  };

  // 重置数据
  const handleResetData = () => {
    if (window.confirm('确定要重置所有数据吗？这将恢复默认的示例数据，当前数据将被覆盖。')) {
      resetMockData();
      loadData(); // 重新加载数据
      toast.success('数据已重置为默认状态');
    }
  };

  // 编辑产品
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name_zh: product.name_zh,
      name_en: product.name_en,
      description_zh: product.description_zh,
      description_en: product.description_en,
      category: product.category,
      specifications: product.specifications,
      features: product.features.join(', '),
      applications: product.applications.join(', '),
      image_url: product.image_url,
      image_description: (product as any).image_description || '',
      is_featured: product.is_featured
    });
    setIsEditModalOpen(true);
  };

  // 编辑新闻
  const handleEditNews = (article: NewsArticle) => {
    setEditingNews(article);
    setNewsForm({
      title_zh: article.title_zh,
      title_en: article.title_en,
      content_zh: article.content_zh,
      content_en: article.content_en,
      summary_zh: article.summary_zh,
      summary_en: article.summary_en,
      category: article.category,
      image_url: article.image_url,
      image_description: (article as any).image_description || '',
      is_featured: article.is_featured,
      is_published: article.is_published
    });
    setIsEditModalOpen(true);
  };

  // 更新产品
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    setLoading(true);
    try {
      const updatedProduct: Product = {
        ...editingProduct,
        ...productForm,
        features: productForm.features.split(',').map(f => f.trim()).filter(f => f),
        applications: productForm.applications.split(',').map(a => a.trim()).filter(a => a),
        updated_at: new Date().toISOString()
      };

      setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p));
      
      // 重置表单和状态
      setEditingProduct(null);
      setIsEditModalOpen(false);
      setProductForm({
        name_zh: '',
        name_en: '',
        description_zh: '',
        description_en: '',
        category: '',
        specifications: '',
        features: '',
        applications: '',
        image_url: '',
        image_description: '',
        is_featured: false
      });

      toast.success('产品更新成功！');
    } catch (error) {
      console.error('更新产品失败:', error);
      toast.error('更新产品失败');
    } finally {
      setLoading(false);
    }
  };

  // 更新新闻
  const handleUpdateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;
    
    setLoading(true);
    try {
      const updatedNews: NewsArticle = {
        ...editingNews,
        ...newsForm,
        updated_at: new Date().toISOString()
      };

      setNews(prev => prev.map(n => n.id === editingNews.id ? updatedNews : n));
      
      // 重置表单和状态
      setEditingNews(null);
      setIsEditModalOpen(false);
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
        is_featured: false,
        is_published: true
      });

      toast.success('新闻更新成功！');
    } catch (error) {
      console.error('更新新闻失败:', error);
      toast.error('更新新闻失败');
    } finally {
      setLoading(false);
    }
  };

  // 删除产品
  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('确定要删除这个产品吗？')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast.success('产品删除成功！');
    }
  };

  // 删除新闻
  const handleDeleteNews = async (newsId: string) => {
    if (window.confirm('确定要删除这篇新闻吗？')) {
      setNews(prev => prev.filter(n => n.id !== newsId));
      toast.success('新闻删除成功！');
    }
  };

  // 统计数据
  const stats = {
    totalProducts: products.length,
    totalNews: news.length,
    totalInquiries: inquiries.length,
    featuredProducts: products.filter(p => p.is_featured).length
  };

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
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => window.open('/', '_blank')}
                variant="outline"
              >
                查看网站
              </Button>
              <Button 
                onClick={loadData} 
                disabled={loading}
                variant="outline"
              >
                刷新数据
              </Button>
              <Button 
                onClick={handleResetData} 
                disabled={loading}
                variant="destructive"
              >
                重置数据
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="products">产品管理</TabsTrigger>
            <TabsTrigger value="news">新闻管理</TabsTrigger>
            <TabsTrigger value="images">图片管理</TabsTrigger>
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
                    创建新产品
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

                    <ImageUpload
                      value={productForm.image_url}
                      description={productForm.image_description}
                      onChange={(imageUrl, description) => setProductForm(prev => ({ 
                        ...prev, 
                        image_url: imageUrl,
                        image_description: description
                      }))}
                      onRemove={() => setProductForm(prev => ({ 
                        ...prev, 
                        image_url: '',
                        image_description: ''
                      }))}
                      placeholder="点击上传产品图片"
                    />

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

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? '创建中...' : '创建产品'}
                    </Button>
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
                            onClick={() => handleEditProduct(product)}
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
                    创建新闻
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

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="content_zh">新闻内容（中文）</Label>
                        <EnhancedRichEditor
                          content={newsForm.content_zh}
                          onChange={(content) => setNewsForm(prev => ({ ...prev, content_zh: content }))}
                          placeholder="请输入新闻内容..."
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="content_en">新闻内容（英文）</Label>
                        <EnhancedRichEditor
                          content={newsForm.content_en}
                          onChange={(content) => setNewsForm(prev => ({ ...prev, content_en: content }))}
                          placeholder="Please enter news content..."
                          className="mt-2"
                        />
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

                    <ImageUpload
                      value={newsForm.image_url}
                      description={newsForm.image_description}
                      onChange={(imageUrl, description) => setNewsForm(prev => ({ 
                        ...prev, 
                        image_url: imageUrl,
                        image_description: description
                      }))}
                      onRemove={() => setNewsForm(prev => ({ 
                        ...prev, 
                        image_url: '',
                        image_description: ''
                      }))}
                      placeholder="点击上传新闻图片"
                    />

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

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? '创建中...' : '创建新闻'}
                    </Button>
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
                            onClick={() => handleEditNews(article)}
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

          {/* 图片管理 */}
          <TabsContent value="images" className="space-y-6">
            <ImageManager />
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
                            <p><strong>时间：</strong>{new Date(inquiry.created_at).toLocaleString()}</p>
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

      {/* 编辑模态框 */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingProduct ? '编辑产品' : '编辑新闻'}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingProduct(null);
                  setEditingNews(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {editingProduct && (
              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit_name_zh">产品名称（中文）</Label>
                    <Input
                      id="edit_name_zh"
                      value={productForm.name_zh}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name_zh: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit_name_en">产品名称（英文）</Label>
                    <Input
                      id="edit_name_en"
                      value={productForm.name_en}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name_en: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit_description_zh">产品描述（中文）</Label>
                    <Textarea
                      id="edit_description_zh"
                      value={productForm.description_zh}
                      onChange={(e) => setProductForm(prev => ({ ...prev, description_zh: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit_description_en">产品描述（英文）</Label>
                    <Textarea
                      id="edit_description_en"
                      value={productForm.description_en}
                      onChange={(e) => setProductForm(prev => ({ ...prev, description_en: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit_category">产品分类</Label>
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
                  <Label htmlFor="edit_specifications">技术参数</Label>
                  <Textarea
                    id="edit_specifications"
                    value={productForm.specifications}
                    onChange={(e) => setProductForm(prev => ({ ...prev, specifications: e.target.value }))}
                    placeholder="每行一个参数，例如：排量: 0.5 ml/r"
                  />
                </div>

                <div>
                  <Label htmlFor="edit_features">产品特点</Label>
                  <Input
                    id="edit_features"
                    value={productForm.features}
                    onChange={(e) => setProductForm(prev => ({ ...prev, features: e.target.value }))}
                    placeholder="用逗号分隔，例如：结构紧凑,性能稳定,维护简便"
                  />
                </div>

                <div>
                  <Label htmlFor="edit_applications">应用场景</Label>
                  <Input
                    id="edit_applications"
                    value={productForm.applications}
                    onChange={(e) => setProductForm(prev => ({ ...prev, applications: e.target.value }))}
                    placeholder="用逗号分隔，例如：小型机械,测试设备,实验装置"
                  />
                </div>

                <ImageUpload
                  value={productForm.image_url}
                  description={productForm.image_description}
                  onChange={(imageUrl, description) => setProductForm(prev => ({ 
                    ...prev, 
                    image_url: imageUrl,
                    image_description: description
                  }))}
                  onRemove={() => setProductForm(prev => ({ 
                    ...prev, 
                    image_url: '',
                    image_description: ''
                  }))}
                  placeholder="点击上传产品图片"
                />

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit_is_featured"
                    checked={productForm.is_featured}
                    onChange={(e) => setProductForm(prev => ({ ...prev, is_featured: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="edit_is_featured">设为推荐产品</Label>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingProduct(null);
                    }}
                  >
                    取消
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? '更新中...' : '更新产品'}
                  </Button>
                </div>
              </form>
            )}

            {editingNews && (
              <form onSubmit={handleUpdateNews} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit_title_zh">新闻标题（中文）</Label>
                    <Input
                      id="edit_title_zh"
                      value={newsForm.title_zh}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, title_zh: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit_title_en">新闻标题（英文）</Label>
                    <Input
                      id="edit_title_en"
                      value={newsForm.title_en}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, title_en: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit_summary_zh">新闻摘要（中文）</Label>
                    <Textarea
                      id="edit_summary_zh"
                      value={newsForm.summary_zh}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, summary_zh: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit_summary_en">新闻摘要（英文）</Label>
                    <Textarea
                      id="edit_summary_en"
                      value={newsForm.summary_en}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, summary_en: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="edit_content_zh">新闻内容（中文）</Label>
                    <EnhancedRichEditor
                      content={newsForm.content_zh}
                      onChange={(content) => setNewsForm(prev => ({ ...prev, content_zh: content }))}
                      placeholder="请输入新闻内容..."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit_content_en">新闻内容（英文）</Label>
                    <EnhancedRichEditor
                      content={newsForm.content_en}
                      onChange={(content) => setNewsForm(prev => ({ ...prev, content_en: content }))}
                      placeholder="Please enter news content..."
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit_news_category">新闻分类</Label>
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

                <ImageUpload
                  value={newsForm.image_url}
                  description={newsForm.image_description}
                  onChange={(imageUrl, description) => setNewsForm(prev => ({ 
                    ...prev, 
                    image_url: imageUrl,
                    image_description: description
                  }))}
                  onRemove={() => setNewsForm(prev => ({ 
                    ...prev, 
                    image_url: '',
                    image_description: ''
                  }))}
                  placeholder="点击上传新闻图片"
                />

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit_news_is_featured"
                    checked={newsForm.is_featured}
                    onChange={(e) => setNewsForm(prev => ({ ...prev, is_featured: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="edit_news_is_featured">设为推荐新闻</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit_news_is_published"
                    checked={newsForm.is_published}
                    onChange={(e) => setNewsForm(prev => ({ ...prev, is_published: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="edit_news_is_published">发布新闻</Label>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingNews(null);
                    }}
                  >
                    取消
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? '更新中...' : '更新新闻'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
