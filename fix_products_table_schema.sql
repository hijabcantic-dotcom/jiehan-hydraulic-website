-- 修复 products 表结构，添加缺失的列
-- 这个脚本用于确保 products 表包含所有必要的列

-- 添加 model 列
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS model VARCHAR(50);

-- 添加多语言字段
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS name_zh VARCHAR(255);

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS name_en VARCHAR(255);

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS description_zh TEXT;

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS description_en TEXT;

-- 添加其他可能缺失的字段
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS features TEXT[];

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS applications TEXT[];

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- 添加注释
COMMENT ON COLUMN products.model IS '产品型号';
COMMENT ON COLUMN products.name_zh IS '产品名称（中文）';
COMMENT ON COLUMN products.name_en IS '产品名称（英文）';
COMMENT ON COLUMN products.description_zh IS '产品描述（中文）';
COMMENT ON COLUMN products.description_en IS '产品描述（英文）';
COMMENT ON COLUMN products.features IS '产品特点';
COMMENT ON COLUMN products.applications IS '应用场景';
COMMENT ON COLUMN products.sort_order IS '排序顺序';

-- 验证所有列是否添加成功
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;
