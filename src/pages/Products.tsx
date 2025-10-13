import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, Filter, Grid, List } from 'lucide-react';
import { productApi } from '@/db/api';
import { Product } from '@/types/types';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/seo/SEOHead';
import { seoConfig, generateStructuredData } from '@/config/seo';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  // SEO相关数据
  const seoData = seoConfig.pages.products[language];
  const currentPath = language === 'en' ? '/en/products' : '/products';
  
  // 生成产品结构化数据
  const productStructuredData = products.map(product => ({
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Jiehan Hydraulic'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Jiehan Hydraulic'
    }
  }));

  const structuredData = generateStructuredData('CollectionPage', {
    '@type': 'CollectionPage',
    name: seoData.title,
    description: seoData.description,
    url: currentPath,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: productStructuredData
    }
  });

  const [categories, setCategories] = useState([
    { value: 'all', label: t('product.all') || '全部产品', count: 0 },
    { value: 'pump', label: t('product.category.pump') || '液压泵', count: 0 },
    { value: 'valve', label: t('product.category.valve') || '液压阀', count: 0 },
    { value: 'cylinder', label: t('product.category.cylinder') || '液压缸', count: 0 },
    { value: 'accessory', label: t('product.category.accessory') || '液压附件', count: 0 }
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
        
        // 更新分类计数
        setCategories(prevCategories => [
          { ...prevCategories[0], count: data.length },
          { ...prevCategories[1], count: data.filter(p => p.category === '液压泵').length },
          { ...prevCategories[2], count: data.filter(p => p.category === '液压阀').length },
          { ...prevCategories[3], count: data.filter(p => p.category === '液压缸').length },
          { ...prevCategories[4], count: data.filter(p => p.category === '液压配件').length }
        ]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // 按分类筛选
    if (selectedCategory !== 'all') {
      const categoryMap: { [key: string]: string } = {
        'pump': '液压泵',
        'valve': '液压阀', 
        'cylinder': '液压缸',
        'accessory': '液压配件'
      };
      const targetCategory = categoryMap[selectedCategory];
      if (targetCategory) {
        filtered = filtered.filter(product => product.category === targetCategory);
      }
    }

    // 按搜索词筛选
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  const getCategoryLabel = (category: string) => {
    return t(`product.category.${category}`) || category;
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const { language } = useLanguage();
    const productName = language === 'zh' ? (product.name_zh || product.name) : (product.name_en || product.name);
    const productDescription = language === 'zh' ? (product.description_zh || product.description) : (product.description_en || product.description);
    
    return (
      <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer" asChild>
        <Link to={`/products/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <img
              src={product.image_url || 'https://miaoda-site-img.cdn.bcebos.com/dba0567b-ca36-416a-9056-c26d04258ffd/images/c6fe284e-9df2-11f0-a567-1ea3ef713798_0.jpg'}
              alt={productName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{productName}</CardTitle>
              {product.model && <Badge variant="secondary">{product.model}</Badge>}
            </div>
            <Badge variant="outline" className="w-fit">
              {getCategoryLabel(product.category)}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {productDescription}
            </p>
            
            {/* 技术参数预览 */}
            {product.specifications && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('product.mainParameters')}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 应用场景 */}
            {product.applications && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('product.applicationScenarios')}</h4>
                <div className="flex flex-wrap gap-1">
                  {(() => {
                    // 处理applications字段，可能是数组或字符串
                    let apps = [];
                    if (Array.isArray(product.applications)) {
                      apps = product.applications;
                    } else if (typeof product.applications === 'string') {
                      // 如果是字符串，按换行符或逗号分割
                      apps = product.applications.split(/[\n,，]/).filter(app => app.trim());
                    }
                    return apps.slice(0, 3).map((app, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {app.trim()}
                      </Badge>
                    ));
                  })()}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
              {t('product.viewDetails')} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  };

  const ProductListItem = ({ product }: { product: Product }) => {
    const { language } = useLanguage();
    const productName = language === 'zh' ? (product.name_zh || product.name) : (product.name_en || product.name);
    const productDescription = language === 'zh' ? (product.description_zh || product.description) : (product.description_en || product.description);
    
    return (
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" asChild>
        <Link to={`/products/${product.id}`} className="block">
          <div className="flex">
            <div className="w-48 h-32 overflow-hidden rounded-l-lg flex-shrink-0">
              <img
                src={product.image_url || 'https://miaoda-site-img.cdn.bcebos.com/dba0567b-ca36-416a-9056-c26d04258ffd/images/c6fe284e-9df2-11f0-a567-1ea3ef713798_0.jpg'}
                alt={productName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{productName}</h3>
                    {product.model && <Badge variant="secondary">{product.model}</Badge>}
                    <Badge variant="outline">{getCategoryLabel(product.category)}</Badge>
                  </div>
                  <p className="text-gray-600 line-clamp-2">
                    {productDescription}
                  </p>
                </div>
                <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                  {t('product.viewDetails')} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 技术参数 */}
            {product.specifications && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">主要参数</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 应用场景 */}
            {product.applications && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">应用场景</h4>
                <div className="flex flex-wrap gap-1">
                  {(() => {
                    // 处理applications字段，可能是数组或字符串
                    let apps = [];
                    if (Array.isArray(product.applications)) {
                      apps = product.applications;
                    } else if (typeof product.applications === 'string') {
                      // 如果是字符串，按换行符或逗号分割
                      apps = product.applications.split(/[\n,，]/).filter(app => app.trim());
                    }
                    return apps.map((app, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {app.trim()}
                      </Badge>
                    ));
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </Link>
    </Card>
  );
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading') || '加载产品信息中...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={currentPath}
        structuredData={structuredData}
        alternateHrefs={[
          { href: `${seoConfig.site.url}/products`, hrefLang: 'zh' },
          { href: `${seoConfig.site.url}/en/products`, hrefLang: 'en' }
        ]}
      />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('nav.products') || '产品展示'}</h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto">
            {t('home.products.subtitle') || '专业的液压产品系列，满足各种工业应用需求'}
          </p>
        </div>
      </section>

      {/* 产品筛选和搜索 */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* 搜索框 */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder={t('product.search') || '搜索产品名称、型号...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 视图切换 */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 产品列表 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            {/* 移动端优化的分类导航 */}
            <div className="mb-8 overflow-x-auto">
              <TabsList className="grid grid-cols-5 w-full min-w-max md:min-w-0">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category.value} 
                    value={category.value} 
                    className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4"
                  >
                    <span className="truncate">{category.label}</span>
                    <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs flex-shrink-0">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={selectedCategory}>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('product.noProducts')}</h3>
                  <p className="text-gray-600">
                    {searchTerm ? t('product.noSearchResults') : t('product.noProductsInCategory')}
                  </p>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-6'
                }>
                  {filteredProducts.map((product) => (
                    viewMode === 'grid' ? (
                      <ProductCard key={product.id} product={product} />
                    ) : (
                      <ProductListItem key={product.id} product={product} />
                    )
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Products;