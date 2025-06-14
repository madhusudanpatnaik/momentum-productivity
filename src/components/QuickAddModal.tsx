
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Target, Package, DollarSign, X, Calendar } from 'lucide-react';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'goal' | 'task' | 'financial' | null;
}

const QuickAddModal: React.FC<QuickAddModalProps> = ({ isOpen, onClose, type }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  if (!isOpen || !type) return null;

  const getModalConfig = () => {
    switch (type) {
      case 'goal':
        return {
          icon: Target,
          title: 'Add New Goal',
          color: 'text-blue-400',
          fields: ['title', 'target', 'dueDate']
        };
      case 'task':
        return {
          icon: Package,
          title: 'Add New Task',
          color: 'text-green-400',
          fields: ['title', 'dueDate']
        };
      case 'financial':
        return {
          icon: DollarSign,
          title: 'Add Financial Entry',
          color: 'text-yellow-400',
          fields: ['title', 'amount']
        };
      default:
        return { icon: Target, title: '', color: '', fields: [] };
    }
  };

  const config = getModalConfig();
  const IconComponent = config.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitting:', { type, title, amount, dueDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-900 border-gray-800 w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconComponent className={`w-6 h-6 ${config.color}`} />
              <CardTitle className="text-white">{config.title}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Enter ${type} title...`}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            
            {config.fields.includes('amount') && (
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            )}
            
            {config.fields.includes('target') && (
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Target Amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter target amount..."
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            )}
            
            {config.fields.includes('dueDate') && (
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Due Date</label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            )}
            
            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickAddModal;
