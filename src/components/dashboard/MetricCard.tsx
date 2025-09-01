import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  variant = 'default',
  className
}: MetricCardProps) {
  const isPositiveChange = change && change > 0;
  const isNegativeChange = change && change < 0;

  return (
    <div className={cn(
      "metric-card",
      variant === 'primary' && "metric-card-primary",
      variant === 'success' && "metric-card-success", 
      variant === 'warning' && "metric-card-warning",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={cn(
            "text-sm font-medium",
            variant === 'default' ? "text-muted-foreground" : "text-current opacity-90"
          )}>
            {title}
          </p>
          <p className={cn(
            "text-3xl font-bold mt-2",
            variant === 'default' ? "text-foreground" : "text-current"
          )}>
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center mt-2 space-x-1">
              {isPositiveChange && <TrendingUp className="w-4 h-4 text-success" />}
              {isNegativeChange && <TrendingDown className="w-4 h-4 text-destructive" />}
              <span className={cn(
                "text-sm font-medium",
                isPositiveChange && "text-success",
                isNegativeChange && "text-destructive",
                !isPositiveChange && !isNegativeChange && "text-muted-foreground"
              )}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className={cn(
                  "text-sm",
                  variant === 'default' ? "text-muted-foreground" : "text-current opacity-75"
                )}>
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className={cn(
            "p-3 rounded-lg",
            variant === 'default' && "bg-muted",
            variant !== 'default' && "bg-white/20"
          )}>
            <div className={cn(
              "w-6 h-6",
              variant === 'default' ? "text-muted-foreground" : "text-current"
            )}>
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}