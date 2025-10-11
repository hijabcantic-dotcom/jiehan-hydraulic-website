import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string, description?: string) => void;
  currentImageUrl?: string;
  currentDescription?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  currentImageUrl,
  currentDescription
}) => {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [description, setDescription] = useState(currentDescription || '');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    // 验证文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('图片文件大小不能超过5MB');
      return;
    }

    setUploading(true);

    try {
      // 创建预览
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);

      // 模拟上传到服务器 (这里使用base64作为URL)
      // 在实际项目中，您需要上传到真实的文件服务器
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });

      onImageUpload(base64, description);
    } catch (error) {
      console.error('图片上传失败:', error);
      alert('图片上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setDescription('');
    onImageUpload('', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
    if (preview) {
      onImageUpload(preview, newDescription);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="image-upload">上传封面图</Label>
        <div className="mt-2">
          <input
            ref={fileInputRef}
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? '上传中...' : '选择图片文件'}
          </Button>
        </div>
      </div>

      {preview && (
        <div className="space-y-3">
          <div className="relative">
            <img
              src={preview}
              alt="预览"
              className="w-full h-48 object-cover rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor="image-description">图片描述 (alt属性)</Label>
            <Input
              id="image-description"
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="为图片添加描述，用于SEO优化..."
              className="mt-1"
            />
          </div>
        </div>
      )}

      {!preview && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">点击上方按钮选择图片</p>
          <p className="text-sm text-gray-400 mt-1">支持 JPG, PNG, GIF 格式，最大5MB</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
