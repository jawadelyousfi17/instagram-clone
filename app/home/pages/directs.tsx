import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronDown,
  List,
  Menu,
  NavigationOff,
  Search,
  Settings2,
  TrendingUp,
} from "lucide-react";
import React from "react";
import Note from "../_components/note";
import Discussion from "../_components/discussion";
import { direct } from "@/data";

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

const DirectsPage = ({ profile }: { profile: FormattedProfile | null }) => {
  const proxyUrl = profile?.profilePic
    ? `/api/proxy-image?url=${encodeURIComponent(profile.profilePic)}`
    : profile?.profilePic || "/images/grim.jpg";

  return (
    <div>
      <div className="flex justify-between p-4">
        <div>
          <List />
        </div>
        <div className="flex items-center justify-center gap-0.5 text-xl font-semibold -mt-1">
          {false ? (
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

        <div className="flex gap-3 items-center justify-center">
          <div>
            <TrendingUp />
          </div>
          <div className="relative">
            <svg
              aria-label="New message"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>New message</title>
              <path
                d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
              <path
                d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
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
                x1="16.848"
                x2="20.076"
                y1="3.924"
                y2="7.153"
              ></line>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 mt-4">
        <div className="flex w-full rounded-full bg-foreground/2 h-12 items-center px-5 gap-5">
          <Search />
          <span className="text-foreground/60 text-lg">
            Search or ask Meta AI{" "}
          </span>
        </div>

        <div className="flex gap-2 mt-7">
          <div className="flex flex-col justify-center items-center gap-0">
            <Note
              name="Your note"
              imageUrl={proxyUrl}
              noteText="Unpopular opinion"
            />
            <div className="text-[12px] font-semibold flex items-center -mt-1 gap-0.5">
              <NavigationOff className="text-xs w-3 text-red-500" />
              Location off
            </div>
          </div>
          <Note
            name="Map"
            imageUrl="/images/image.png"
            noteText="Share yours"
          />
        </div>

        <div className="flex justify-between  mt-5">
          <div className="flex gap-0.5 border-2 px-2 py-1 rounded-full text-sm">
            <Settings2 className="h-5" />
            <ChevronDown className="h-5" />
          </div>

          <div className="flex gap-1 border-2 px-3 bg-border py-1 rounded-full text-xs justify-center items-center">
            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
            <span className="font-semibold">Primary</span>
            <span className="text-foreground/30 font-semibold">2</span>
          </div>

          <div className="flex gap-1 border-2 px-3  py-1 rounded-full text-xs justify-center items-center font-semibold">
            Requests
          </div>

          <div className="flex gap-1 border-2 px-3  py-1 rounded-full text-xs justify-center items-center font-semibold">
            General
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-7">
          {direct.map((m, index) => (
            <Discussion
              hasStory={m.hasStory}
              name={m.name}
              verified={m.verified}
              image={m.image}
              text={m.message}
              seen={m.seen}
            />
          ))}

          <Discussion
            hasStory={true}
            name="Jawad Elyo"
            verified={true}
            image="/images/grim.jpg"
            text="Seen 2h ago"
            seen={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DirectsPage;
