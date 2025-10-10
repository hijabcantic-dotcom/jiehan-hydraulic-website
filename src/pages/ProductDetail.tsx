import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Download, Phone, Mail, Share2, CheckCircle, Settings, Zap } from 'lucide-react';
import { productApi } from '@/db/api';
import { Product } from '@/types/types';
import ConsultationForm from '@/components/forms/ConsultationForm';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const [productData, allProducts] = await Promise.all([
          productApi.getProductById(id),
          productApi.getAllProducts()
        ]);
        
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
    const categoryMap: Record<string, string> = {
      pump: '液压泵',
      valve: '液压阀',
      cylinder: '液压缸',
      accessory: '液压附件'
    };
    return categoryMap[category] || category;
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
            <Link to="/" className="hover:text-blue-600">首页</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-blue-600">产品展示</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
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
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* 操作按钮 */}
              <div className="flex space-x-4">
                <Button variant="outline" onClick={handleShare} className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  分享产品
                </Button>
                {product.datasheet_url && (
                  <Button variant="outline" asChild className="flex-1">
                    <a href={product.datasheet_url} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      下载资料
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* 产品信息 */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {product.model}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <Badge variant="outline" className="text-sm">
                    {getCategoryLabel(product.category)}
                  </Badge>
                  {product.featured && (
                    <Badge className="text-sm bg-orange-100 text-orange-800">
                      推荐产品
                    </Badge>
                  )}
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* 产品特点 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">产品特点</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">高精度制造</h4>
                      <p className="text-sm text-gray-600">采用精密加工工艺，确保产品精度</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Settings className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">可靠耐用</h4>
                      <p className="text-sm text-gray-600">优质材料制造，使用寿命长</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">高效节能</h4>
                      <p className="text-sm text-gray-600">优化设计，提高工作效率</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">易于维护</h4>
                      <p className="text-sm text-gray-600">结构简单，维护方便</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 联系咨询 */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">需要技术咨询？</h3>
                <p className="text-gray-600 mb-4">
                  我们的技术专家将为您提供专业的产品选型和技术支持服务。
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        预约咨询
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <ConsultationForm />
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/contact">
                      <Mail className="w-4 h-4 mr-2" />
                      联系我们
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 详细信息标签页 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">技术参数</TabsTrigger>
              <TabsTrigger value="applications">应用场景</TabsTrigger>
              <TabsTrigger value="installation">安装说明</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>技术参数</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.specifications ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="font-medium text-gray-700">{key}</span>
                          <span className="text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">暂无技术参数信息</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="applications" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>应用场景</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.applications && product.applications.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-gray-700 mb-4">
                        该产品广泛应用于以下场景：
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.applications.map((app, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-800">{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">暂无应用场景信息</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="installation" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>安装说明</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">安装前准备</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>检查产品包装是否完整，确认产品型号规格</li>
                        <li>准备相应的安装工具和配件</li>
                        <li>确保安装环境符合产品要求</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">安装步骤</h4>
                      <ul className="list-decimal list-inside space-y-1 text-gray-700">
                        <li>按照图纸要求确定安装位置</li>
                        <li>固定产品底座，确保水平稳固</li>
                        <li>连接液压管路，注意密封性</li>
                        <li>进行系统调试和测试</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">注意事项</h4>
                      <p className="text-yellow-700 text-sm">
                        安装过程中请严格按照产品说明书操作，如有疑问请及时联系我们的技术支持团队。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 相关产品 */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">相关产品</h2>
              <p className="text-gray-600">您可能还对这些产品感兴趣</p>
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
                    <CardTitle className="text-lg">{relatedProduct.name}</CardTitle>
                    <Badge variant="secondary">{relatedProduct.model}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to={`/products/${relatedProduct.id}`}>
                        查看详情
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