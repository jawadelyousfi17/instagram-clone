"use server";

import axios from "axios";

// 1. Define the shape of the API Response based on your highlight.txt file
interface HighlightItem {
  id: string;
  title: string;
  cover_media: {
    cropped_image_version: {
      url: string;
    };
  };
  user: {
    username: string;
    id: string;
  };
}

interface InstagramHighlightsResponse {
  result: HighlightItem[];
}

// 2. Define the clean output structure you requested
interface FormattedStory {
  title: string;
  cover: string;
}

export async function getInstagramHighlights(
  username: string,
): Promise<FormattedStory[] | { error: string }> {
  const options = {
    method: "POST",
    url: "https://instagram120.p.rapidapi.com/api/instagram/highlights",
    headers: {
      "x-rapidapi-key": "91ce630dc3msh1438c76c8ca9858p109dc8jsn5681bbb1d9fe", // Best practice: process.env.RAPIDAPI_KEY
      "x-rapidapi-host": "instagram120.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      username: username,
    },
  };

  try {
    const response = await axios.request<InstagramHighlightsResponse>(options);

    // Check if result exists and is an array
    const highlights = response.data?.result || [];

    // 3. Map the data to your specific requirements
    const formattedStories: FormattedStory[] = highlights.map((item) => {
      return {
        title: item.title,
        // Optional chaining in case a specific cover is missing, falling back to empty string
        cover: item.cover_media?.cropped_image_version?.url || "",
      };
    });

    console.log(formattedStories);
    return formattedStories;
  } catch (error) {
    console.error("Instagram Highlights API Error:", error);
    return { error: "Failed to fetch Instagram highlights" };
  }
}
