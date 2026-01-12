import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  count: number;
  accentColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  percentage?: number;
}

function MetricCard({ label, count, accentColor, trend, percentage }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden hover:shadow-md transition-shadow">
      <div className={`h-1.5 ${accentColor}`} />
      <div className="p-5">
        <div className="text-sm text-[#4B5563] mb-2">{label}</div>
        <div className="flex items-end justify-between">
          <div className="text-3xl text-[#1F2937]">{count}</div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
        {percentage !== undefined && (
          <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between text-xs text-[#6B7280] mb-1">
              <span>Progress</span>
              <span>{percentage}%</span>
            </div>
            <div className="w-full bg-[#F3F4F6] rounded-full h-1.5">
              <div 
                className={`${accentColor} h-1.5 rounded-full transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function SummaryMetrics() {
  const totalClusters = 8;
  const fullClusters = 3;
  const assignedClusters = 3;
  const draftClusters = 2;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <MetricCard 
        label="Total Clusters" 
        count={totalClusters} 
        accentColor="bg-[#3B82F6]"
        trend={{ value: 14, isPositive: true }}
      />
      <MetricCard 
        label="Full" 
        count={fullClusters} 
        accentColor="bg-[#FFBC3A]"
        percentage={Math.round((fullClusters / totalClusters) * 100)}
      />
      <MetricCard 
        label="Assigned" 
        count={assignedClusters} 
        accentColor="bg-[#FF8500]"
        percentage={Math.round((assignedClusters / totalClusters) * 100)}
      />
      <MetricCard 
        label="Draft" 
        count={draftClusters} 
        accentColor="bg-[#6B7280]"
        percentage={Math.round((draftClusters / totalClusters) * 100)}
      />
    </div>
  );
}