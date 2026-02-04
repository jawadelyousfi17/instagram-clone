import { Plus } from "lucide-react";
import React from "react";

const NewStory = ({}: {}) => {
  return (
    <div className="flex flex-col items-center gap-1 shrink-0">
      <div className="relative rounded-full p-[1px] bg-foreground shrink-0">
        <div className="rounded-full p-[4px] bg-background">
          <div className="w-17 h-17 rounded-full object-cover flex justify-center items-center">
            <Plus />
          </div>
        </div>
      </div>
      <p className="text-xs text-center max-w-[70px] truncate">New</p>
    </div>
  );
};

export default NewStory;
