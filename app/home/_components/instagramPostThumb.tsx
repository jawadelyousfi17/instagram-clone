import React from "react";

const formatCount = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

const InstagramPostThumb = ({
  type,
  image,
  likes,
}: {
  type: "reel" | "post" | "carousel" | "pin";
  image: string;
  likes?: number;
}) => {
  // Calculate views from likes (approximately 20x)
  const views = likes ? likes * 20 : 0;
  const formattedViews = formatCount(views);

  // Proxy Instagram images through our API to avoid CORS issues
  const proxyUrl = image.includes("cdninstagram.com")
    ? `/api/proxy-image?url=${encodeURIComponent(image)}`
    : image;

  return (
    <div className="flex h-40 relative">
      {type === "reel" && (
        <div className="absolute top-1.5 right-1.5 z-20">
          <svg
            aria-label="Reel"
            fill="white"
            height="18"
            role="img"
            viewBox="0 0 24 24"
            width="18"
          >
            <title>Reel</title>
            <path
              d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      )}

      {type === "pin" && (
        <div className="absolute top-1.5 right-1.5 z-20">
          <svg
            aria-label="Pinned post icon"
            fill="currentColor"
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
            className="fill-white"
          >
            <title>Pinned post icon</title>
            <path d="m22.707 7.583-6.29-6.29a1 1 0 0 0-1.414 0 5.183 5.183 0 0 0-1.543 3.593L8.172 8.79a5.161 5.161 0 0 0-4.768 1.42 1 1 0 0 0 0 1.414l3.779 3.778-5.89 5.89a1 1 0 1 0 1.414 1.414l5.89-5.89 3.778 3.779a1 1 0 0 0 1.414 0 5.174 5.174 0 0 0 1.42-4.769l3.905-5.287a5.183 5.183 0 0 0 3.593-1.543 1 1 0 0 0 0-1.414Z"></path>
          </svg>
        </div>
      )}

      {type === "carousel" && (
        <div className="absolute top-1 right-1 z-20">
          <svg
            aria-label="Carousel"
            fill="white"
            height="18"
            role="img"
            viewBox="0 0 48 48"
            width="18"
          >
            <title>Carousel</title>
            <path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path>
          </svg>
        </div>
      )}
      {formattedViews && (
        <div className="absolute bottom-0.5 left-1">
          <span className="flex items-center text-white text-sm font-semibold gap-0.5 px-1.5">
            <svg
              aria-label="View Count Icon"
              fill="currentColor"
              height="16"
              role="img"
              viewBox="0 0 24 24"
              width="16"
            >
              <title>View Count Icon</title>
              <path
                d="M23.441 11.819C23.413 11.74 20.542 4 12 4S.587 11.74.559 11.819a1 1 0 0 0 1.881.677 10.282 10.282 0 0 1 19.12 0 1 1 0 0 0 1.881-.677Zm-7.124 2.368a3.359 3.359 0 0 1-1.54-.1 3.56 3.56 0 0 1-2.365-2.362 3.35 3.35 0 0 1-.103-1.542.99.99 0 0 0-1.134-1.107 5.427 5.427 0 0 0-3.733 2.34 5.5 5.5 0 0 0 8.446 6.97 5.402 5.402 0 0 0 1.536-3.09.983.983 0 0 0-1.107-1.109Z"
                fill-rule="evenodd"
              ></path>
            </svg>
            {formattedViews}
          </span>
        </div>
      )}
      <img src={proxyUrl} className="w-full h-full object-cover" />
    </div>
  );
};

export default InstagramPostThumb;
