import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon, Edit3 } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  value?: string;
  description?: string;
  onChange: (imageUrl: string, description: string) => void;
  onRemove?: () => void;
  placeholder?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  description = '',
  onChange,
  onRemove,
  placeholder = '点击上传图片',
  className = ''
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageDescription, setImageDescription] = useState(description);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
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
      // 创建FormData
      const formData = new FormData();
      formData.append('image', file);

      // 这里使用模拟上传，实际项目中应该上传到真实的服务器
      // 为了演示，我们使用base64编码
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        onChange(base64, imageDescription);
        setIsUploading(false);
        toast.success('图片上传成功');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('图片上传失败');
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDescriptionChange = (newDescription: string) => {
    setImageDescription(newDescription);
    if (value) {
      onChange(value, newDescription);
    }
  };

  const handleRemove = () => {
    setImageDescription('');
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <Label>图片上传</Label>
        <div className="mt-2">
          {value ? (
            <Card className="relative group">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={value}
                      alt="上传的图片"
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        已上传图片
                      </span>
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Edit3 className="h-4 w-4 mr-1" />
                          更换
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleRemove}
                        >
                          <X className="h-4 w-4 mr-1" />
                          删除
                        </Button>
                      </div>
                    </div>
                    
                    {/* 图片描述编辑 */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">图片描述 (alt属性)</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsEditingDescription(!isEditingDescription)}
                        >
                          {isEditingDescription ? '完成' : '编辑'}
                        </Button>
                      </div>
                      
                      {isEditingDescription ? (
                        <Input
                          value={imageDescription}
                          onChange={(e) => handleDescriptionChange(e.target.value)}
                          placeholder="输入图片描述，用于SEO和可访问性"
                          className="text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {imageDescription || '未设置描述'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {isUploading ? '上传中...' : placeholder}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  支持 JPG, PNG, GIF 格式，最大 5MB
                </p>
              </div>
            </div>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUpload;

