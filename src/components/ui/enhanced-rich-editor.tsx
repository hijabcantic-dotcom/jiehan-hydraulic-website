import React, { useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Palette,
  Upload,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedRichEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const EnhancedRichEditor: React.FC<EnhancedRichEditorProps> = ({
  content,
  onChange,
  placeholder = '请输入内容...',
  className = ''
}) => {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
        placeholder,
      },
    },
  }, [content, onChange]);

  if (!editor) {
    return <div className="p-4 border rounded-lg bg-gray-50">Loading editor...</div>;
  }

  const addLink = () => {
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);
    setLinkText(selectedText);
    setIsLinkDialogOpen(true);
  };

  const insertLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      if (linkText && !editor.state.selection.empty) {
        editor.chain().focus().insertContent(linkText).run();
      }
      setIsLinkDialogOpen(false);
      setLinkUrl('');
      setLinkText('');
    }
  };

  const addImage = () => {
    setIsImageDialogOpen(true);
  };

  const insertImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ 
        src: imageUrl, 
        alt: imageAlt || '图片' 
      }).run();
      setIsImageDialogOpen(false);
      setImageUrl('');
      setImageAlt('');
    }
  };

  const handleImageUpload = async (file: File) => {
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

    setIsUploadingImage(true);

    try {
      // 转换为base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setImageUrl(base64);
        if (!imageAlt) {
          setImageAlt(file.name.replace(/\.[^/.]+$/, ''));
        }
        setIsUploadingImage(false);
        toast.success('图片上传成功');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('图片上传失败');
      setIsUploadingImage(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    children, 
    title,
    disabled = false
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    children: React.ReactNode; 
    title: string;
    disabled?: boolean;
  }) => (
    <Button
      type="button"
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      title={title}
      className="h-8 w-8 p-0"
      disabled={disabled}
    >
      {children}
    </Button>
  );

  const ToolbarSeparator = () => (
    <div className="w-px h-6 bg-gray-300 mx-1" />
  );

  return (
    <div className={`border rounded-lg ${className}`}>
      {/* 工具栏 */}
      <div className="border-b p-2 flex flex-wrap gap-1">
        {/* 标题 */}
        <div className="flex gap-1 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="一级标题"
          >
            <Heading1 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="二级标题"
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="三级标题"
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <ToolbarSeparator />

        {/* 文本格式 */}
        <div className="flex gap-1 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="粗体"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="斜体"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="下划线"
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="删除线"
          >
            <Strikethrough className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            title="代码"
          >
            <Code className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <ToolbarSeparator />

        {/* 对齐 */}
        <div className="flex gap-1 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="左对齐"
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="居中对齐"
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="右对齐"
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
            title="两端对齐"
          >
            <AlignJustify className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <ToolbarSeparator />

        {/* 列表 */}
        <div className="flex gap-1 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="无序列表"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="有序列表"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="引用"
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <ToolbarSeparator />

        {/* 链接和图片 */}
        <div className="flex gap-1 mr-2">
          <ToolbarButton
            onClick={addLink}
            isActive={editor.isActive('link')}
            title="添加链接"
          >
            <LinkIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={addImage}
            title="添加图片"
          >
            <ImageIcon className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <ToolbarSeparator />

        {/* 撤销重做 */}
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="撤销"
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="重做"
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* 编辑器内容 */}
      <div className="min-h-[300px] max-h-[500px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      {/* 链接对话框 */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加链接</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="linkUrl">链接地址</Label>
              <Input
                id="linkUrl"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="linkText">链接文本</Label>
              <Input
                id="linkText"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="链接显示文本"
                className="mt-1"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsLinkDialogOpen(false)}
              >
                取消
              </Button>
              <Button onClick={insertLink}>
                添加链接
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 图片对话框 */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加图片</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>上传图片</Label>
              <div className="mt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploadingImage ? '上传中...' : '选择图片文件'}
                </Button>
                <p className="text-xs text-gray-500 mt-1">
                  支持 JPG, PNG, GIF 格式，最大 5MB
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="imageUrl">图片地址</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="或直接输入图片URL"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="imageAlt">图片描述 (alt属性)</Label>
              <Input
                id="imageAlt"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="图片描述，用于SEO和可访问性"
                className="mt-1"
              />
            </div>

            {imageUrl && (
              <div className="mt-4">
                <Label>预览</Label>
                <div className="mt-2 border rounded-lg p-4">
                  <img
                    src={imageUrl}
                    alt={imageAlt || '图片预览'}
                    className="max-w-full h-auto max-h-48 rounded"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsImageDialogOpen(false);
                  setImageUrl('');
                  setImageAlt('');
                }}
              >
                取消
              </Button>
              <Button 
                onClick={insertImage}
                disabled={!imageUrl}
              >
                插入图片
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedRichEditor;
