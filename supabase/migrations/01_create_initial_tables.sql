/*
# 创建捷瀚液压官网数据表

## 1. 功能概述
为捷瀚液压官网创建必要的数据表，支持客户咨询表单收集、新闻管理、产品展示等功能。

## 2. 表结构设计

### 2.1 客户咨询表 (customer_inquiries)
- `id` (uuid, 主键, 默认: gen_random_uuid())
- `name` (text, 客户姓名, 必填)
- `company` (text, 公司名称, 可选)
- `phone` (text, 联系电话, 必填)
- `email` (text, 邮箱地址, 可选)
- `product_interest` (text, 感兴趣的产品类型, 可选)
- `message` (text, 详细需求描述, 可选)
- `inquiry_type` (text, 咨询类型: 'consultation'(一对一咨询) 或 'general'(一般咨询), 默认: 'general')
- `status` (text, 处理状态: 'pending'(待处理), 'processing'(处理中), 'completed'(已完成), 默认: 'pending')
- `created_at` (timestamptz, 创建时间, 默认: now())

### 2.2 新闻文章表 (news_articles)
- `id` (uuid, 主键, 默认: gen_random_uuid())
- `title` (text, 文章标题, 必填)
- `content` (text, 文章内容, 必填)
- `summary` (text, 文章摘要, 可选)
- `category` (text, 文章分类: 'company'(公司动态), 'industry'(行业新闻), 'product'(产品资讯), 默认: 'company')
- `image_url` (text, 封面图片URL, 可选)
- `published` (boolean, 是否发布, 默认: true)
- `created_at` (timestamptz, 创建时间, 默认: now())
- `updated_at` (timestamptz, 更新时间, 默认: now())

### 2.3 产品信息表 (products)
- `id` (uuid, 主键, 默认: gen_random_uuid())
- `name` (text, 产品名称, 必填)
- `model` (text, 产品型号, 必填)
- `category` (text, 产品分类: 'pump'(液压泵), 'valve'(液压阀), 'cylinder'(液压缸), 'accessory'(液压附件))
- `description` (text, 产品描述, 可选)
- `specifications` (jsonb, 技术参数, 可选)
- `image_url` (text, 产品图片URL, 可选)
- `datasheet_url` (text, 技术资料下载链接, 可选)
- `applications` (text[], 应用场景数组, 可选)
- `featured` (boolean, 是否为推荐产品, 默认: false)
- `created_at` (timestamptz, 创建时间, 默认: now())

## 3. 安全策略
- 所有表均为公开访问，不启用RLS
- 客户可以提交咨询表单
- 所有用户可以查看新闻和产品信息

## 4. 初始数据
包含示例新闻文章和产品数据，确保网站有内容展示。
*/

-- 创建客户咨询表
CREATE TABLE IF NOT EXISTS customer_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  phone text NOT NULL,
  email text,
  product_interest text,
  message text,
  inquiry_type text DEFAULT 'general' CHECK (inquiry_type IN ('consultation', 'general')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- 创建新闻文章表
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  summary text,
  category text DEFAULT 'company' CHECK (category IN ('company', 'industry', 'product')),
  image_url text,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建产品信息表
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  model text NOT NULL,
  category text NOT NULL CHECK (category IN ('pump', 'valve', 'cylinder', 'accessory')),
  description text,
  specifications jsonb,
  image_url text,
  datasheet_url text,
  applications text[],
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 为新闻表添加更新时间触发器
CREATE TRIGGER update_news_articles_updated_at 
  BEFORE UPDATE ON news_articles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入示例新闻数据
INSERT INTO news_articles (title, content, summary, category, image_url) VALUES
('捷瀚液压荣获ISO9001-2015质量管理体系认证', 
 '近日，捷瀚液压正式通过ISO9001-2015质量管理体系认证，这标志着公司在质量管理方面达到了国际先进水平。此次认证的通过，不仅体现了捷瀚液压在产品质量控制、生产流程管理等方面的卓越表现，更是对公司多年来坚持质量第一理念的有力证明。

ISO9001-2015是国际标准化组织制定的质量管理体系标准，代表了当今世界质量管理的最高水平。捷瀚液压能够通过这一严格的认证，充分说明了公司在质量管理体系建设方面的成熟度和专业性。

未来，捷瀚液压将继续秉承"质量第一、客户至上"的经营理念，不断完善质量管理体系，为客户提供更加优质的液压产品和服务。', 
 '捷瀚液压通过ISO9001-2015质量管理体系认证，质量管理达到国际先进水平', 
 'company', 
 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop'),

('液压行业迎来智能化转型新机遇', 
 '随着工业4.0时代的到来，液压行业正迎来前所未有的智能化转型机遇。智能液压系统通过集成传感器、控制器和通信技术，实现了设备的远程监控、预测性维护和自适应控制。

在这一趋势下，传统液压设备制造商纷纷加大研发投入，推出具有智能化功能的新产品。智能液压泵能够根据工况自动调节流量和压力，大幅提升系统效率；智能液压阀通过精确控制，实现更加平稳的动作响应。

捷瀚液压作为行业领先企业，积极拥抱智能化趋势，不断推出具有智能化特征的液压产品，为客户提供更加高效、可靠的解决方案。', 
 '液压行业智能化转型带来新机遇，智能液压系统成为发展趋势', 
 'industry', 
 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop'),

('HGP-3A系列齿轮泵全新升级上市', 
 '经过精心研发和严格测试，捷瀚液压HGP-3A系列齿轮泵全新升级版正式上市。新版本在保持原有优异性能的基础上，进一步提升了产品的可靠性和使用寿命。

升级亮点包括：
1. 采用新型密封技术，有效提升密封性能，延长使用寿命
2. 优化齿轮设计，降低噪音水平，提升工作环境舒适度  
3. 改进材料配方，增强耐磨性和抗腐蚀能力
4. 扩展温度适应范围，适用于更多恶劣工况

HGP-3A系列齿轮泵广泛应用于工程机械、农业机械、工业设备等领域，是客户信赖的优质选择。', 
 'HGP-3A系列齿轮泵全新升级，性能和可靠性全面提升', 
 'product', 
 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop');

-- 插入示例产品数据
INSERT INTO products (name, model, category, description, specifications, image_url, applications, featured) VALUES
('单齿轮泵', 'HGP-05A', 'pump', '小型单齿轮泵，适用于低流量应用场景', 
 '{"displacement": "0.5 ml/r", "max_pressure": "25 MPa", "max_speed": "3000 rpm", "weight": "0.8 kg"}', 
 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop', 
 ARRAY['小型机械', '测试设备', '实验装置'], true),

('单齿轮泵', 'HGP-1A', 'pump', '紧凑型单齿轮泵，性能稳定可靠', 
 '{"displacement": "1.0 ml/r", "max_pressure": "25 MPa", "max_speed": "3000 rpm", "weight": "1.2 kg"}', 
 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop', 
 ARRAY['工程机械', '农业机械', '工业设备'], true),

('单齿轮泵', 'HGP-2AY', 'pump', '中等排量单齿轮泵，适用范围广泛', 
 '{"displacement": "2.0 ml/r", "max_pressure": "25 MPa", "max_speed": "2800 rpm", "weight": "1.8 kg"}', 
 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop', 
 ARRAY['液压站', '机床设备', '注塑机'], false),

('单齿轮泵', 'HGP-3A', 'pump', '高性能单齿轮泵，经典畅销型号', 
 '{"displacement": "3.0 ml/r", "max_pressure": "25 MPa", "max_speed": "2500 rpm", "weight": "2.5 kg"}', 
 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop', 
 ARRAY['挖掘机', '装载机', '起重机', '压路机'], true),

('串联齿轮泵', 'HGP-11A', 'pump', '双联齿轮泵，提供双路液压动力', 
 '{"displacement": "1.0+1.0 ml/r", "max_pressure": "25 MPa", "max_speed": "3000 rpm", "weight": "2.2 kg"}', 
 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop', 
 ARRAY['多回路系统', '复合动作机械'], false),

('同步分流器', 'DFMN-102A', 'valve', '精密同步分流器，确保多执行器同步动作', 
 '{"flow_rate": "10-20 L/min", "max_pressure": "35 MPa", "accuracy": "±2%", "weight": "1.5 kg"}', 
 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop', 
 ARRAY['双缸同步', '多点举升', '同步行走'], true),

('带溢流阀齿轮泵', 'PR1', 'pump', '集成溢流阀的齿轮泵，系统更简洁', 
 '{"displacement": "1.0 ml/r", "relief_pressure": "16 MPa", "max_speed": "3000 rpm", "weight": "1.8 kg"}', 
 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop', 
 ARRAY['简单液压系统', '移动设备'], false),

('液压缸', 'HC-50', 'cylinder', '标准液压缸，适用于各种工况', 
 '{"bore_diameter": "50 mm", "rod_diameter": "25 mm", "max_pressure": "16 MPa", "stroke": "100-500 mm"}', 
 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop', 
 ARRAY['推拉动作', '举升装置', '夹紧机构'], false);