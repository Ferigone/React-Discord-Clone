import React from 'react';
import dayjs from 'dayjs';

interface TimestampProps {
  timestamp: Date;
  isSameDay: () => boolean;
}

export const Timestamp: React.FC<TimestampProps> = ({ timestamp, isSameDay }) => (
  <span className="text-primary-text ml-3 text-xs">
    {dayjs(timestamp).format(isSameDay() ? "HH:mm" : "DD-MM-YYYY HH:mm")}
  </span>
);
