import { images } from "@/data";
import { Camera, ChevronDown, Copy, Ellipsis, Settings, X } from "lucide-react";
import React from "react";

const AddToStory = ({
  setAddStory,
}: {
  setAddStory: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col w-full bg-foreground h-screen overflow-hidden">
      <div className="flex justify-between w-full p-5  text-white">
        <X onClick={() => setAddStory(false)} />
        <span className="text-lg font-semibold">Add to story</span>
        <svg
          aria-label="Options"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Options</title>
          <circle
            cx="12"
            cy="12"
            fill="none"
            r="8.635"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></circle>
          <path
            d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
            fill="none"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
        </svg>
      </div>

      <div className="flex gap-1.5 w-full py-3 px-2">
        <div className="rounded-md border border-border/5 flex flex-col gap-2 bg-[#1F1F1F] text-white w-full py-1.5 justify-center items-center">
          <span className="text-3xl">
            <img src="/icons/template.png" className="h-10" />
          </span>
          <span>Templates</span>
        </div>
        <div className="rounded-md border border-border/5 flex flex-col gap-2 bg-[#1F1F1F] text-white w-full py-1.5 justify-center items-center">
          <span className="text-3xl">
            {" "}
            <img src="/icons/musics.png" className="h-10" />
          </span>
          <span>Musics</span>
        </div>
        <div className="relative rounded-md border border-border/5 flex flex-col gap-2 bg-[#1F1F1F] text-white w-full py-1.5 justify-center items-center">
          <span className="text-3xl">
            {" "}
            <img src="/icons/collage.png" className="h-10" />
          </span>
          <span>Collage</span>
          <div className="absolute top-[-10px] left-2 -rotate-5 py-1 px-1 rounded-2xl text-xs bg-blue-400 font-semibold">
            New
          </div>
        </div>
      </div>

      <div className="flex justify-between text-white p-4 py-3">
        <span className="text-lg font-semibold flex items-center">
          Recent <ChevronDown />
        </span>
        <span className="flex items-center p-1 px-3 font-semibold gap-1 bg-gray-500/20 rounded-full">
          <Ellipsis /> Select
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1 overflow-y-auto flex-1 p-1">
        <div className="h-55 bg-gray-500/20 w-full flex justify-center items-center text-white text-3xl">
          <Camera className="h-22" size={30} />
        </div>
        {images.map((image) => (
          <div className="h-55 bg-gray-500/20 w-full flex justify-center items-center text-white text-3xl">
            <img src={image} className="h-full w-full object-cover" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddToStory;
