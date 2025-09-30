import { RouteConfig } from '@/types/types';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import News from '@/pages/News';
import NewsDetail from '@/pages/NewsDetail';
import Solutions from '@/pages/Solutions';
import Contact from '@/pages/Contact';

const routes: RouteConfig[] = [
  {
    name: '首页',
    path: '/',
    element: <Home />,
    visible: true
  },
  {
    name: '关于企业',
    path: '/about',
    element: <About />,
    visible: true
  },
  {
    name: '产品展示',
    path: '/products',
    element: <Products />,
    visible: true
  },
  {
    name: '产品详情',
    path: '/products/:id',
    element: <ProductDetail />,
    visible: false
  },
  {
    name: '解决方案',
    path: '/solutions',
    element: <Solutions />,
    visible: true
  },
  {
    name: '新闻中心',
    path: '/news',
    element: <News />,
    visible: true
  },
  {
    name: '新闻详情',
    path: '/news/:id',
    element: <NewsDetail />,
    visible: false
  },
  {
    name: '联系我们',
    path: '/contact',
    element: <Contact />,
    visible: true
  }
];

export default routes;