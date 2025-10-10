import { RouteConfig } from '@/types/types';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import News from '@/pages/News';
import NewsDetail from '@/pages/NewsDetail';
import Solutions from '@/pages/Solutions';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';

// 中文路由配置
const zhRoutes: RouteConfig[] = [
  {
    name: '首页',
    path: '/',
    element: <Home />,
    visible: true,
    language: 'zh'
  },
  {
    name: '关于企业',
    path: '/about',
    element: <About />,
    visible: true,
    language: 'zh'
  },
  {
    name: '产品展示',
    path: '/products',
    element: <Products />,
    visible: true,
    language: 'zh'
  },
  {
    name: '产品详情',
    path: '/products/:id',
    element: <ProductDetail />,
    visible: false,
    language: 'zh'
  },
  {
    name: '解决方案',
    path: '/solutions',
    element: <Solutions />,
    visible: true,
    language: 'zh'
  },
  {
    name: '新闻中心',
    path: '/news',
    element: <News />,
    visible: true,
    language: 'zh'
  },
  {
    name: '新闻详情',
    path: '/news/:id',
    element: <NewsDetail />,
    visible: false,
    language: 'zh'
  },
  {
    name: '联系我们',
    path: '/contact',
    element: <Contact />,
    visible: true,
    language: 'zh'
  },
  {
    name: '后台管理',
    path: '/admin',
    element: <Admin />,
    visible: false,
    language: 'zh'
  }
];

// 英文路由配置
const enRoutes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/en',
    element: <Home />,
    visible: true,
    language: 'en'
  },
  {
    name: 'About Us',
    path: '/en/about',
    element: <About />,
    visible: true,
    language: 'en'
  },
  {
    name: 'Products',
    path: '/en/products',
    element: <Products />,
    visible: true,
    language: 'en'
  },
  {
    name: 'Product Detail',
    path: '/en/products/:id',
    element: <ProductDetail />,
    visible: false,
    language: 'en'
  },
  {
    name: 'Solutions',
    path: '/en/solutions',
    element: <Solutions />,
    visible: true,
    language: 'en'
  },
  {
    name: 'News',
    path: '/en/news',
    element: <News />,
    visible: true,
    language: 'en'
  },
  {
    name: 'News Detail',
    path: '/en/news/:id',
    element: <NewsDetail />,
    visible: false,
    language: 'en'
  },
  {
    name: 'Contact',
    path: '/en/contact',
    element: <Contact />,
    visible: true,
    language: 'en'
  }
];

// 合并所有路由
const routes: RouteConfig[] = [...zhRoutes, ...enRoutes];

export default routes;