import { Plus } from "lucide-react";

interface MyStoryProps {
  username: string;
  imageUrl: string;
}

const MyStory = ({ username, imageUrl }: MyStoryProps) => {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer shrink-0">
      <div className="relative rounded-full p-[3px] bg-transparent">
        <div className="rounded-full p-[3px] bg-background">
          <img
            src={imageUrl}
            alt={username}
            className="w-18 h-18 rounded-full object-cover"
          />
        </div>
        <div className="absolute bottom-[3px] right-[3px] bg-foreground rounded-full p-1  border-3 border-white">
          <Plus size={12} strokeWidth={3} className="text-white" />
        </div>
      </div>
      <span className="text-xs text-foreground/90 max-w-[70px] truncate">
        {username}
      </span>
    </div>
  );
};

export default MyStory;
