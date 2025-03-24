import React, { useEffect, useRef, useState } from "react";

const VideoTrimmer = ({ videoSrc, onTrim }) => {
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [trimStart, setTrimStart] = useState(0);
    const [trimEnd, setTrimEnd] = useState(10); // Default 10s trim

    // Load video duration
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.onloadedmetadata = () => {
                setDuration(video.duration);
                setTrimEnd(Math.min(video.duration, 10)); // Default max 10s
            };
        }
    }, [videoSrc]);

    // Update video playback to match trim range
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = trimStart;
        }
    }, [trimStart]);

    // Handle trim apply
    const handleTrim = () => {
        onTrim(trimStart, trimEnd);
    };

    return (
        <div className="video-trimmer">
            {/* Video Preview */}
            <div className="video-preview">
                <video ref={videoRef} src={videoSrc} controls width="100%" />
            </div>

            {/* Trimming Range Selector */}
            <div className="trim-controls">
                <input
                    type="range"
                    min="0"
                    max={duration}
                    step="0.1"
                    value={trimStart}
                    onChange={(e) => setTrimStart(parseFloat(e.target.value))}
                />
                <input
                    type="range"
                    min="0"
                    max={duration}
                    step="0.1"
                    value={trimEnd}
                    onChange={(e) => setTrimEnd(parseFloat(e.target.value))}
                />
            </div>

            {/* Display Selected Trim Duration */}
            <div className="trim-info">
                Trim: {trimStart.toFixed(1)}s - {trimEnd.toFixed(1)}s
            </div>

            {/* Apply Trim Button */}
            <button onClick={handleTrim} className="apply-trim-btn">Apply Trim</button>
        </div>
    );
};

export default VideoTrimmer;
