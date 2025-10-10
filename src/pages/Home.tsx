import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRight, Phone, Users, Award, Globe, TrendingUp } from 'lucide-react';
import { productApi, newsApi } from '@/db/api';
import { Product, NewsArticle } from '@/types/types';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/common/AnimatedSection';
import ConsultationForm from '@/components/forms/ConsultationForm';
import SEOHead from '@/components/seo/SEOHead';
import { seoConfig, generateStructuredData } from '@/config/seo';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, news] = await Promise.all([
          productApi.getFeaturedProducts(),
          newsApi.getPublishedNews()
        ]);
        setFeaturedProducts(products.slice(0, 4));
        setLatestNews(news.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryLabel = (category: string) => {
    return t(`product.category.${category}`);
  };

  const stats = [
    { number: '500+', label: t('home.stats.clients'), icon: Users },
    { number: '15', label: t('home.stats.experience'), icon: Award },
    { number: '30+', label: t('home.stats.countries'), icon: Globe },
    { number: '98%', label: t('home.stats.satisfaction'), icon: TrendingUp }
  ];

  const { language } = useLanguage();
  const seoData = seoConfig.pages.home[language];
  const structuredData = generateStructuredData('Organization', {
    '@type': 'Organization',
    name: seoConfig.site.name,
    foundingDate: '2008',
    numberOfEmployees: '50-100',
    industry: 'Hydraulic Equipment Manufacturing'
  });

  return (
    <div className="min-h-screen">
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={language === 'en' ? '/en' : '/'}
        structuredData={structuredData}
        alternateHrefs={[
          { href: `${seoConfig.site.url}/`, hrefLang: 'zh' },
          { href: `${seoConfig.site.url}/en`, hrefLang: 'en' }
        ]}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://miaoda-img.cdn.bcebos.com/img/corpus/78e517e9e0a648bea592f0d52fd85b16.jpg')] bg-cover bg-center opacity-20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <AnimatedSection delay={200}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent" 
                style={{ fontFamily: '"Orbitron", "Arial Black", sans-serif', textShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}>
              {t('home.hero.title')}
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={400}>
            <h2 className="text-3xl md:text-5xl font-semibold mb-8 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent"
                style={{ fontFamily: '"Orbitron", "Arial Black", sans-serif', textShadow: '0 0 20px rgba(147, 51, 234, 0.5)' }}>
              {t('home.hero.subtitle')}
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={600}>
            <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto mb-12 leading-relaxed">
              {t('home.hero.description')}
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={800}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
                    <Phone className="w-6 h-6 mr-3" />
                    {t('home.hero.consultation')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <ConsultationForm />
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300 bg-white/10" asChild>
                <Link to="/products">
                  {t('home.hero.products')} <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <AnimatedSection key={index} delay={index * 100} direction="up">
                    <div className="text-center group hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('home.products.title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('home.products.subtitle')}</p>
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 150} direction="up">
                  <Card className="hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.image_url || 'https://miaoda-site-img.cdn.bcebos.com/dba0567b-ca36-416a-9056-c26d04258ffd/images/c6fe284e-9df2-11f0-a567-1ea3ef713798_0.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{getCategoryLabel(product.category)}</Badge>
                        {product.featured && (
                          <Badge className="bg-orange-100 text-orange-800">推荐</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{product.name}</CardTitle>
                      <p className="text-sm text-gray-600">{product.model}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors" asChild>
                        <Link to={`/products/${product.id}`}>
                          {t('product.viewDetails')}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}

          <AnimatedSection delay={600}>
            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link to="/products">
                  {t('home.products.viewAll')} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('home.news.title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('home.news.subtitle')}</p>
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((article, index) => (
                <AnimatedSection key={article.id} delay={index * 200} direction="up">
                  <Card className="hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={article.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop'}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{t(`news.category.${article.category}`)}</Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(article.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {article.summary || article.content.substring(0, 100) + '...'}
                      </p>
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors" asChild>
                        <Link to={`/news/${article.id}`}>
                          {t('product.readMore')}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}

          <AnimatedSection delay={600}>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link to="/news">
                  {t('home.news.viewAll')} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;