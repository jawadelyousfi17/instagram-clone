"use client";

import { cn } from "@/lib/utils";
import { Eye, X } from "lucide-react";
import { useState, useRef } from "react";

const Input = ({
  placeholder,
  type = "text",
  disabled = false,
}: {
  placeholder: string;
  type?: string;
  disabled?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const [val, steVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "flex  border border-border/60 rounded-xl h-15 py-2 px-4 cursor-text items-center justify-between",
        focused && "border-black/50",
        disabled && "bg-gray-100"
      )}
      onClick={handleContainerClick}
    >
      <div
        className={cn("flex flex-col", focused && "border-black/40")}
        onClick={handleContainerClick}
      >
        <span
          className={cn("text-foreground/60", (focused || val) && "text-xs")}
        >
          {placeholder}
        </span>
        <input
          type={type}
          value={val}
          onChange={(e) => steVal(e.target.value)}
          ref={inputRef}
          className={cn(
            "border-0 outline-0 bg-transparent ",
            !focused && !val && "h-0 opacity-0",
            disabled && "text-foreground/60"
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>

      {val && focused && (
        <div className="text-foreground/60">
          {type === "text" && (
            <X strokeWidth={1.5} onClick={() => steVal("")} />
          )}
        </div>
      )}

      {focused && type === "password" && (
        <div className="text-foreground/60">
          {type === "password" && (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              width="22px"
              height="22px"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.293 2.293a1 1 0 1 1 1.414 1.414l-18 18a1 1 0 0 1-1.414-1.414l3.446-3.446c-.238-.188-.47-.387-.694-.6L1.31 12.722a.985.985 0 0 1 0-1.436l3.734-3.527c3.15-2.976 7.77-3.542 11.48-1.697l3.768-3.768zm-5.275 5.275c-2.852-1.138-6.23-.596-8.582 1.627l-2.974 2.808 2.974 2.809c.233.22.476.423.727.61l1.391-1.39a4 4 0 0 1 5.478-5.478l.986-.986zm-2.5 2.5a2.001 2.001 0 0 0-2.45 2.45l2.45-2.45z"
              ></path>
              <path d="M22.69 11.285 19.7 8.463l-1.414 1.414 2.251 2.126-2.973 2.809a8.099 8.099 0 0 1-6.377 2.164l-1.712 1.712c3.268.833 6.876.02 9.48-2.44l3.733-3.527a.985.985 0 0 0 0-1.436z"></path>
              <path d="M15.997 12.167a4 4 0 0 1-3.83 3.83l3.83-3.83z"></path>
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
