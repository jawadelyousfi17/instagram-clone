import React from "react";

const HighlightStory = ({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) => {
  // Proxy Instagram images through our API to avoid CORS issues
  const proxyUrl =`/api/proxy-image?url=${encodeURIComponent(imageUrl)}`

  return (
    <div className="flex flex-col items-center gap-1 shrink-0">
      <div className="relative rounded-full p-[3px] bg-gray-300 shrink-0">
        <div className="rounded-full p-[4px] bg-background">
          <img
            src={proxyUrl}
            alt={title}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      </div>
      <p className="text-xs text-center max-w-[70px] truncate">{title}</p>
    </div>
  );
};

export default HighlightStory;
