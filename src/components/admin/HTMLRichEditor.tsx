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
  Redo,
  Trash2,
  FileText
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
    
    // 尝试获取HTML内容
    const htmlData = e.clipboardData.getData('text/html');
    const textData = e.clipboardData.getData('text/plain');
    
    if (htmlData) {
      // 如果有HTML内容，清理并插入
      const cleanHtml = cleanPastedHtml(htmlData);
      document.execCommand('insertHTML', false, cleanHtml);
    } else if (textData) {
      // 如果没有HTML内容，插入纯文本
      document.execCommand('insertText', false, textData);
    }
    
    updateContent();
  };

  // 清理粘贴的HTML，保留有用的格式标签
  const cleanPastedHtml = (html: string): string => {
    // 创建一个临时div来解析HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // 允许的HTML标签
    const allowedTags = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'div', 'span', 'br',
      'strong', 'b', 'em', 'i', 'u',
      'ul', 'ol', 'li',
      'blockquote',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ];
    
    // 允许的CSS属性
    const allowedAttributes = [
      'href', 'src', 'alt', 'title',
      'style', 'class', 'id',
      'colspan', 'rowspan'
    ];
    
    // 递归清理函数
    const cleanElement = (element: Element): Element => {
      const tagName = element.tagName.toLowerCase();
      
      // 如果标签不在允许列表中，替换为span
      if (!allowedTags.includes(tagName)) {
        const span = document.createElement('span');
        span.innerHTML = element.innerHTML;
        return span;
      }
      
      // 创建新的清理后的元素
      const cleanElement = document.createElement(tagName);
      
      // 复制允许的属性
      for (const attr of allowedAttributes) {
        if (element.hasAttribute(attr)) {
          let attrValue = element.getAttribute(attr);
          
          // 清理style属性，只保留安全的CSS属性
          if (attr === 'style' && attrValue) {
            attrValue = cleanStyles(attrValue);
          }
          
          if (attrValue) {
            cleanElement.setAttribute(attr, attrValue);
          }
        }
      }
      
      // 递归处理子元素
      for (const child of Array.from(element.childNodes)) {
        if (child.nodeType === Node.TEXT_NODE) {
          cleanElement.appendChild(child.cloneNode());
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          cleanElement.appendChild(cleanElement(child as Element));
        }
      }
      
      return cleanElement;
    };
    
    // 清理所有子元素
    const cleanedDiv = document.createElement('div');
    for (const child of Array.from(tempDiv.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        cleanedDiv.appendChild(child.cloneNode());
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        cleanedDiv.appendChild(cleanElement(child as Element));
      }
    }
    
    return cleanedDiv.innerHTML;
  };

  // 清理CSS样式，只保留安全的样式
  const cleanStyles = (styleString: string): string => {
    const allowedStyles = [
      'color', 'background-color', 'font-size', 'font-weight', 'font-style',
      'text-align', 'text-decoration', 'margin', 'padding', 'border',
      'width', 'height', 'max-width', 'max-height'
    ];
    
    const styles = styleString.split(';');
    const cleanStyles = styles.filter(style => {
      const [property] = style.split(':');
      return allowedStyles.includes(property.trim().toLowerCase());
    });
    
    return cleanStyles.join(';');
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

  // 清除选中文本的格式
  const clearFormat = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('removeFormat', false);
      updateContent();
    }
  };

  // 转换为纯文本
  const convertToPlainText = () => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        
        if (selectedText) {
          // 如果有选中文本，替换为纯文本
          range.deleteContents();
          range.insertNode(document.createTextNode(selectedText));
        } else {
          // 如果没有选中文本，转换整个编辑器内容
          const plainText = editorRef.current.textContent || '';
          editorRef.current.innerHTML = plainText;
        }
        updateContent();
      }
    }
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
        <div className="flex border-r border-gray-300 pr-2 mr-2">
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

        {/* 格式清理 */}
        <div className="flex">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearFormat}
            title="清除格式"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={convertToPlainText}
            title="转换为纯文本"
          >
            <FileText className="h-4 w-4" />
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
      
      {/* 内联样式确保粘贴的HTML格式正确显示 */}
      <style jsx>{`
        [contenteditable] h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
          line-height: 1.2;
        }
        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.8rem 0;
          line-height: 1.3;
        }
        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.6rem 0;
          line-height: 1.4;
        }
        [contenteditable] h4 {
          font-size: 1.1rem;
          font-weight: bold;
          margin: 0.5rem 0;
          line-height: 1.4;
        }
        [contenteditable] h5 {
          font-size: 1rem;
          font-weight: bold;
          margin: 0.4rem 0;
          line-height: 1.5;
        }
        [contenteditable] h6 {
          font-size: 0.9rem;
          font-weight: bold;
          margin: 0.3rem 0;
          line-height: 1.5;
        }
        [contenteditable] p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        [contenteditable] ul, [contenteditable] ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        [contenteditable] li {
          margin: 0.2rem 0;
          line-height: 1.5;
        }
        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        [contenteditable] strong, [contenteditable] b {
          font-weight: bold;
        }
        [contenteditable] em, [contenteditable] i {
          font-style: italic;
        }
        [contenteditable] u {
          text-decoration: underline;
        }
        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }
        [contenteditable] a:hover {
          color: #1d4ed8;
        }
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 0.5rem 0;
        }
        [contenteditable] table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        [contenteditable] th, [contenteditable] td {
          border: 1px solid #d1d5db;
          padding: 0.5rem;
          text-align: left;
        }
        [contenteditable] th {
          background-color: #f9fafb;
          font-weight: bold;
        }
      `}</style>

      {/* 字符统计 */}
      <div className="border-t border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-600">
        字符数: {getCharacterCount()} | 字数: {getWordCount()}
      </div>
    </div>
  );
};

export default HTMLRichEditor;
