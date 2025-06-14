
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Target, Package, DollarSign, X, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'goal' | 'task' | 'financial' | null;
  onAdd?: (data: any) => void;
}

const QuickAddModal: React.FC<QuickAddModalProps> = ({ isOpen, onClose, type, onAdd }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  if (!isOpen || !type) return null;

  const getModalConfig = () => {
    switch (type) {
      case 'goal':
        return {
          icon: Target,
          title: 'Add New Goal',
          color: 'text-blue-400',
          fields: ['title', 'description', 'target', 'dueDate']
        };
      case 'task':
        return {
          icon: Package,
          title: 'Add New Task',
          color: 'text-green-400',
          fields: ['title', 'description', 'dueDate']
        };
      case 'financial':
        return {
          icon: DollarSign,
          title: 'Add Financial Entry',
          color: 'text-yellow-400',
          fields: ['title', 'description', 'amount']
        };
      default:
        return { icon: Target, title: '', color: '', fields: [] };
    }
  };

  const config = getModalConfig();
  const IconComponent = config.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newData = {
      id: Date.now().toString(),
      title,
      description,
      ...(config.fields.includes('amount') && { amount: parseFloat(amount) || 0 }),
      ...(config.fields.includes('target') && { targetAmount: parseFloat(amount) || 0, currentAmount: 0 }),
      ...(config.fields.includes('dueDate') && dueDate && { dueDate }),
      ...(type === 'task' && { 
        status: 'todo' as const, 
        priority: 'medium' as const,
        project: 'General'
      }),
      ...(type === 'goal' && { 
        category: 'savings' as const,
        icon: 'target'
      }),
      ...(type === 'financial' && { 
        type: 'expense' as const,
        date: new Date().toISOString().split('T')[0],
        category: 'General'
      })
    };

    if (onAdd) {
      onAdd(newData);
    }

    toast({
      title: "Success!",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully.`,
    });

    // Reset form
    setTitle('');
    setAmount('');
    setDueDate('');
    setDescription('');
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

            {config.fields.includes('description') && (
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Description</label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description..."
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            )}
            
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
