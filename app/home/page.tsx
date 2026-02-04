"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import Story from "./_components/story";
import MyStory from "./_components/myStory";
import { Instagram, Profile } from "@hugeicons/core-free-icons";
import InstagramPost from "./_components/post";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/custom/navbar";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import { getInstagramProfile } from "@/actions/profileInfo";
import DirectsPage from "./pages/directs";
import { username } from "@/data";

export interface FormattedProfile {
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

// Cache for profile data with timestamps
const profileCache: {
  [username: string]: { data: FormattedProfile; timestamp: number };
} = {};

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

const page = () => {
  const [active, setActive] = useState("home");
  const [profile, setProfile] = useState<FormattedProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      // Check if we have cached data
      const cached = profileCache[username];
      const now = Date.now();

      if (cached && now - cached.timestamp < CACHE_DURATION) {
        // Use cached data
        setProfile(cached.data);
        setLoading(false);
        return;
      }

      setLoading(true);
      const result = await getInstagramProfile(username);
      if ("error" in result) {
        console.error(result.error);
      } else {
        setProfile(result);
        // Cache the data
        profileCache[username] = {
          data: result,
          timestamp: now,
        };
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {loading && (
        <div className="flex w-full h-full bg-white fixed z-2300 justify-center items-center">
          <span className="black-loader"></span>
        </div>
      )}

      {active === "home" && <HomePage profile={profile as FormattedProfile} />}

      {active === "profile" &&
        (loading ? (
          <div className="flex w-full h-svh justify-center items-center">
            <span className="black-loader"></span>
          </div>
        ) : (
          <ProfilePage profile={profile} loading={loading} />
        ))}

      {active === "direct" && !loading && (
        <DirectsPage profile={profile as FormattedProfile} />
      )}

      <Navbar
        profile={profile as FormattedProfile}
        setActive={setActive}
        active={active}
      />
    </div>
  );
};

export default page;
