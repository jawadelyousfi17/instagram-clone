import React from "react";

const Note = ({
  name,
  imageUrl,
  noteText,
}: {
  name: string;
  imageUrl: string;
  noteText: string;
}) => {
  console.log("URO", imageUrl);
  return (
    <div className="flex flex-col items-center gap-1 shrink-0 relative">
      {/* Note bubble on top */}
      {noteText && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 drop-shadow-md">
          <div className="relative max-w-22 bg-white rounded-2xl px-4 py-2">
            <p className="text-xs text-wrap text-foreground">{noteText}</p>
            <div className="absolute -bottom-1 left-3 w-4 h-4 bg-white rounded-full"></div>
            <div className="absolute -bottom-2.5 left-[24px] w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>
      )}

      {/* Avatar without ring */}
      <div className="relative shrink-0 mt-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-18 h-18 rounded-full object-cover border"
        />
      </div>

      {/* Name */}
      <p className="text-xs text-center max-w-[70px] truncate">{name}</p>
    </div>
  );
};

export default Note;
