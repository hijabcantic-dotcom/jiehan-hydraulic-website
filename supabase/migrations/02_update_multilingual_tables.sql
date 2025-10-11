-- 更新表结构以支持多语言和新的字段要求

-- 更新新闻文章表，添加多语言支持
ALTER TABLE news_articles 
ADD COLUMN IF NOT EXISTS title_zh text,
ADD COLUMN IF NOT EXISTS title_en text,
ADD COLUMN IF NOT EXISTS content_zh text,
ADD COLUMN IF NOT EXISTS content_en text,
ADD COLUMN IF NOT EXISTS summary_zh text,
ADD COLUMN IF NOT EXISTS summary_en text,
ADD COLUMN IF NOT EXISTS image_description text,
ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS published_at timestamptz;

-- 更新产品表，添加多语言支持
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS name_zh text,
ADD COLUMN IF NOT EXISTS name_en text,
ADD COLUMN IF NOT EXISTS description_zh text,
ADD COLUMN IF NOT EXISTS description_en text,
ADD COLUMN IF NOT EXISTS features text,
ADD COLUMN IF NOT EXISTS applications text,
ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- 为产品表添加更新时间触发器
CREATE TRIGGER IF NOT EXISTS update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 更新客户咨询表，添加新字段
ALTER TABLE customer_inquiries 
ADD COLUMN IF NOT EXISTS inquiry_type text DEFAULT 'general' CHECK (inquiry_type IN ('consultation', 'general'));

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_news_articles_published ON news_articles(published, published_at);
CREATE INDEX IF NOT EXISTS idx_news_articles_featured ON news_articles(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_customer_inquiries_created_at ON customer_inquiries(created_at);

-- 更新现有数据，设置多语言字段
UPDATE news_articles SET 
  title_zh = title,
  content_zh = content,
  summary_zh = summary,
  published_at = created_at,
  is_featured = false
WHERE title_zh IS NULL;

UPDATE products SET 
  name_zh = name,
  description_zh = description,
  is_featured = featured,
  updated_at = created_at
WHERE name_zh IS NULL;

-- 删除旧的字段（如果存在）
-- ALTER TABLE news_articles DROP COLUMN IF EXISTS title;
-- ALTER TABLE news_articles DROP COLUMN IF EXISTS content;
-- ALTER TABLE news_articles DROP COLUMN IF EXISTS summary;
-- ALTER TABLE news_articles DROP COLUMN IF EXISTS published;
-- ALTER TABLE products DROP COLUMN IF EXISTS featured;
