"use client";

import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PostProps {
  username: string;
  userImage: string;
  postImage: string;
  likes: string;
  caption?: string;
  commentsCount: string;
  timeAgo: string;
  type: "carousel" | "reel";
  sharesCount: string;
}

const InstagramPost = ({
  type,
  sharesCount,
  username,
  userImage,
  postImage,
  likes,
  caption,
  commentsCount,
  timeAgo,
}: PostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="w-full mt-1">
      {/* Header */}
      <div className="flex items-center justify-between px-1.5 py-2">
        <div className="flex items-center gap-2">
          <div className="rounded-full p-[2px] bg-gradient-to-tr from-[#D600C1] via-[#FA0174] via-[#D300C5] to-[#FF5224]">
            <div className="rounded-full p-[2px] bg-background">
              <img
                src={userImage}
                alt={username}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>
          <span className="font-semibold text-sm flex items-center justify-center gap-1">
            {username}
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
          </span>
        </div>
        <button className="p-2">
          <MoreHorizontal size={20} />
        </button>
      </div>
      {/* Post Image */}
      <div className="w-full aspect-square bg-muted">
        <img
          src={postImage}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex gap-1 flex-row w-full  justify-center items-center pt-3 pb-2">
        <div className="h-1.5 w-1.5 rounded-full bg-[#2e4eeb]"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-[#e9ecfe]"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-[#e9ecfe]"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-[#e9ecfe]"></div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-row gap-1 justify-center items-center font-semibold text-[13px] hover:opacity-60 transition-opacity"
          >
            <svg
              aria-label="Like"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Like</title>
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            </svg>{" "}
            {likes}
          </button>
          <button className="flex flex-row gap-1 justify-center items-center font-semibold text-[13px] hover:opacity-60 transition-opacity">
            <svg
              aria-label="Comment"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Comment</title>
              <path
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>{" "}
            {commentsCount}
          </button>
          <button className="flex flex-row gap-1 justify-center items-center font-semibold text-[13px] hover:opacity-60 transition-opacity">
            <svg
              aria-label="Share"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Share</title>
              <path
                d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z"
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="7.488"
                x2="15.515"
                y1="12.208"
                y2="7.641"
              ></line>
            </svg>
            {sharesCount}
          </button>
        </div>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="hover:opacity-60 transition-opacity"
        >
          <svg
            aria-label="Save"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Save</title>
            <polygon
              fill="none"
              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            ></polygon>
          </svg>
        </button>
      </div>
      {/* Likes Count */}
      {/* <div className="px-3 pb-2">
        <span className="font-semibold text-sm">
          {isLiked ? likes + 1 : likes} likes
        </span>
      </div> */}
      {/* Caption */}
      {caption && (
        <div className="px-3 pb-2">
          <span className="font-semibold text-sm mr-1">{username}</span>
          <span className="text-sm">{caption}</span>
        </div>
      )}
      {/* View Comments */}
      {/* {commentsCount > 0 && (
        <div className="px-3 pb-2">
          <button className="text-sm text-foreground/60 hover:opacity-80">
            View all {commentsCount} comments
          </button>
        </div>
      )} */}
      {/* Time */}
      <div className="px-3 -mt-2">
        <span className="text-[12px] text-foreground/60">{timeAgo}</span>
      </div>
    </div>
  );
};

export default InstagramPost;
