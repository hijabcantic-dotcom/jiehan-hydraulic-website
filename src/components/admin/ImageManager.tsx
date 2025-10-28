import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Search, 
  Image as ImageIcon, 
  Copy, 
  Trash2, 
  Edit3,
  Eye,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface ImageItem {
  id: string;
  url: string;
  description: string;
  filename: string;
  size: number;
  uploadDate: Date;
  category?: string;
}

const ImageManager: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 从localStorage加载图片数据
  useEffect(() => {
    const savedImages = localStorage.getItem('uploaded_images');
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages).map((img: any) => ({
          ...img,
          uploadDate: new Date(img.uploadDate)
        }));
        setImages(parsedImages);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    }
  }, []);

  // 保存图片数据到localStorage
  const saveImages = (newImages: ImageItem[]) => {
    setImages(newImages);
    localStorage.setItem('uploaded_images', JSON.stringify(newImages));
  };

  const handleFileUpload = async (file: File, description: string, category: string) => {
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      toast.error('请选择图片文件');
      return;
    }

    // 验证文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('图片大小不能超过5MB');
      return;
    }

    setIsUploading(true);

    try {
      // 转换为base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        const newImage: ImageItem = {
          id: Date.now().toString(),
          url: base64,
          description: description || file.name,
          filename: file.name,
          size: file.size,
          uploadDate: new Date(),
          category: category || 'general'
        };

        const updatedImages = [...images, newImage];
        saveImages(updatedImages);
        setIsUploading(false);
        setIsUploadDialogOpen(false);
        toast.success('图片上传成功');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('图片上传失败');
      setIsUploading(false);
    }
  };

  const handleDeleteImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    saveImages(updatedImages);
    toast.success('图片已删除');
  };

  const handleUpdateDescription = (id: string, newDescription: string) => {
    const updatedImages = images.map(img => 
      img.id === id ? { ...img, description: newDescription } : img
    );
    saveImages(updatedImages);
    toast.success('描述已更新');
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('图片URL已复制到剪贴板');
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredImages = images.filter(img => {
    const matchesSearch = img.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         img.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'products', 'news', 'general'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">图片管理</h2>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              上传图片
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>上传新图片</DialogTitle>
            </DialogHeader>
            <ImageUploadForm
              onSubmit={handleFileUpload}
              isUploading={isUploading}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索图片..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? '所有分类' : 
               category === 'products' ? '产品图片' :
               category === 'news' ? '新闻图片' : '其他'}
            </option>
          ))}
        </select>
      </div>

      {/* 图片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <Card key={image.id} className="group">
            <CardContent className="p-4">
              <div className="aspect-square mb-3 relative">
                <img
                  src={image.url}
                  alt={image.description}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => copyImageUrl(image.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => downloadImage(image.url, image.filename)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {image.category}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {(image.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                
                <div className="text-sm font-medium truncate">
                  {image.filename}
                </div>
                
                <div className="text-xs text-gray-600">
                  {image.description}
                </div>
                
                <div className="text-xs text-gray-400">
                  {image.uploadDate.toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">没有找到图片</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? '尝试调整搜索条件' : '开始上传您的第一张图片'}
          </p>
        </div>
      )}
    </div>
  );
};

// 图片上传表单组件
interface ImageUploadFormProps {
  onSubmit: (file: File, description: string, category: string) => void;
  isUploading: boolean;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onSubmit, isUploading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!description) {
        setDescription(selectedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit(file, description, category);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="file">选择图片文件</Label>
        <Input
          id="file"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          ref={fileInputRef}
          className="mt-1"
        />
        {file && (
          <div className="mt-2 text-sm text-gray-600">
            已选择: {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="description">图片描述</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="输入图片描述，用于SEO和可访问性"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="category">分类</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="general">其他</option>
          <option value="products">产品图片</option>
          <option value="news">新闻图片</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFile(null);
            setDescription('');
            setCategory('general');
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
        >
          重置
        </Button>
        <Button type="submit" disabled={!file || isUploading}>
          {isUploading ? '上传中...' : '上传'}
        </Button>
      </div>
    </form>
  );
};

export default ImageManager;

