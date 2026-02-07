import React, { useEffect, useRef, useState } from "react";
import InstagramPost from "../_components/post";
import MyStory from "../_components/myStory";
import Story from "../_components/story";
import { ChevronDown, Menu, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import InstagramPostThumb from "../_components/instagramPostThumb";
import { getInstagramPosts } from "@/actions/instagram";
import { getInstagramHighlights } from "@/actions/highlight";
import { Skeleton } from "@/components/ui/skeleton";
import HighlightStory from "../_components/highlight";
import NewStory from "../_components/newStory";
import AddToStory from "./addToStory";
import { AnimatePresence, motion } from "framer-motion";
import { i } from "framer-motion/client";

interface Post {
  type: "video" | "image" | "carousel";
  views: number;
  likes: number;
  coverImage: string;
}

interface Highlight {
  title: string;
  cover: string;
}

// Cache for posts and highlights with timestamps
const dataCache: {
  posts: { [username: string]: { data: Post[]; timestamp: number } };
  highlights: { [username: string]: { data: Highlight[]; timestamp: number } };
} = {
  posts: {},
  highlights: {},
};

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

interface FormattedProfile {
  username: string;
  fullName: string;
  bio: string;
  profilePic: string;
  stats: {
    followers: number;
    following: number;
    posts: number;
  };
  isPrivate: boolean;
}

const ProfilePage = ({
  profile,
  loading: profileLoading,
}: {
  profile: FormattedProfile | null;
  loading: boolean;
}) => {
  const [showHeader, setShowHeader] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [highlightsLoading, setHighlightsLoading] = useState(true);
  const [addStory, setAddStory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!profile?.username) return;

      // Check if we have cached data
      const cached = dataCache.posts[profile.username];
      const now = Date.now();

      if (cached && now - cached.timestamp < CACHE_DURATION) {
        // Use cached data
        setPosts(cached.data);
        setPostsLoading(false);
        return;
      }

      setPostsLoading(true);
      const result = await getInstagramPosts(profile.username);
      if ("error" in result) {
        console.error(result.error);
      } else {
        setPosts(result);
        // Cache the data
        dataCache.posts[profile.username] = {
          data: result,
          timestamp: now,
        };
      }
      setPostsLoading(false);
    };

    const fetchHighlights = async () => {
      if (!profile?.username) return;

      // Check if we have cached data
      const cached = dataCache.highlights[profile.username];
      const now = Date.now();

      if (cached && now - cached.timestamp < CACHE_DURATION) {
        // Use cached data
        setHighlights(cached.data);
        setHighlightsLoading(false);
        return;
      }

      setHighlightsLoading(true);
      const result = await getInstagramHighlights(profile.username);
      if ("error" in result) {
        console.error(result.error);
      } else {
        setHighlights(result);
        // Cache the data
        dataCache.highlights[profile.username] = {
          data: result,
          timestamp: now,
        };
      }
      setHighlightsLoading(false);
    };

    fetchPosts();
    fetchHighlights();
  }, [profile]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const currentScrollY = scrollRef.current.scrollTop;

      if (currentScrollY < 10) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - hide header
        setShowHeader(false);
      } else {
        // Scrolling up - show header
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      <AnimatePresence>
        {addStory && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.2 }}
          >
            <AddToStory setAddStory={setAddStory} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="h-full flex flex-col"
        animate={{ x: addStory ? "100%" : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex-none flex flex-col gap-2"></div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div
            className={cn(
              "sticky top-0 bg-background z-10 transition-transform duration-300",
              !showHeader && "-translate-y-full",
            )}
          >
            <div className="flex justify-between p-4">
              <div>
                <svg
                  aria-label="New post"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>New post</title>
                  <path d="M21 11h-8V3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2Z"></path>
                </svg>
              </div>
              <div className="flex items-center justify-center gap-0.5 text-xl font-semibold -mt-1">
                {profileLoading ? (
                  <Skeleton className="w-24 h-6" />
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-1.5">
                      {profile?.username || "Username"}
                      <svg
                        className="mt-0.5"
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
                    </div>
                    {/* <ChevronDown strokeWidth={2} size={20} className="mt-1" /> */}
                  </>
                )}
              </div>

              <div className="flex gap-8 items-center justify-center">
                <div>
                  <svg
                    aria-label=""
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 192 192"
                    width="24"
                  >
                    <title></title>
                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path>
                  </svg>
                </div>
                <div className="relative">
                  <Menu size={30} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <div className="flex gap-5 px-4 items-center mt-4">
              <div
                className="relative rounded-full p-[3px] bg-transparent shrink-0"
                onClick={() => setAddStory(true)}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-2 drop-shadow-md">
                  <div className="relative max-w-22 bg-white rounded-2xl px-4 py-2">
                    <p className="text-xs text-wrap text-foreground/50">
                      Unpopular opinion
                    </p>
                    <div className="absolute -bottom-1 left-3 w-4 h-4 bg-white rounded-full"></div>
                    <div className="absolute -bottom-2.5 left-[24px] w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="rounded-full p-[3px] bg-background">
                  {profileLoading ? (
                    <Skeleton className="w-22 h-22 rounded-full" />
                  ) : (
                    <img
                      src={
                        profile?.profilePic
                          ? `/api/proxy-image?url=${encodeURIComponent(profile.profilePic)}`
                          : "/images/grim.jpg"
                      }
                      alt={profile?.username}
                      className="w-18 h-18 rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="absolute bottom-[3px] right-[3px] bg-foreground rounded-full p-1  border-2 border-white">
                  <Plus size={12} strokeWidth={3} className="text-white" />
                </div>
              </div>
              <div className="flex flex-col gap-1 w-full">
                {profileLoading ? (
                  <Skeleton className="w-32 h-5" />
                ) : (
                  <p className="text-md font-semibold mb-0.5">
                    {profile?.fullName || "Full Name"}
                  </p>
                )}
                <div className="flex justify-between w-full  gap-2">
                  {profileLoading ? (
                    <>
                      <Skeleton className="w-16 h-12" />
                      <Skeleton className="w-16 h-12" />
                      <Skeleton className="w-16 h-12" />
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-0">
                        <p className="text-md font-semibold">
                          {profile?.stats.posts || 0}
                        </p>
                        <p>Posts</p>
                      </div>

                      <div className="flex flex-col gap-0">
                        <p className="text-md font-semibold">
                          {profile?.stats.followers
                            ? profile.stats.followers >= 1000000
                              ? (profile.stats.followers / 1000000)
                                  .toFixed(1)
                                  .replace(/\.0$/, "") + "M"
                              : profile.stats.followers >= 1000
                                ? (profile.stats.followers / 1000)
                                    .toFixed(1)
                                    .replace(/\.0$/, "") + "K"
                                : profile.stats.followers
                            : 0}
                        </p>
                        <p>followers</p>
                      </div>

                      <div className="flex flex-col gap-0">
                        <p className="text-md font-semibold">
                          {profile?.stats.following || 0}
                        </p>
                        <p>following</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="px-0 mt-1">
              <div className="px-3">
                {profileLoading ? (
                  <>
                    <Skeleton className="w-full h-4 mb-1" />
                    <Skeleton className="w-3/4 h-4 mb-1" />
                    <Skeleton className="w-1/2 h-4" />
                  </>
                ) : (
                  <div className="flex flex-col gap-0 leading-4.5">
                    <span className="text-foreground/60">Artist</span>
                    {profile?.bio.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}

                <span className="font-semibold flex gap-1 items-center">
                  <svg
                    aria-label="Link icon"
                    fill="currentColor"
                    height="16"
                    role="img"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <title>Link icon</title>
                    <path
                      d="m9.726 5.123 1.228-1.228a6.47 6.47 0 0 1 9.15 9.152l-1.227 1.227m-4.603 4.603-1.228 1.228a6.47 6.47 0 0 1-9.15-9.152l1.227-1.227"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    ></path>
                    <line
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      x1="8.471"
                      x2="15.529"
                      y1="15.529"
                      y2="8.471"
                    ></line>
                  </svg>
                  open2.app/7ELMETADO7 and 2 more
                </span>

                <span className="text-[#0046f6]"></span>

                <div className="bg-[hsl(190,30%,95%)] p-4 rounded-xl mt-2">
                  <p className="text-md font-semibold">
                    Professional dashboard
                  </p>
                  <p className="text-foreground/60">
                    237m views in the last 30 days.
                  </p>
                </div>
                <div className="mt-2 flex gap-2 w-full">
                  <Button className="bg-[hsl(190,30%,95%)] text-foreground flex-1 font-semibold">
                    Edit profile
                  </Button>
                  <Button className="bg-[hsl(190,30%,95%)] text-foreground flex-1 font-semibold">
                    Share profile
                  </Button>
                </div>

                <div className="flex gap-2 py-2 overflow-hidden mt-3">
                  <NewStory />
                  {highlightsLoading
                    ? // Show skeleton loaders while loading
                      Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center gap-1 shrink-0"
                        >
                          <Skeleton className="w-20 h-20 rounded-full" />
                          <Skeleton className="w-12 h-3 rounded" />
                        </div>
                      ))
                    : highlights.map((highlight, index) => (
                        <HighlightStory
                          key={index}
                          title={highlight.title}
                          imageUrl={highlight.cover}
                        />
                      ))}
                </div>

                <div className="flex justify-between mt-1 ">
                  <div className="flex justify-center items-center border-b border-b-2 border-foreground w-18 py-3">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <title>Posts</title>
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2px"
                        d="M3 3H21V21H3z"
                      ></path>
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2px"
                        d="M9.01486 3 9.01486 21"
                      ></path>
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2px"
                        d="M14.98514 3 14.98514 21"
                      ></path>
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2px"
                        d="M21 9.01486 3 9.01486"
                      ></path>
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2px"
                        d="M21 14.98514 3 14.98514"
                      ></path>
                    </svg>
                  </div>

                  <div className="flex justify-center items-center w-18 py-3">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="opacity-50"
                    >
                      <title>Reels</title>
                      <g
                        stroke-linejoin="round"
                        stroke-width="2px"
                        className="stroke-foreground"
                      >
                        <path
                          d="M2.0493 7.002 21.9503 7.002"
                          fill="none"
                        ></path>
                        <path
                          stroke-linecap="round"
                          d="M13.50427 2.001 16.36227 7.002"
                          fill="none"
                        ></path>
                        <path
                          stroke-linecap="round"
                          d="M7.20677 2.1099 10.00177 7.0019"
                          fill="none"
                        ></path>
                        <path
                          d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552z"
                          stroke-linecap="round"
                          fill="none"
                        ></path>
                      </g>
                      <path
                        d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0z"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </div>

                  <div className="flex justify-center items-center w-18 py-3">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="opacity-50"
                    >
                      <title>Saved</title>
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2px"
                        d="M20 21 12 13.44 4 21 4 3 20 3 20 21z"
                      ></path>
                    </svg>
                  </div>

                  <div className="flex justify-center items-center w-18 py-3">
                    <svg
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      className="opacity-50"
                    >
                      <title>Tagged</title>
                      <path
                        d="M21 7.48a2 2 0 0 0-2-2h-3.046a2.002 2.002 0 0 1-1.506-.683l-1.695-1.939a1 1 0 0 0-1.506 0L9.552 4.797c-.38.434-.93.682-1.506.682H5a2 2 0 0 0-2 2V19l.01.206A2 2 0 0 0 5 21h14a2 2 0 0 0 2-2V7.48ZM23 19a4 4 0 0 1-4 4H5a4 4 0 0 1-3.995-3.794L1 19V7.48a4 4 0 0 1 4-4h3.046l1.696-1.94a3 3 0 0 1 4.516 0l1.696 1.94H19a4 4 0 0 1 4 4V19Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M14.5 10.419a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Zm2 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM12 16.003c3.511 0 6.555 1.99 8.13 4.906a1 1 0 0 1-1.76.95c-1.248-2.31-3.64-3.857-6.37-3.857S6.878 19.55 5.63 21.86a1 1 0 0 1-1.76-.951c1.575-2.915 4.618-4.906 8.13-4.906Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-0.5 mt-1">
                {postsLoading
                  ? // Show skeleton loaders while loading
                    Array.from({ length: 9 }).map((_, index) => (
                      <Skeleton key={index} className="aspect-square w-full" />
                    ))
                  : // Show actual posts
                    posts
                      .filter((p, i) => i > 0)
                      .map((post, index) => (
                        <InstagramPostThumb
                          key={index}
                          type={
                            index < 3
                              ? "pin"
                              : post.type === "video"
                                ? "reel"
                                : "carousel"
                          }
                          likes={post.likes}
                          image={post.coverImage}
                        />
                      ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
