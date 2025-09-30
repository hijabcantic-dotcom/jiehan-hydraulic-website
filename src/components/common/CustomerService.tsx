import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ConsultationForm from '@/components/forms/ConsultationForm';

const CustomerService: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isVisible && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
            >
              <MessageCircle className="w-8 h-8 text-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <ConsultationForm />
          </DialogContent>
        </Dialog>
      )}
      
      {/* 可关闭按钮 */}
      {isVisible && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-500 hover:bg-gray-600 text-white p-0"
        >
          <X className="w-3 h-3" />
        </Button>
      )}
      
      {/* 重新显示按钮 */}
      {!isVisible && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsVisible(true)}
          className="mb-2 text-xs"
        >
          客服
        </Button>
      )}
    </div>
  );
};

export default CustomerService;