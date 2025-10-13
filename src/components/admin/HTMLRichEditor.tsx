import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote,
  Link,
  Image,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo
} from 'lucide-react';

interface HTMLRichEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const HTMLRichEditor: React.FC<HTMLRichEditorProps> = ({ 
  content, 
  onChange, 
  placeholder = '开始编写内容...' 
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const execCommand = (command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      updateContent();
    }
  };

  const applyHeading = (level: number) => {
    if (editorRef.current) {
      editorRef.current.focus();
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        
        if (selectedText) {
          // 如果有选中文本，替换为标题
          const heading = document.createElement(`h${level}`);
          heading.textContent = selectedText;
          range.deleteContents();
          range.insertNode(heading);
        } else {
          // 如果没有选中文本，插入标题标签
          const heading = document.createElement(`h${level}`);
          heading.innerHTML = '标题文本';
          range.insertNode(heading);
        }
        updateContent();
      }
    }
  };

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyUp = () => {
    updateContent();
  };

  const handleCompositionStart = () => {
    // 中文输入法开始
  };

  const handleCompositionEnd = () => {
    // 中文输入法结束，更新内容
    setTimeout(() => {
      updateContent();
    }, 0);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    updateContent();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 处理Tab键
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '    ');
      updateContent();
    }
    // 处理回车键 - 确保能正常换行
    if (e.key === 'Enter') {
      // 不阻止默认行为，让浏览器自然处理换行
      setTimeout(() => {
        updateContent();
      }, 0);
    }
  };

  const addLink = () => {
    const url = window.prompt('请输入链接URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const addImage = () => {
    const url = window.prompt('请输入图片URL:');
    if (url) {
      const img = `<img src="${url}" alt="图片" style="max-width: 100%; height: auto; border-radius: 0.5rem; margin: 0.5rem 0;" />`;
      document.execCommand('insertHTML', false, img);
      updateContent();
    }
  };

  const getCharacterCount = () => {
    if (editorRef.current) {
      const text = editorRef.current.textContent || '';
      return text.length;
    }
    return 0;
  };

  const getWordCount = () => {
    if (editorRef.current) {
      const text = editorRef.current.textContent || '';
      return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    }
    return 0;
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* 工具栏 */}
      <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-1">
        {/* 撤销/重做 */}
        <div className="flex border-r border-gray-300 pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('undo')}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('redo')}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        {/* 文本格式 */}
        <div className="flex border-r border-gray-300 pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              execCommand('bold');
              setIsBold(!isBold);
            }}
            className={isBold ? 'bg-blue-100' : ''}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              execCommand('italic');
              setIsItalic(!isItalic);
            }}
            className={isItalic ? 'bg-blue-100' : ''}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              execCommand('underline');
              setIsUnderline(!isUnderline);
            }}
            className={isUnderline ? 'bg-blue-100' : ''}
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        {/* 标题 */}
        <div className="flex border-r border-gray-300 pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyHeading(1)}
          >
            <Type className="h-4 w-4" />
            H1
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyHeading(2)}
          >
            <Type className="h-4 w-4" />
            H2
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyHeading(3)}
          >
            <Type className="h-4 w-4" />
            H3
          </Button>
        </div>

        {/* 列表 */}
        <div className="flex border-r border-gray-300 pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('insertUnorderedList')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('insertOrderedList')}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('formatBlock', 'blockquote')}
          >
            <Quote className="h-4 w-4" />
          </Button>
        </div>

        {/* 对齐 */}
        <div className="flex border-r border-gray-300 pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyLeft')}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyCenter')}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyRight')}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        {/* 链接和图片 */}
        <div className="flex">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addLink}
          >
            <Link className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addImage}
          >
            <Image className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 编辑器内容 */}
      <div 
        ref={editorRef}
        contentEditable
        className="min-h-[300px] max-h-[600px] overflow-y-auto p-4 focus:outline-none prose prose-sm max-w-none"
        onInput={updateContent}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        data-placeholder={placeholder}
        style={{ 
          minHeight: '300px',
          outline: 'none',
          border: 'none',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap'
        }}
      />

      {/* 字符统计 */}
      <div className="border-t border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-600">
        字符数: {getCharacterCount()} | 字数: {getWordCount()}
      </div>
    </div>
  );
};

export default HTMLRichEditor;
