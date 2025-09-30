import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Users, Award, Globe, Zap, Settings, Shield } from 'lucide-react';
import { newsApi, productApi } from '@/db/api';
import { NewsArticle, Product } from '@/types/types';

const Home: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    clients: 0,
    experience: 0,
    products: 0,
    countries: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [news, products] = await Promise.all([
          newsApi.getLatestNews(3),
          productApi.getFeaturedProducts()
        ]);
        setLatestNews(news);
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // 数字滚动动画
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      const targets = { clients: 500, experience: 15, products: 200, countries: 30 };
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          clients: Math.floor(targets.clients * progress),
          experience: Math.floor(targets.experience * progress),
          products: Math.floor(targets.products * progress),
          countries: Math.floor(targets.countries * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setStats(targets);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 背景图片 */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://miaoda-img.cdn.bcebos.com/img/corpus/78e517e9e0a648bea592f0d52fd85b16.jpg')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-transparent"></div>
        </div>

        {/* 动态背景效果 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                精密液压解决方案
                <span className="block text-3xl md:text-5xl text-blue-300 mt-2">
                  驱动未来工业
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                专注液压泵、液压阀及液压附件制造15年，为全球客户提供可靠、高效的液压动力解决方案
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                asChild
              >
                <Link to="/products">
                  探索产品 <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg backdrop-blur-sm"
                asChild
              >
                <Link to="/contact">
                  联系我们
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 滚动指示器 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* 数据统计 */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stats.clients}+</div>
              <div className="text-gray-600 font-medium">全球客户</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stats.experience}</div>
              <div className="text-gray-600 font-medium">年行业经验</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stats.products}+</div>
              <div className="text-gray-600 font-medium">产品型号</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stats.countries}+</div>
              <div className="text-gray-600 font-medium">出口国家</div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">为什么选择捷瀚液压</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              凭借15年的行业经验和持续创新，我们为客户提供最可靠的液压解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">质量保证</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  通过ISO9001-2015认证，严格的质量控制体系确保每一件产品的可靠性
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">技术先进</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  采用CAD/CAM技术和自动测试手段，确保产品精度和性能达到国际先进水平
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">快速响应</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  24小时技术支持，快速响应客户需求，提供及时的技术服务和解决方案
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">全球服务</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  产品远销30多个国家和地区，为全球客户提供专业的液压解决方案
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 推荐产品 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">推荐产品</h2>
            <p className="text-xl text-gray-600">
              精选热门产品，满足不同应用场景的液压动力需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300 group">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url || 'https://miaoda-site-img.cdn.bcebos.com/dba0567b-ca36-416a-9056-c26d04258ffd/images/c6fe284e-9df2-11f0-a567-1ea3ef713798_0.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant="secondary">{product.model}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={`/products/${product.id}`}>
                      查看详情 <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">
                查看全部产品 <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 应用领域 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">应用领域</h2>
            <p className="text-xl text-gray-600">
              广泛应用于各个工业领域，为客户提供可靠的液压动力支持
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://miaoda-site-img.cdn.bcebos.com/bff9fb0c-512c-495e-85cc-12750806669e/images/c6ff1362-9df2-11f0-b42d-8af640abeb71_0.jpg"
                alt="工程机械"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-2">工程机械</h3>
                <p className="text-sm">挖掘机、装载机、起重机等设备的液压系统</p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://miaoda-site-img.cdn.bcebos.com/983d1e53-e45e-4ef8-9402-c9ddd1a17fdc/images/c754ebd4-9df2-11f0-ab42-ead8d933836c_0.jpg"
                alt="工业制造"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-2">工业制造</h3>
                <p className="text-sm">机床设备、注塑机、压力机等制造设备</p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://miaoda-site-img.cdn.bcebos.com/11b2194f-1864-46d8-bc05-5f1f7a1a353c/images/ca3308cc-9df2-11f0-a567-1ea3ef713798_0.jpg"
                alt="冶金化工"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-2">冶金化工</h3>
                <p className="text-sm">钢铁冶炼、化工生产等重工业设备</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 最新动态 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">最新动态</h2>
            <p className="text-xl text-gray-600">
              了解捷瀚液压的最新发展和行业资讯
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={article.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop'}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={article.category === 'company' ? 'default' : 'secondary'}>
                      {article.category === 'company' ? '公司动态' : 
                       article.category === 'industry' ? '行业新闻' : '产品资讯'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {article.summary || article.content.substring(0, 100) + '...'}
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/news/${article.id}`}>
                      阅读更多 <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/news">
                查看更多新闻 <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;