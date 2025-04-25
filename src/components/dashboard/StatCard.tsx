
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  change?: {
    value: string;
    positive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBgColor,
  change,
}) => {
  return (
    <div className="stat-card">
      <div className={cn('stat-icon', iconBgColor)}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold mb-1">{value}</p>
        {change && (
          <p className={cn(
            'text-xs flex items-center',
            change.positive ? 'text-green-600' : 'text-red-600'
          )}>
            {change.positive ? '↑' : '↓'} {change.value}
            <span className="text-gray-500 ml-1">vs last month</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
