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
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/seo/SEOHead';
import { seoConfig, generateStructuredData } from '@/config/seo';

const News: React.FC = () => {
  const { language } = useLanguage();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // 多语言内容
  const content = {
    zh: {
      hero: {
        title: '新闻中心',
        subtitle: '了解捷瀚液压最新动态和行业资讯'
      },
      search: {
        placeholder: '搜索新闻标题、内容...'
      },
      categories: [
        { value: 'all', label: '全部新闻', count: 0 },
        { value: 'company', label: '公司动态', count: 0 },
        { value: 'industry', label: '行业新闻', count: 0 },
        { value: 'product', label: '产品资讯', count: 0 }
      ],
      empty: {
        title: '暂无新闻',
        subtitle: '该分类下暂无新闻'
      },
      readMore: '阅读更多',
      publishedAt: '发布时间',
      category: '分类'
    },
    en: {
      hero: {
        title: 'News Center',
        subtitle: 'Stay updated with Jiehan Hydraulic news and industry trends'
      },
      search: {
        placeholder: 'Search news title, content...'
      },
      categories: [
        { value: 'all', label: 'All News', count: 0 },
        { value: 'company', label: 'Company News', count: 0 },
        { value: 'industry', label: 'Industry News', count: 0 },
        { value: 'product', label: 'Product News', count: 0 }
      ],
      empty: {
        title: 'No News Available',
        subtitle: 'No news available in this category'
      },
      readMore: 'Read More',
      publishedAt: 'Published',
      category: 'Category'
    }
  };

  const currentContent = content[language];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsApi.getPublishedNews();
        setNews(data);
        setFilteredNews(data);
        
        // 更新分类计数
        currentContent.categories[0].count = data.length;
        currentContent.categories[1].count = data.filter(n => n.category === 'company').length;
        currentContent.categories[2].count = data.filter(n => n.category === 'industry').length;
        currentContent.categories[3].count = data.filter(n => n.category === 'product').length;
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [language]);

  useEffect(() => {
    let filtered = news;

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // 按搜索词筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(article => {
        const title = language === 'zh' ? article.title_zh : article.title_en;
        const content = language === 'zh' ? article.content_zh : article.content_en;
        return title.toLowerCase().includes(searchLower) || 
               content.toLowerCase().includes(searchLower);
      });
    }

    setFilteredNews(filtered);
  }, [news, selectedCategory, searchTerm, language]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap = {
      zh: {
        company: '公司动态',
        industry: '行业新闻',
        product: '产品资讯'
      },
      en: {
        company: 'Company News',
        industry: 'Industry News',
        product: 'Product News'
      }
    };
    return categoryMap[language][category as keyof typeof categoryMap.zh] || category;
  };

  const seoData = seoConfig.pages.news[language];
  const currentPath = language === 'en' ? '/en/news' : '/news';
  const structuredData = generateStructuredData('NewsPage', {
    '@type': 'NewsPage',
    name: seoData.title,
    description: seoData.description,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: filteredNews.slice(0, 10).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'NewsArticle',
          headline: language === 'zh' ? article.title_zh : article.title_en,
          description: language === 'zh' ? article.summary_zh : article.summary_en,
          datePublished: article.published_at,
          author: {
            '@type': 'Organization',
            name: 'Jiehan Hydraulic'
          }
        }
      }))
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
          { href: `${seoConfig.site.url}/news`, hrefLang: 'zh' },
          { href: `${seoConfig.site.url}/en/news`, hrefLang: 'en' }
        ]}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=600&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {currentContent.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto">
            {currentContent.hero.subtitle}
          </p>
        </div>
      </section>

      {/* 搜索和分类 */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* 搜索框 */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={currentContent.search.placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 分类标签 */}
            <div className="flex flex-wrap gap-2">
              {currentContent.categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className="whitespace-nowrap"
                >
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 新闻列表 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">
                {language === 'zh' ? '加载中...' : 'Loading...'}
              </p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                <Search className="w-full h-full" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {currentContent.empty.title}
              </h3>
              <p className="text-gray-600">
                {currentContent.empty.subtitle}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={article.image_url}
                      alt={language === 'zh' ? article.title_zh : article.title_en}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                      {getCategoryLabel(article.category)}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold line-clamp-2">
                      {language === 'zh' ? article.title_zh : article.title_en}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(article.published_at)}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {language === 'zh' ? article.summary_zh : article.summary_en}
                    </p>
                    
                    <Link to={`${language === 'en' ? '/en' : ''}/news/${article.id}`}>
                      <Button variant="outline" className="w-full group">
                        {currentContent.readMore}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;