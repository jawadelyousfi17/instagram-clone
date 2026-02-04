import React from "react";
import { cn } from "@/lib/utils";

interface StoryProps {
  username: string;
  imageUrl: string;
  hasStory?: boolean;
  isViewed?: boolean;
}

const Story = ({
  username,
  imageUrl,
  hasStory = true,
  isViewed = false,
}: StoryProps) => {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer shrink-0">
      <div
        className={cn(
          "rounded-full p-[3px] bg-gradient-to-tr  from-[#ffcc12] via-[#FA0174] via-[#D300C5] to-[#FF5224]",
          isViewed && "bg-gray-300",
          !hasStory && "bg-transparent",
        )}
      >
        <div className="rounded-full p-[3px] bg-background">
          <img
            src={imageUrl}
            alt={username}
            className="w-18 h-18 rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs font-light text-foreground/90 max-w-[90px] truncate">
        {username}
      </span>
    </div>
  );
};

export default Story;
