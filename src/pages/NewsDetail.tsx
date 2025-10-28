import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2, Eye, ArrowRight } from 'lucide-react';
import { newsApi } from '@/db/api';
import { NewsArticle } from '@/types/types';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        const [articleData, allNews] = await Promise.all([
          newsApi.getNewsById(id),
          newsApi.getPublishedNews()
        ]);
        
        setArticle(articleData);
        
        // 获取相关新闻（同类别的其他新闻）
        if (articleData) {
          const related = allNews
            .filter(n => n.category === articleData.category && n.id !== articleData.id)
            .slice(0, 3);
          setRelatedNews(related);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.summary || article?.content.substring(0, 200),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // 这里可以添加toast提示
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载新闻内容中...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">新闻未找到</h2>
          <p className="text-gray-600 mb-8">抱歉，您访问的新闻不存在或已被删除。</p>
          <Button asChild>
            <Link to="/news">
              <ArrowLeft className="mr-2 w-4 h-4" />
              返回新闻中心
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* 面包屑导航 */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">首页</Link>
            <span>/</span>
            <Link to="/news" className="hover:text-blue-600">新闻中心</Link>
            <span>/</span>
            <span className="text-gray-900">{getCategoryLabel(article.category)}</span>
          </nav>
        </div>
      </div>

      {/* 文章内容 */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 文章头部 */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Badge className={getCategoryColor(article.category)}>
                {getCategoryLabel(article.category)}
              </Badge>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(article.created_at)}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {getReadingTime(article.content)} 分钟阅读
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>
            
            {article.summary && (
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {article.summary}
              </p>
            )}

            {/* 分享按钮 */}
            <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  分享文章
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                最后更新：{formatDate(article.updated_at)}
              </div>
            </div>
          </header>

          {/* 文章图片 */}
          {article.image_url && (
            <div className="mb-8">
              <img
                src={article.image_url}
                alt={(article as any).image_description || article.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* 文章正文 */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* 文章底部 */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Button variant="outline" asChild>
                <Link to="/news">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  返回新闻中心
                </Link>
              </Button>
              
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                分享文章
              </Button>
            </div>
          </footer>
        </div>
      </article>

      {/* 相关新闻 */}
      {relatedNews.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">相关新闻</h2>
              <p className="text-gray-600">您可能还对这些新闻感兴趣</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedNews.map((relatedArticle) => (
                <Card key={relatedArticle.id} className="hover:shadow-lg transition-shadow duration-300 group">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={relatedArticle.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop'}
                      alt={(relatedArticle as any).image_description || relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(relatedArticle.category)}>
                        {getCategoryLabel(relatedArticle.category)}
                      </Badge>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(relatedArticle.created_at)}
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {relatedArticle.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {relatedArticle.summary || relatedArticle.content.substring(0, 100) + '...'}
                    </p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to={`/news/${relatedArticle.id}`}>
                        阅读全文 <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            想了解更多液压解决方案？
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            我们的技术专家随时为您提供专业的咨询服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">
                联系我们 <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700" asChild>
              <Link to="/products">
                查看产品
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;