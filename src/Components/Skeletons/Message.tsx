import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="animate-pulse flex space-x-4 px-8 py-4">
      <div className="rounded-full bg-secondary h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
      <div className="grid grid-cols-12 gap-4">
            <div className="h-2 bg-secondary rounded col-span-2"></div>
            <div className="h-2 bg-secondary rounded"></div>
          </div>
        <div className="space-y-2">
          <div className="h-2 bg-secondary rounded"></div>
          <div className="h-2 bg-secondary rounded w-5/6"></div>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-secondary rounded col-span-2"></div>
            <div className="h-2 bg-secondary rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-secondary rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
