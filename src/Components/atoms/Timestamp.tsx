import React from 'react';
import dayjs from 'dayjs';

// Import the 'isYesterday' plugin from dayjs
import isYesterday from 'dayjs/plugin/isYesterday';

// Extend dayjs with isYesterday plugin
dayjs.extend(isYesterday);

interface TimestampProps {
  timestamp: Date;
}

export const Timestamp: React.FC<TimestampProps> = ({ timestamp }) => {
  // Check if the message was sent today
  const isToday = dayjs(timestamp).isSame(dayjs(), 'day');

  // Check if the message was sent yesterday
  const wasYesterday = dayjs(timestamp).isYesterday();

  // Render the timestamp based on the conditions
  return (
    <span className="text-primary-text ml-3 text-xs">
      {isToday
        ? dayjs(timestamp).format('HH:mm') // Today: show only the time
        : wasYesterday
        ? `Yesterday ${dayjs(timestamp).format('HH:mm')}` // Yesterday: "Yesterday HH:mm"
        : dayjs(timestamp).format('DD.MM.YYYY HH:mm') // Older: show full date and time
      }
    </span>
  );
};
