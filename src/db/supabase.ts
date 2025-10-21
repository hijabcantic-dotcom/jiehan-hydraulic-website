import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 检查是否使用模拟模式
// 由于当前Supabase API不可用，强制使用模拟数据模式
const useMockData = true; // 强制使用模拟数据

if (useMockData) {
  console.log('使用模拟数据模式');
}

// 默认模拟数据
const defaultMockData = {
  products: [
    {
      id: '1',
      name_zh: '单齿轮泵',
      name_en: 'Single Gear Pump',
      description_zh: '小型单齿轮泵，适用于低流量应用场景',
      description_en: 'Small single gear pump, suitable for low flow applications',
      category: '液压泵',
      specifications: '排量: 0.5 ml/r\n最大压力: 25 MPa\n最大转速: 3000 rpm\n重量: 0.8 kg',
      features: ['结构紧凑', '性能稳定', '维护简便'],
      applications: ['小型机械', '测试设备', '实验装置'],
      image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
      is_featured: true,
      sort_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      name_zh: '双齿轮泵',
      name_en: 'Double Gear Pump',
      description_zh: '高效双齿轮泵，适用于中等流量应用',
      description_en: 'High efficiency double gear pump, suitable for medium flow applications',
      category: '液压泵',
      specifications: '排量: 1.0 ml/r\n最大压力: 30 MPa\n最大转速: 2500 rpm\n重量: 1.2 kg',
      features: ['高效节能', '噪音低', '寿命长'],
      applications: ['工程机械', '农业设备', '工业设备'],
      image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
      is_featured: true,
      sort_order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      name_zh: '溢流阀',
      name_en: 'Relief Valve',
      description_zh: '精密溢流阀，确保系统压力稳定',
      description_en: 'Precision relief valve, ensuring stable system pressure',
      category: '液压阀',
      specifications: '压力范围: 0-40 MPa\n流量: 100 L/min\n响应时间: <10ms\n工作温度: -20°C to +80°C',
      features: ['响应快速', '压力稳定', '密封可靠'],
      applications: ['液压系统', '压力控制', '安全保护'],
      image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
      is_featured: false,
      sort_order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      name_zh: '液压缸',
      name_en: 'Hydraulic Cylinder',
      description_zh: '高强度液压缸，适用于重载应用',
      description_en: 'High strength hydraulic cylinder, suitable for heavy load applications',
      category: '液压缸',
      specifications: '缸径: 100mm\n行程: 500mm\n工作压力: 25 MPa\n推力: 19.6 kN',
      features: ['高强度', '密封可靠', '使用寿命长'],
      applications: ['工程机械', '起重设备', '压力机'],
      image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
      is_featured: true,
      sort_order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '5',
      name_zh: '液压过滤器',
      name_en: 'Hydraulic Filter',
      description_zh: '高效液压过滤器，保护液压系统',
      description_en: 'High efficiency hydraulic filter, protecting hydraulic systems',
      category: '液压附件',
      specifications: '过滤精度: 10μm\n流量: 200 L/min\n工作压力: 1.6 MPa\n滤芯材质: 玻璃纤维',
      features: ['过滤精度高', '压降小', '更换方便'],
      applications: ['液压系统', '润滑系统', '冷却系统'],
      image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
      is_featured: false,
      sort_order: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  news: [
    {
      id: '1',
      title_zh: '捷瀚液压参加2024年国际液压展览会',
      title_en: 'Jiehan Hydraulic Participates in 2024 International Hydraulic Exhibition',
      content_zh: '捷瀚液压将参加2024年国际液压展览会，展示最新的液压技术和产品。我们将在展会上推出新一代高效液压泵和智能液压系统，为客户提供更优质的解决方案。',
      content_en: 'Jiehan Hydraulic will participate in the 2024 International Hydraulic Exhibition, showcasing the latest hydraulic technologies and products. We will launch new generation high-efficiency hydraulic pumps and intelligent hydraulic systems at the exhibition, providing customers with better solutions.',
      summary_zh: '捷瀚液压参加国际展览会，展示最新技术',
      summary_en: 'Jiehan Hydraulic participates in international exhibition, showcasing latest technology',
      category: '公司新闻',
      image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
      is_featured: true,
      is_published: true,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      title_zh: '捷瀚液压获得ISO9001质量管理体系认证',
      title_en: 'Jiehan Hydraulic Obtains ISO9001 Quality Management System Certification',
      content_zh: '经过严格的审核和评估，捷瀚液压成功获得ISO9001质量管理体系认证。这标志着我们在产品质量、服务水平和企业管理方面达到了国际先进标准。',
      content_en: 'After strict audit and evaluation, Jiehan Hydraulic successfully obtained ISO9001 quality management system certification. This marks that we have reached international advanced standards in product quality, service level and enterprise management.',
      summary_zh: '捷瀚液压获得ISO9001认证，质量管理达到国际标准',
      summary_en: 'Jiehan Hydraulic obtains ISO9001 certification, quality management reaches international standards',
      category: '公司新闻',
      image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
      is_featured: true,
      is_published: true,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      title_zh: '液压行业发展趋势分析',
      title_en: 'Analysis of Hydraulic Industry Development Trends',
      content_zh: '随着工业4.0的推进，液压行业正朝着智能化、高效化方向发展。数字化液压系统、节能技术和智能监控将成为未来发展的重点。',
      content_en: 'With the advancement of Industry 4.0, the hydraulic industry is developing towards intelligence and efficiency. Digital hydraulic systems, energy-saving technologies and intelligent monitoring will become the focus of future development.',
      summary_zh: '液压行业向智能化、高效化方向发展',
      summary_en: 'Hydraulic industry develops towards intelligence and efficiency',
      category: '行业新闻',
      image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
      is_featured: false,
      is_published: true,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  customer_inquiries: []
};

// 从localStorage加载数据，如果没有则使用默认数据
const loadMockData = (): { [key: string]: any[] } => {
  try {
    const stored = localStorage.getItem('mockDataStore');
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('从localStorage加载模拟数据:', parsed);
      return parsed;
    }
  } catch (error) {
    console.error('加载localStorage数据失败:', error);
  }
  
  console.log('使用默认模拟数据');
  return defaultMockData;
};

// 重置数据到默认状态
export const resetMockData = () => {
  console.log('重置模拟数据到默认状态');
  mockDataStore = { ...defaultMockData };
  saveMockData(mockDataStore);
  return mockDataStore;
};

// 保存数据到localStorage
const saveMockData = (data: { [key: string]: any[] }) => {
  try {
    localStorage.setItem('mockDataStore', JSON.stringify(data));
    console.log('数据已保存到localStorage');
  } catch (error) {
    console.error('保存到localStorage失败:', error);
  }
};

// 模拟数据存储
let mockDataStore: { [key: string]: any[] } = loadMockData();

// 创建一个模拟的supabase客户端
const createMockClient = () => ({
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      order: (column: string, options: any) => {
        console.log(`模拟查询表: ${table}，返回数据:`, mockDataStore[table] || []);
        return Promise.resolve({ 
          data: mockDataStore[table] || [], 
          error: null 
        });
      },
      eq: (column: string, value: any) => ({
        order: (orderColumn: string, options: any) => {
          const filteredData = (mockDataStore[table] || []).filter(item => item[column] === value);
          console.log(`模拟查询表: ${table}，条件: ${column}=${value}，返回数据:`, filteredData);
          return Promise.resolve({ 
            data: filteredData, 
            error: null 
          });
        }
      }),
      limit: (count: number) => ({
        order: (orderColumn: string, options: any) => {
          const limitedData = (mockDataStore[table] || []).slice(0, count);
          console.log(`模拟查询表: ${table}，限制: ${count}，返回数据:`, limitedData);
          return Promise.resolve({ 
            data: limitedData, 
            error: null 
          });
        }
      })
    }),
    insert: (data: any[]) => {
      console.log(`模拟插入到表: ${table}，数据:`, data);
      if (!mockDataStore[table]) {
        mockDataStore[table] = [];
      }
      // 为每个插入的数据添加ID和时间戳
      const newData = data.map(item => ({
        ...item,
        id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
        created_at: item.created_at || new Date().toISOString(),
        updated_at: item.updated_at || new Date().toISOString()
      }));
      mockDataStore[table].push(...newData);
      console.log(`插入后表 ${table} 的数据:`, mockDataStore[table]);
      
      // 保存到localStorage
      saveMockData(mockDataStore);
      
      // 返回支持链式调用的对象
      return {
        select: (columns: string = '*') => ({
          order: (column: string, options: any) => ({
            limit: (count: number) => {
              console.log(`模拟查询插入后的数据: ${table}，返回数据:`, newData);
              return Promise.resolve({ 
                data: newData, 
                error: null 
              });
            }
          })
        })
      };
    },
    update: (data: any) => ({
      eq: (column: string, value: any) => {
        console.log(`模拟更新表: ${table}，条件: ${column}=${value}，数据:`, data);
        if (mockDataStore[table]) {
          const index = mockDataStore[table].findIndex(item => item[column] === value);
          if (index !== -1) {
            mockDataStore[table][index] = { ...mockDataStore[table][index], ...data };
            
            // 保存到localStorage
            saveMockData(mockDataStore);
          }
        }
        return Promise.resolve({ data: data, error: null });
      }
    }),
    delete: () => ({
      eq: (column: string, value: any) => {
        console.log(`模拟删除表: ${table}，条件: ${column}=${value}`);
        if (mockDataStore[table]) {
          mockDataStore[table] = mockDataStore[table].filter(item => item[column] !== value);
          
          // 保存到localStorage
          saveMockData(mockDataStore);
        }
        return Promise.resolve({ data: null, error: null });
      }
    })
  })
});

export const supabase = useMockData ? createMockClient() : createClient(supabaseUrl, supabaseAnonKey);