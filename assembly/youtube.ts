import { http } from "@hypermode/modus-sdk-as";


@json
class VideoSubtitle {

  @alias("languageCode")
  language!: string;


  @alias("url")
  subtitleUrl!: string;
}


@json
class VideoDetails {

  @alias("lengthSeconds")
  duration!: number;


  @alias("subtitles")
  subtitleList!: VideoSubtitle[];
}

// @json
// class PresentationRequest {

//   @alias("u")
//   youtubeUrl!: string;

//   @alias("count")
//   numberOfSlides?: number;
// }

// @json
// class PresentationResponse {
//   //   @alias("success")
//   isSuccess!: boolean;

//   //   @alias("url")
//   presentationUrl?: string;

//   //   @alias("error")
//   errorMessage?: string;
// }

// https://www.youtube.com/watch?v=vkhjO7fc78g
export function getVideoDetails(videoId: string): VideoDetails {
  const request = new http.Request(
    `https://yt-api.p.rapidapi.com/video/info?id=${videoId}`,
  );

  console.log(request.url);
  const response = http.fetch(request);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch video details. Received: ${response.status} ${response.statusText}`,
    );
  }

  return response.json<VideoDetails>();
}

// export function getSubtitles(url: string): string[] {
//   const request = new http.Request(url);
//   const response = http.fetch(request);

//   if (!response.ok) {
//     throw new Error(
//       `Failed to fetch subtitles. Received: ${response.status} ${response.statusText}`,
//     );
//   }

//   // Parse XML response
//   const xmlText = response.text();
//   const parser = new DOMParser();
//   const xmlDoc = parser.parseFromString(xmlText, "application/xml");

//   const textNodes = xmlDoc.getElementsByTagName("text");
//   return Array.from(textNodes).map((node) => node.textContent || "");
// }

// export function generatePresentation(
//   request: PresentationRequest,
// ): PresentationResponse {
//   try {
//     // Extract video ID from URL
//     const videoId = request.youtubeUrl.split("v=")[1];
//     if (!videoId) {
//       throw new Error("Invalid YouTube URL");
//     }

//     // Get video details
//     const details = getVideoDetails(videoId);

//     // Check video length (10 minutes max)
//     if (details.duration > 600) {
//       throw new Error("Video must be under 10 minutes");
//     }

//     // Find English subtitles
//     const englishSubs = details.subtitleList.find(
//       (sub) => sub.language === "en",
//     );
//     if (!englishSubs) {
//       throw new Error("No English subtitles found");
//     }

//     // Get and parse subtitles
//     const subtitles = getSubtitles(englishSubs.subtitleUrl);

//     // TODO: Add your presentation generation logic here
//     // This would include:
//     // 1. Cleaning transcript
//     // 2. Converting to presentation format
//     // 3. Generating PowerPoint
//     // 4. Uploading to storage
//     // 5. Saving to database

//     return {
//       isSuccess: true,
//       presentationUrl: "https://example.com/presentation.pptx",
//     };
//   } catch (error) {
//     return {
//       isSuccess: false,
//       errorMessage:
//         error instanceof Error ? error.message : "Unknown error occurred",
//     };
//   }
// }
