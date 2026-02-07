"use server";

import axios from "axios";

// Define the shape of the API Response for type safety
interface InstagramEdge {
  node: {
    __typename: string;
    shortcode?: string;
    is_video?: boolean;
    video_view_count?: number;
    view_count?: number; // Sometimes view_count is used
    like_count?: number;
    edge_media_preview_like?: { count: number }; // Alternative like location
    display_url?: string; // Standard display URL
    thumbnail_src?: string; // Alternative thumbnail
    image_versions2?: {
      candidates: {
        url: string;
        width: number;
        height: number;
      }[];
    };
    product_type?: string;
    media_type?: number; // 1 = Image, 2 = Video, 8 = Carousel
  };
}

interface InstagramApiResponse {
  result: {
    edges: InstagramEdge[];
  };
}

// Define the clean output structure you requested
interface FormattedPost {
  type: "video" | "image" | "carousel";
  views: number;
  likes: number;
  coverImage: string;
}

export async function getInstagramPosts(
  username: string,
): Promise<FormattedPost[] | { error: string }> {
  const options = {
    method: "POST",
    url: "https://instagram120.p.rapidapi.com/api/instagram/posts",
    headers: {
      "x-rapidapi-key": "763cf1c4b9msh06c005a3b61ac0ap1158e4jsn4a236ac9db52", // Ideally store this in process.env.RAPIDAPI_KEY
      "x-rapidapi-host": "instagram120.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      username: username,
      maxId: "",
    },
  };

  try {
    const response = await axios.request<InstagramApiResponse>(options);
    const edges = response.data?.result?.edges || [];

    // Map and format the data
    const formattedPosts: FormattedPost[] = edges.map((edge) => {
      const node = edge.node;

      // 1. Determine Post Type
      let type: "video" | "image" | "carousel" = "image";
      if (node.media_type === 8 || node.product_type === "carousel_container") {
        type = "carousel";
      } else if (node.is_video || node.media_type === 2) {
        type = "video";
      }

      // 2. Get Cover Image (Prioritize high res candidates, fall back to display_url)
      let coverImage = node.display_url || "";
      if (
        node.image_versions2?.candidates &&
        node.image_versions2.candidates.length > 0
      ) {
        // usually the first candidate is the highest resolution
        coverImage = node.image_versions2.candidates[0].url;
      }

      // 3. Get Likes (Handle different property locations)
      const likes = node.like_count || node.edge_media_preview_like?.count || 0;

      // 4. Get Views (Only applicable for videos/reels, defaulting to 0 for images)
      const views = node.view_count || node.video_view_count || 0;

      return {
        type,
        views,
        likes,
        coverImage,
      };
    });

    return formattedPosts;
  } catch (error) {
    console.error("Instagram API Error:", error);
    return { error: "Failed to fetch Instagram posts" };
  }
}

// Define highlight structure
interface FormattedHighlight {
  title: string;
  imageUrl: string;
}

export async function getInstagramHighlights(
  username: string,
): Promise<FormattedHighlight[] | { error: string }> {
  const options = {
    method: "POST",
    url: "https://instagram120.p.rapidapi.com/api/instagram/highlights",
    headers: {
      "x-rapidapi-key": "763cf1c4b9msh06c005a3b61ac0ap1158e4jsn4a236ac9db52",
      "x-rapidapi-host": "instagram120.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      username: username,
    },
  };

  try {
    const response = await axios.request(options);
    const highlights = response.data?.result || [];

    const formattedHighlights: FormattedHighlight[] = highlights.map(
      (highlight: any) => ({
        title: highlight.title || highlight.name || "Highlight",
        imageUrl:
          highlight.cover_media?.cropped_image_version?.url ||
          highlight.cover_media?.thumbnail_src ||
          highlight.image_url ||
          "",
      }),
    );

    return formattedHighlights;
  } catch (error) {
    console.error("Instagram Highlights API Error:", error);
    return { error: "Failed to fetch Instagram highlights" };
  }
}
