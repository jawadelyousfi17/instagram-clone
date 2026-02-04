import { cn } from "@/lib/utils";
import React from "react";

const Discussion = ({
  seen,
  text,
  name,
  image,
  verified,
  hasStory,
}: {
  hasStory: boolean;
  seen: boolean;
  verified: boolean;
  text: string;
  name: string;
  image: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        {hasStory ? (
          <div className="relative rounded-full p-[3px] bg-gradient-to-tr from-[#D600C1] via-[#FA0174] via-[#D300C5] to-[#FF5224] shrink-0">
            <div className="rounded-full p-[3px] bg-background">
              <img
                src={image}
                alt={name}
                className="w-15 h-15 rounded-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="relative rounded-full bg-transparent shrink-0">
            <div className="rounded-full p-[3px] bg-background">
              <img
                src={image}
                alt={name}
                className="w-15 h-15 rounded-full object-cover"
              />
            </div>
          </div>
        )}
        <div>
          <span
            className={cn(!seen && "font-semibold", "flex items-center gap-1")}
          >
            {name}

            {verified && (
              <svg
                aria-label="Verified"
                fill="rgb(0, 149, 246)"
                height="12"
                role="img"
                viewBox="0 0 40 40"
                width="12"
              >
                <title>Verified</title>
                <path
                  d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            )}
          </span>
          <span
            className={cn(
              !seen && "font-semibold",
              seen && "text-foreground/70",
            )}
          >
            {text}
          </span>
        </div>
      </div>

      {!seen && <div className="h-2 w-2 bg-blue-600 rounded-full"> </div>}
    </div>
  );
};

export default Discussion;
