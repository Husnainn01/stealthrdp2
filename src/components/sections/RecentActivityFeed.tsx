import React from 'react';
import { Server, Repeat, CreditCard } from 'lucide-react';

export interface Activity {
  icon: 'server' | 'repeat' | 'payment' | string;
  iconColor: 'electric' | 'cyber' | string;
  name: string;
  action: string;
  time: string;
}

interface RecentActivityFeedProps {
  activities: Activity[];
  title?: string;
}

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ 
  activities,
  title = "RECENT CUSTOMER ACTIVITY"
}) => {
  const getIcon = (iconType: string, iconColor: string) => {
    const iconClass = `h-4 w-4 text-${iconColor}`;
    
    switch(iconType) {
      case 'server':
        return <Server className={iconClass} />;
      case 'repeat':
        return <Repeat className={iconClass} />;
      case 'payment':
        return <CreditCard className={iconClass} />;
      default:
        return <Server className={iconClass} />;
    }
  };
  
  return (
    <div>
      <h4 className="text-white/80 font-medium text-sm tracking-wider mb-4">{title}</h4>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-8 h-8 flex-shrink-0 rounded bg-${activity.iconColor}/10 flex items-center justify-center`}>
              {getIcon(activity.icon, activity.iconColor)}
            </div>
            <div>
              <p className="text-white text-sm">{activity.name} {activity.action}</p>
              <p className="text-white/40 text-xs">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed; 