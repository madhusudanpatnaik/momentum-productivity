
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Heart, Zap } from 'lucide-react';

interface ModeToggleProps {
  currentMode: 'work' | 'personal';
  onModeChange: (mode: 'work' | 'personal') => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ currentMode, onModeChange }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleModeChange = (mode: 'work' | 'personal') => {
    if (mode !== currentMode) {
      setIsAnimating(true);
      setTimeout(() => {
        onModeChange(mode);
        setIsAnimating(false);
      }, 200);
    }
  };

  return (
    <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
      <Button
        variant={currentMode === 'work' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleModeChange('work')}
        className={`relative flex items-center space-x-2 transition-all duration-200 ${
          currentMode === 'work' 
            ? 'bg-white text-gray-900 hover:bg-gray-100' 
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        } ${isAnimating && currentMode === 'work' ? 'animate-pulse' : ''}`}
      >
        <Briefcase className="w-4 h-4" />
        <span>Work</span>
        {currentMode === 'work' && (
          <Badge className="bg-blue-500 text-white text-xs ml-1">
            <Zap className="w-3 h-3" />
          </Badge>
        )}
      </Button>
      
      <Button
        variant={currentMode === 'personal' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleModeChange('personal')}
        className={`relative flex items-center space-x-2 transition-all duration-200 ${
          currentMode === 'personal' 
            ? 'bg-white text-gray-900 hover:bg-gray-100' 
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        } ${isAnimating && currentMode === 'personal' ? 'animate-pulse' : ''}`}
      >
        <Heart className="w-4 h-4" />
        <span>Personal</span>
        {currentMode === 'personal' && (
          <Badge className="bg-green-500 text-white text-xs ml-1">
            <Zap className="w-3 h-3" />
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default ModeToggle;
