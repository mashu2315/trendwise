require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateArticle = async (trend) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Generate a 500-word SEO-optimized blog article on "${trend.title}". 
Include:
- H1, H2, and H3 HTML headings
- A meta description
- - Real and existing embedded media links (relevant tweets, YouTube videos, and images with valid URLs – no placeholders or fake links)

Return the result as a JSON with the following structure:
{
  "title": "...",
  "meta": {
    "description": "...",
    "ogTitle": "...",
    "ogImage": "..."
  },
  "media": ["...", "..."],
  "content": "<h1>...</h1><p>...</p>"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

  
    text = text.trim();
    if (text.startsWith("```json")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini AI error:", error);
    return {
      title: trend.title,
      meta: {
        description: "Default description",
        ogTitle: trend.title,
        ogImage: "",
      },
      media: [],
      content: `<h1>${trend.title}</h1><p>Default content</p>`,
    };
  }
};

module.exports = { generateArticle };






// require("dotenv").config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const generateArticle = async (trend) => {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const prompt = `Generate a 500-word SEO-optimized blog article on "${trend.title}". 
// Include:
// - H1, H2, and H3 HTML headings
// - A meta description (150-160 characters)
// - A list of 3-5 embeddable media links, including:
//   - At least one valid image URL (e.g., https://example.com/image.jpg, must be a direct link to a .jpg or .png file)
//   - At least one YouTube embed URL (e.g., https://www.youtube.com/embed/video_id)
//   - At least one tweet URL (e.g., https://x.com/username/status/123456789) that can be embedded
//   - Ensure all URLs are valid, publicly accessible, and appropriate for embedding
// Return the result as a JSON with the following structure:
// {
//   "title": "...",
//   "meta": {
//     "description": "...",
//     "ogTitle": "...",
//     "ogImage": "..."
//   },
//   "media": [
//     {"type": "image", "url": "https://example.com/image.jpg"},
//     {"type": "youtube", "url": "https://www.youtube.com/embed/video_id"},
//     {"type": "tweet", "url": "https://x.com/username/status/123456789"}
//   ],
//   "content": "<h1>...</h1><p>...</p>"
// }`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     let text = response.text();

//     // Strip code block markers if present
//     text = text.trim();
//     if (text.startsWith("```json")) {
//       text = text.replace(/```json|```/g, "").trim();
//     }

//     // Parse and validate the response
//     let article;
//     try {
//       article = JSON.parse(text);
//     } catch (parseError) {
//       console.error('JSON parse error:', parseError);
//       throw new Error('Invalid JSON response from Gemini AI');
//     }

//     // Validate media URLs
//     const validMedia = article.media
//       .filter((media) => {
//         if (!media.type || !media.url) return false;
//         if (media.type === 'image' && !/\.(jpg|jpeg|png|gif)$/i.test(media.url)) return false;
//         if (media.type === 'youtube' && !media.url.includes('youtube.com/embed/')) return false;
//         if (media.type === 'tweet' && !media.url.includes('x.com/') && !media.url.includes('twitter.com/')) return false;
//         return true;
//       })
//       .slice(0, 5); // Limit to 5 media items

//     article.media = validMedia.length > 0 ? validMedia : [
//       { type: 'image', url: 'https://via.placeholder.com/800x400.png?text=Default+Image' },
//       { type: 'youtube', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
//       { type: 'tweet', url: 'https://x.com/example/status/123456789' }
//     ];

//     return article;
//   } catch (error) {
//     console.error("Gemini AI error:", error);
//     return {
//       title: trend.title,
//       meta: {
//         description: "Default description",
//         ogTitle: trend.title,
//         ogImage: "https://via.placeholder.com/800x400.png?text=Default+Image",
//       },
//       media: [
//         { type: 'image', url: 'https://via.placeholder.com/800x400.png?text=Default+Image' },
//         { type: 'youtube', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
//         { type: 'tweet', url: 'https://x.com/example/status/123456789' }
//       ],
//       content: `<h1>${trend.title}</h1><p>Default content</p>`,
//     };
//   }
// };

// module.exports = { generateArticle };
