import React from 'react';
import {
  Wrench,
  Zap,
  Hammer,
  HardHat,
  Paintbrush,
  Axe,
  Layers,
  Flame,
  Sparkles,
  Briefcase
} from 'lucide-react';

interface TradeIconProps {
  iconName: string;
  className?: string;
  size?: number;
}

export const TradeIcon: React.FC<TradeIconProps> = ({ iconName, className = 'w-6 h-6', size = 24 }) => {
  switch (iconName) {
    case 'Wrench':
      return <Wrench className={className} size={size} />;
    case 'Zap':
      return <Zap className={className} size={size} />;
    case 'Hammer':
      return <Hammer className={className} size={size} />;
    case 'HardHat':
      return <HardHat className={className} size={size} />;
    case 'Paintbrush':
      return <Paintbrush className={className} size={size} />;
    case 'Axe':
      return <Axe className={className} size={size} />;
    case 'Layers':
      return <Layers className={className} size={size} />;
    case 'Flame':
      return <Flame className={className} size={size} />;
    case 'Sparkles':
      return <Sparkles className={className} size={size} />;
    default:
      return <Briefcase className={className} size={size} />;
  }
};
