import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, Calendar, Clock, Eye } from 'lucide-react';
import { newsApi } from '@/db/api';
import { NewsArticle } from '@/types/types';

const News: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: '全部新闻', count: 0 },
    { value: 'company', label: '公司动态', count: 0 },
    { value: 'industry', label: '行业新闻', count: 0 },
    { value: 'product', label: '产品资讯', count: 0 }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsApi.getPublishedNews();
        setNews(data);
        setFilteredNews(data);
        
        // 更新分类计数
        categories[0].count = data.length;
        categories[1].count = data.filter(n => n.category === 'company').length;
        categories[2].count = data.filter(n => n.category === 'industry').length;
        categories[3].count = data.filter(n => n.category === 'product').length;
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    let filtered = news;

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // 按搜索词筛选
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  }, [news, selectedCategory, searchTerm]);

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      company: '公司动态',
      industry: '行业新闻',
      product: '产品资讯'
    };
    return categoryMap[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      company: 'bg-blue-100 text-blue-800',
      industry: 'bg-green-100 text-green-800',
      product: 'bg-purple-100 text-purple-800'
    };
    return colorMap[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载新闻信息中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">新闻中心</h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto">
            了解捷瀚液压最新动态和行业资讯
          </p>
        </div>
      </section>

      {/* 搜索栏 */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="搜索新闻标题、内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 新闻列表 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value} className="text-sm">
                  {category.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory}>
              {filteredNews.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无新闻</h3>
                  <p className="text-gray-600">
                    {searchTerm ? '没有找到匹配的新闻，请尝试其他关键词' : '该分类下暂无新闻'}
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* 头条新闻 */}
                  {filteredNews.length > 0 && (
                    <div className="mb-12">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">头条新闻</h2>
                      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                          <div className="aspect-video lg:aspect-square overflow-hidden">
                            <img
                              src={filteredNews[0].image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop'}
                              alt={filteredNews[0].title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-8 flex flex-col justify-center">
                            <div className="flex items-center space-x-4 mb-4">
                              <Badge className={getCategoryColor(filteredNews[0].category)}>
                                {getCategoryLabel(filteredNews[0].category)}
                              </Badge>
                              <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(filteredNews[0].created_at)}
                              </div>
                              <div className="flex items-center text-gray-500 text-sm">
                                <Clock className="w-4 h-4 mr-1" />
                                {getReadingTime(filteredNews[0].content)} 分钟阅读
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2">
                              {filteredNews[0].title}
                            </h3>
                            <p className="text-gray-600 mb-6 line-clamp-3">
                              {filteredNews[0].summary || filteredNews[0].content.substring(0, 200) + '...'}
                            </p>
                            <Button asChild>
                              <Link to={`/news/${filteredNews[0].id}`}>
                                阅读全文 <ArrowRight className="ml-2 w-4 h-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}

                  {/* 新闻列表 */}
                  {filteredNews.length > 1 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">最新资讯</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredNews.slice(1).map((article) => (
                          <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300 group">
                            <div className="aspect-video overflow-hidden rounded-t-lg">
                              <img
                                src={article.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop'}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <CardHeader>
                              <div className="flex items-center justify-between mb-2">
                                <Badge className={getCategoryColor(article.category)}>
                                  {getCategoryLabel(article.category)}
                                </Badge>
                                <div className="flex items-center text-gray-500 text-xs">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {formatDate(article.created_at)}
                                </div>
                              </div>
                              <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {article.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                {article.summary || article.content.substring(0, 100) + '...'}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-500 text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {getReadingTime(article.content)} 分钟阅读
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/news/${article.id}`}>
                                    阅读更多
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 行业洞察 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">行业洞察</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              深度分析液压行业发展趋势，为您提供有价值的行业资讯
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">市场趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  深入分析液压设备市场发展趋势，把握行业发展脉搏
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">技术前沿</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  关注液压技术最新发展，分享前沿技术和创新应用
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">政策解读</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  及时解读行业政策变化，帮助企业把握发展机遇
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 订阅新闻 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            订阅我们的新闻资讯
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            第一时间获取捷瀚液压最新动态和行业资讯
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              placeholder="请输入您的邮箱地址"
              className="bg-white text-gray-900"
            />
            <Button variant="secondary" size="lg">
              立即订阅
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;