-- 添加 model 列到 products 表
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS model VARCHAR(50);

-- 验证 model 列是否添加成功
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'model';
