'use client';

import React from 'react';
import { ChartContainer } from './chart-container';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: Date;
  type?: 'success' | 'warning' | 'error' | 'info' | 'default';
  user?: string;
  metadata?: Record<string, any>;
  duration?: number; // in minutes
  status?: 'completed' | 'in-progress' | 'failed' | 'pending';
}

interface TimelineComponentProps {
  events: TimelineEvent[];
  title?: string;
  showExport?: boolean;
  maxHeight?: number;
  showTime?: boolean;
  showUser?: boolean;
  showDuration?: boolean;
  showMetadata?: boolean;
  groupByDate?: boolean;
  onEventClick?: (event: TimelineEvent) => void;
  formatTime?: (date: Date) => string;
  formatDate?: (date: Date) => string;
}

const TYPE_STYLES = {
  success: {
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    borderColor: 'border-green-300 dark:border-green-700',
    iconColor: 'text-green-600 dark:text-green-400',
    icon: CheckCircle
  },
  warning: {
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-300 dark:border-yellow-700',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    icon: AlertCircle
  },
  error: {
    bgColor: 'bg-red-100 dark:bg-red-900/20',
    borderColor: 'border-red-300 dark:border-red-700',
    iconColor: 'text-red-600 dark:text-red-400',
    icon: XCircle
  },
  info: {
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    borderColor: 'border-blue-300 dark:border-blue-700',
    iconColor: 'text-blue-600 dark:text-blue-400',
    icon: AlertCircle
  },
  default: {
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    borderColor: 'border-gray-300 dark:border-gray-600',
    iconColor: 'text-gray-600 dark:text-gray-400',
    icon: AlertCircle
  }
};

const STATUS_BADGES = {
  completed: { label: 'Completed', variant: 'default' as const, color: 'bg-green-500' },
  'in-progress': { label: 'In Progress', variant: 'secondary' as const, color: 'bg-blue-500' },
  failed: { label: 'Failed', variant: 'destructive' as const, color: 'bg-red-500' },
  pending: { label: 'Pending', variant: 'outline' as const, color: 'bg-gray-500' }
};

export function TimelineComponent({
  events,
  title,
  showExport = false,
  maxHeight = 600,
  showTime = true,
  showUser = true,
  showDuration = false,
  showMetadata = false,
  groupByDate = false,
  onEventClick,
  formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  formatDate = (date) => date.toLocaleDateString()
}: TimelineComponentProps) {
  // Sort events by timestamp (newest first)
  const sortedEvents = [...events].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Group events by date if requested
  const groupedEvents = groupByDate
    ? sortedEvents.reduce((groups, event) => {
        const dateKey = formatDate(event.timestamp);
        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(event);
        return groups;
      }, {} as Record<string, TimelineEvent[]>)
    : { 'All Events': sortedEvents };

  const TimelineEventComponent = ({ event }: { event: TimelineEvent }) => {
    const style = TYPE_STYLES[event.type || 'default'];
    const IconComponent = style.icon;
    const statusBadge = event.status ? STATUS_BADGES[event.status] : null;

    return (
      <div
        className={`relative flex gap-4 p-4 rounded-lg border transition-colors hover:shadow-sm ${
          onEventClick ? 'cursor-pointer hover:bg-muted/50' : ''
        } ${style.bgColor} ${style.borderColor}`}
        onClick={() => onEventClick?.(event)}
      >
        {/* Timeline line connector */}
        <div className="absolute left-6 top-12 bottom-0 w-px bg-border -mb-4"></div>
        
        {/* Icon */}
        <div className={`flex-shrink-0 ${style.iconColor}`}>
          <IconComponent className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="font-medium text-sm">{event.title}</h4>
              {event.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {event.description}
                </p>
              )}
            </div>
            
            {statusBadge && (
              <Badge variant={statusBadge.variant} className="text-xs">
                {statusBadge.label}
              </Badge>
            )}
          </div>

          {/* Metadata row */}
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            {showTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatTime(event.timestamp)}
              </div>
            )}

            {showUser && event.user && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {event.user}
              </div>
            )}

            {showDuration && event.duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {event.duration}min
              </div>
            )}
          </div>

          {/* Metadata details */}
          {showMetadata && event.metadata && Object.keys(event.metadata).length > 0 && (
            <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(event.metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium">{key}:</span>
                    <span className="text-muted-foreground">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const content = (
    <div 
      className="space-y-4"
      style={{ maxHeight, overflowY: 'auto' }}
    >
      {Object.entries(groupedEvents).map(([dateGroup, groupEvents]) => (
        <div key={dateGroup}>
          {groupByDate && (
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {dateGroup}
            </div>
          )}
          
          <div className="space-y-4">
            {groupEvents.map((event) => (
              <TimelineEventComponent key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}

      {events.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No events to display</p>
        </div>
      )}
    </div>
  );

  if (title) {
    return <ChartContainer title={title} showExport={showExport}>{content}</ChartContainer>;
  }

  return content;
}
