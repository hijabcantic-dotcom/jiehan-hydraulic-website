-- 为 products 表添加 model 列
-- 这个脚本用于修复数据库中缺少 model 列的问题

-- 添加 model 列到 products 表
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS model VARCHAR(50);

-- 添加注释
COMMENT ON COLUMN products.model IS '产品型号';

-- 验证列是否添加成功
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'model';
