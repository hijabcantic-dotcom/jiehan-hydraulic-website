import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // 移除tabs导入
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Download, Phone, Mail, Share2, CheckCircle, Settings, Zap } from 'lucide-react';
import { productApi } from '@/db/api';
import { Product } from '@/types/types';
import { useLanguage } from '@/contexts/LanguageContext';
import ConsultationForm from '@/components/forms/ConsultationForm';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        console.log('ProductDetail: 开始获取产品数据, ID:', id);
        const [productData, allProducts] = await Promise.all([
          productApi.getProductById(id),
          productApi.getAllProducts()
        ]);
        
        console.log('ProductDetail: 获取到的产品数据:', productData);
        setProduct(productData);
        
        // 获取相关产品（同类别的其他产品）
        if (productData) {
          const related = allProducts
            .filter(p => p.category === productData.category && p.id !== productData.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, Record<string, string>> = {
      '液压泵': { zh: '液压泵', en: 'Hydraulic Pump' },
      '液压阀': { zh: '液压阀', en: 'Hydraulic Valve' },
      '液压缸': { zh: '液压缸', en: 'Hydraulic Cylinder' },
      '液压附件': { zh: '液压附件', en: 'Hydraulic Accessories' }
    };
    return categoryMap[category]?.[language] || category;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
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
          <p className="text-gray-600">加载产品信息中...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">产品未找到</h2>
          <p className="text-gray-600 mb-8">抱歉，您访问的产品不存在或已被删除。</p>
          <Button asChild>
            <Link to="/products">
              <ArrowLeft className="mr-2 w-4 h-4" />
              返回产品列表
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to={language === 'zh' ? '/' : '/en'} className="hover:text-blue-600">{language === 'zh' ? '首页' : 'Home'}</Link>
            <span>/</span>
            <Link to={language === 'zh' ? '/products' : '/en/products'} className="hover:text-blue-600">{language === 'zh' ? '产品展示' : 'Products'}</Link>
            <span>/</span>
            <span className="text-gray-900">{language === 'zh' ? (product.name_zh || product.name) : (product.name_en || product.name)}</span>
          </nav>
        </div>
      </div>

      {/* 产品详情 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 产品图片 */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
                <img
                  src={product.image_url || 'https://miaoda-site-img.cdn.bcebos.com/dba0567b-ca36-416a-9056-c26d04258ffd/images/c6fe284e-9df2-11f0-a567-1ea3ef713798_0.jpg'}
                  alt={language === 'zh' ? (product.name_zh || product.name) : (product.name_en || product.name)}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* 操作按钮 */}
              <div className="flex space-x-4">
                <Button variant="outline" onClick={handleShare} className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  {language === 'zh' ? '分享产品' : 'Share Product'}
                </Button>
                {product.datasheet_url && (
                  <Button variant="outline" asChild className="flex-1">
                    <a href={product.datasheet_url} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      {language === 'zh' ? '下载资料' : 'Download'}
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* 产品信息 */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <h1 className="text-4xl font-bold text-gray-900">{language === 'zh' ? (product.name_zh || product.name) : (product.name_en || product.name)}</h1>
                  {product.model && (
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {product.model}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <Badge variant="outline" className="text-sm">
                    {getCategoryLabel(product.category)}
                  </Badge>
                  {product.is_featured && (
                    <Badge className="text-sm bg-orange-100 text-orange-800">
                      {language === 'zh' ? '推荐产品' : 'Featured'}
                    </Badge>
                  )}
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {language === 'zh' ? (product.description_zh || product.description) : (product.description_en || product.description)}
                </p>
              </div>

              {/* 产品特点 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">{language === 'zh' ? '产品特点' : 'Product Features'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{language === 'zh' ? '高精度制造' : 'High Precision Manufacturing'}</h4>
                      <p className="text-sm text-gray-600">{language === 'zh' ? '采用精密加工工艺，确保产品精度' : 'Adopts precision machining process to ensure product accuracy'}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Settings className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{language === 'zh' ? '可靠耐用' : 'Reliable & Durable'}</h4>
                      <p className="text-sm text-gray-600">{language === 'zh' ? '优质材料制造，使用寿命长' : 'Manufactured with high-quality materials, long service life'}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{language === 'zh' ? '高效节能' : 'High Efficiency'}</h4>
                      <p className="text-sm text-gray-600">{language === 'zh' ? '优化设计，提高工作效率' : 'Optimized design, improved work efficiency'}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{language === 'zh' ? '易于维护' : 'Easy Maintenance'}</h4>
                      <p className="text-sm text-gray-600">{language === 'zh' ? '结构简单，维护方便' : 'Simple structure, convenient maintenance'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 联系咨询 */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{language === 'zh' ? '需要技术咨询？' : 'Need Technical Consultation?'}</h3>
                <p className="text-gray-600 mb-4">
                  {language === 'zh' ? '我们的技术专家将为您提供专业的产品选型和技术支持服务。' : 'Our technical experts will provide you with professional product selection and technical support services.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        {language === 'zh' ? '预约咨询' : 'Book Consultation'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <ConsultationForm />
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    asChild
                    onClick={() => {
                      // 滚动到页面顶部
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <Link to={language === 'zh' ? '/contact' : '/en/contact'}>
                      <Mail className="w-4 h-4 mr-2" />
                      {language === 'zh' ? '联系我们' : 'Contact Us'}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 详细信息 - SEO优化的平铺布局 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* 技术参数 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Settings className="w-6 h-6 mr-3 text-blue-600" />
                {language === 'zh' ? '技术参数' : 'Technical Specifications'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {product.specifications ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg border">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span className="text-gray-900 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">{language === 'zh' ? '暂无技术参数信息' : 'No technical specifications available'}</p>
              )}
            </CardContent>
          </Card>
          
          {/* 应用场景 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Zap className="w-6 h-6 mr-3 text-green-600" />
                {language === 'zh' ? '应用场景' : 'Application Scenarios'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {product.applications && (Array.isArray(product.applications) ? product.applications.length > 0 : product.applications.trim()) ? (
                <div className="space-y-4">
                  <p className="text-gray-700 mb-4 text-lg">
                    {language === 'zh' ? '该产品广泛应用于以下场景：' : 'This product is widely used in the following scenarios:'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(Array.isArray(product.applications) 
                      ? product.applications 
                      : product.applications.split(/[,\n]/).map(s => s.trim()).filter(s => s)
                    ).map((app, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-800">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">{language === 'zh' ? '暂无应用场景信息' : 'No application scenarios available'}</p>
              )}
            </CardContent>
          </Card>
          
          {/* 安装说明 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Settings className="w-6 h-6 mr-3 text-purple-600" />
                {language === 'zh' ? '安装说明' : 'Installation Guide'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">{language === 'zh' ? '安装前准备' : 'Pre-installation Preparation'}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>{language === 'zh' ? '检查产品包装是否完整，确认产品型号规格' : 'Check if the product packaging is complete and confirm the product model specifications'}</li>
                    <li>{language === 'zh' ? '准备相应的安装工具和配件' : 'Prepare the corresponding installation tools and accessories'}</li>
                    <li>{language === 'zh' ? '确保安装环境符合产品要求' : 'Ensure the installation environment meets product requirements'}</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">{language === 'zh' ? '安装步骤' : 'Installation Steps'}</h4>
                  <ul className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>{language === 'zh' ? '按照图纸要求确定安装位置' : 'Determine the installation position according to drawing requirements'}</li>
                    <li>{language === 'zh' ? '固定产品底座，确保水平稳固' : 'Fix the product base to ensure horizontal stability'}</li>
                    <li>{language === 'zh' ? '连接液压管路，注意密封性' : 'Connect hydraulic pipelines, pay attention to sealing'}</li>
                    <li>{language === 'zh' ? '进行系统调试和测试' : 'Perform system debugging and testing'}</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2 text-lg">{language === 'zh' ? '注意事项' : 'Important Notes'}</h4>
                  <p className="text-yellow-700">
                    {language === 'zh' ? '安装过程中请严格按照产品说明书操作，如有疑问请及时联系我们的技术支持团队。' : 'Please strictly follow the product manual during installation. If you have any questions, please contact our technical support team in time.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </section>

      {/* 相关产品 */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{language === 'zh' ? '相关产品' : 'Related Products'}</h2>
              <p className="text-gray-600">{language === 'zh' ? '您可能还对这些产品感兴趣' : 'You might also be interested in these products'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={relatedProduct.image_url || 'https://miaoda-site-img.cdn.bcebos.com/dba0567b-ca36-416a-9056-c26d04258ffd/images/c6fe284e-9df2-11f0-a567-1ea3ef713798_0.jpg'}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{relatedProduct.name_zh || relatedProduct.name}</CardTitle>
                    <Badge variant="secondary">{relatedProduct.model}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedProduct.description_zh || relatedProduct.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to={`${language === 'zh' ? '' : '/en'}/products/${relatedProduct.id}`}>
                        {language === 'zh' ? '查看详情' : 'View Details'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;