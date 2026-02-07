"use server";

import axios from "axios";

// 1. Define the shape of the API Response based on your snippet
interface InstagramProfileResponse {
  result: {
    id: string;
    username: string;
    full_name: string;
    biography: string;
    is_private: boolean;
    profile_pic_url: string;
    profile_pic_url_hd?: string; // Often available, but good to mark optional
    edge_followed_by: {
      count: number;
    };
    edge_follow: {
      count: number;
    };
    edge_owner_to_timeline_media: {
      count: number;
    };
  };
}

// 2. Define the clean output structure
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

export async function getInstagramProfile(
  username: string,
): Promise<FormattedProfile | { error: string }> {
  const options = {
    method: "POST",
    url: "https://instagram120.p.rapidapi.com/api/instagram/profile",
    headers: {
      "x-rapidapi-key": "763cf1c4b9msh06c005a3b61ac0ap1158e4jsn4a236ac9db52", // Ideally store in process.env.RAPIDAPI_KEY
      "x-rapidapi-host": "instagram120.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      username: username,
    },
  };

  try {
    const response = await axios.request<InstagramProfileResponse>(options);
    const data = response.data?.result;

    if (!data) {
      return { error: "Profile not found" };
    }

    // 3. Map the raw API data to your clean structure
    const formattedProfile: FormattedProfile = {
      username: data.username,
      fullName: data.full_name,
      bio: data.biography,
      // Prefer HD image, fall back to standard if HD is missing
      profilePic: data.profile_pic_url_hd || data.profile_pic_url,
      stats: {
        followers: data.edge_followed_by?.count || 0,
        following: data.edge_follow?.count || 0,
        posts: data.edge_owner_to_timeline_media?.count || 0,
      },
      isPrivate: data.is_private,
    };

    return formattedProfile;
  } catch (error) {
    console.error("Instagram Profile API Error:", error);
    return { error: "Failed to fetch Instagram profile" };
  }
}
