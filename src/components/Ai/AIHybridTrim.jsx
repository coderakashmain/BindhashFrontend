// import React, { useEffect, useState } from "react";
// import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import "@tensorflow/tfjs";

// const AIHybridTrim = ({ media, setTrimmedVideo }) => {
//     const [loading, setLoading] = useState(true);
//     let ffmpeg = null; // Avoid "createFFmpeg is not a function" error

//     useEffect(() => {
//         async function loadFFmpeg() {
//             const { createFFmpeg } = await import("https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@latest/dist/ffmpeg.min.js");
//             ffmpeg = createFFmpeg({ log: true });
    
//             if (!ffmpeg.isLoaded()) {
//                 await ffmpeg.load();
//             }
//         }
//         loadFFmpeg();
//     }, []);

//     useEffect(() => {
//         async function trimVideo() {
//             if (!media || !ffmpeg || !ffmpeg.isLoaded()) return;

//             try {
//                 const model = await cocoSsd.load();
//                 const videoElement = document.createElement("video");
//                 videoElement.src = media;
//                 videoElement.crossOrigin = "anonymous";

//                 videoElement.onloadedmetadata = async () => {
//                     const duration = videoElement.duration;
//                     const trimEnd = Math.min(duration, 60); // Max 1 min

//                     const detectedObjects = await detectObjects(model, videoElement);
//                     if (detectedObjects.length > 0) {
//                         const trimmedBlob = await processTrimming(media, 0, trimEnd);
//                         const trimmedURL = URL.createObjectURL(trimmedBlob);
//                         setTrimmedVideo(trimmedURL);
//                     } else {
//                         setTrimmedVideo(media);
//                     }

//                     setLoading(false);
//                 };
//             } catch (error) {
//                 console.error("AI Trimming Error:", error);
//                 setTrimmedVideo(media);
//                 setLoading(false);
//             }
//         }

//         trimVideo();
//     }, [media, setTrimmedVideo]);

//     async function detectObjects(model, video) {
//         return new Promise((resolve) => {
//             video.currentTime = 1;
//             video.onseeked = async () => {
//                 const canvas = document.createElement("canvas");
//                 canvas.width = video.videoWidth;
//                 canvas.height = video.videoHeight;
//                 const ctx = canvas.getContext("2d");
//                 ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//                 const predictions = await model.detect(canvas);
//                 resolve(predictions);
//             };
//         });
//     }

//     async function processTrimming(videoURL, start, end) {
//         const { fetchFile } = await import("@ffmpeg/ffmpeg"); // Dynamically import fetchFile
//         const inputName = "input.mp4";
//         const outputName = "output.mp4";

//         ffmpeg.FS("writeFile", inputName, await fetchFile(videoURL));

//         await ffmpeg.run(
//             "-i", inputName,
//             "-ss", start.toString(),
//             "-to", end.toString(),
//             "-c:v", "copy",
//             "-c:a", "copy",
//             outputName
//         );

//         const trimmedData = ffmpeg.FS("readFile", outputName);
//         return new Blob([trimmedData.buffer], { type: "video/mp4" });
//     }

//     return (
//         <div>
//             {loading ? <p>AI is analyzing and trimming the video...</p> : <p>Video trimmed successfully!</p>}
//         </div>
//     );
// };

// export default AIHybridTrim;
