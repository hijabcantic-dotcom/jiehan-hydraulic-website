-- 检查当前的RLS策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename IN ('news_articles', 'products', 'customer_inquiries')
ORDER BY tablename, policyname;

-- 删除可能存在的旧策略（如果存在）
DROP POLICY IF EXISTS "Allow public to delete news_articles" ON public.news_articles;
DROP POLICY IF EXISTS "Allow public to delete products" ON public.products;
DROP POLICY IF EXISTS "Allow public to delete customer_inquiries" ON public.customer_inquiries;

-- 为news_articles表添加DELETE权限
CREATE POLICY "Allow public to delete news_articles" ON public.news_articles
FOR DELETE TO public
USING (true);

-- 为products表添加DELETE权限  
CREATE POLICY "Allow public to delete products" ON public.products
FOR DELETE TO public
USING (true);

-- 为customer_inquiries表添加DELETE权限
CREATE POLICY "Allow public to delete customer_inquiries" ON public.customer_inquiries
FOR DELETE TO public
USING (true);

-- 再次检查策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename IN ('news_articles', 'products', 'customer_inquiries')
ORDER BY tablename, policyname;
