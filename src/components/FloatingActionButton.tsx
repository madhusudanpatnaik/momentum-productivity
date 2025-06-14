
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Target, Package, DollarSign } from 'lucide-react';
import QuickAddModal from './QuickAddModal';

const FloatingActionButton: React.FC = () => {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [modalType, setModalType] = useState<'goal' | 'task' | 'financial' | null>(null);

  const handleQuickAdd = (type: 'goal' | 'task' | 'financial') => {
    setModalType(type);
    setShowQuickAdd(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          onClick={() => setShowQuickAdd(!showQuickAdd)}
          className="bg-blue-600 hover:bg-blue-700 rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-110"
        >
          <Plus className={`w-6 h-6 transition-transform duration-300 ${showQuickAdd ? 'rotate-45' : ''}`} />
        </Button>
        
        {showQuickAdd && (
          <div className="absolute bottom-16 right-0 bg-gray-900 border border-gray-700 rounded-lg p-4 min-w-48 shadow-xl animate-fade-in">
            <h3 className="text-white font-medium mb-3">Quick Add</h3>
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => handleQuickAdd('goal')}
              >
                <Target className="w-4 h-4 mr-2" />
                New Goal
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => handleQuickAdd('task')}
              >
                <Package className="w-4 h-4 mr-2" />
                New Task
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => handleQuickAdd('financial')}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Financial Entry
              </Button>
            </div>
          </div>
        )}
      </div>

      <QuickAddModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType}
      />
    </>
  );
};

export default FloatingActionButton;
