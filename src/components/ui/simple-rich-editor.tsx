import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from './button';
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo } from 'lucide-react';

interface SimpleRichEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const SimpleRichEditor: React.FC<SimpleRichEditorProps> = ({
  content,
  onChange,
  placeholder = '请输入内容...',
  className = ''
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
        placeholder,
      },
    },
  }, [content, onChange]);

  if (!editor) {
    return <div className="p-4 border rounded-lg bg-gray-50">Loading editor...</div>;
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    children, 
    title 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    children: React.ReactNode; 
    title: string;
  }) => (
    <Button
      type="button"
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      title={title}
      className="h-8 w-8 p-0"
    >
      {children}
    </Button>
  );

  return (
    <div className={`border rounded-lg ${className}`}>
      {/* 工具栏 */}
      <div className="border-b p-2 flex flex-wrap gap-1">
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
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="撤销"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="重做"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </div>
      
      {/* 编辑器内容 */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default SimpleRichEditor;

