import React, { useEffect, useRef, useState } from "react";
import "./PhotoFilter.css";
import { Play, Pause } from "lucide-react";

const filters = {
    none: "",
    grayscale: "grayscale(100%)",
    sepia: "sepia(100%)",
    brightness: "brightness(1.5)",
    contrast: "contrast(1.5)",
    saturate: "saturate(2)",
    hueRotate: "hue-rotate(90deg)"
};

const PhotoFilter = ({ media, type, setFilteredMedia }) => {
    const [selectedFilter, setSelectedFilter] = useState("none");
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef();
    const [showIcon, setShowIcon] = useState(true);
    const [processedImage, setProcessedImage] = useState(media);
    

    // Apply selected filter
    const applyFilter = (filter) => {
        setSelectedFilter(filter); 
        if (type.startsWith("image")) {
    
        
            const img = new Image();
            img.crossOrigin = "anonymous";  
            img.src = media;
    
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
    
                canvas.width = img.width;
                canvas.height = img.height;
    
                ctx.filter = filters[filter]; 
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], "filtered_image.jpg", { type: "image/jpeg" });

                        const newImageUrl = URL.createObjectURL(blob);
                        setProcessedImage(newImageUrl);


                        setFilteredMedia(file); 
                    }
                }, "image/jpeg");
            };
        } else {
          
            setFilteredMedia({ file: media, filter });
        }
    };

    useEffect(()=>{
        setSelectedFilter("none");
        setProcessedImage(media);
        // applyFilter("none")
       setFilteredMedia(media);
    },[media])


    const togglePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
        setShowIcon(true);
        setTimeout(() => setShowIcon(false), 2000);
    };
    useEffect(()=>{
        if(videoRef.current){

            togglePlayPause();
        }
    },[])

    return (
        <div className="photo-filter-container">
            {/* Main Preview */}
            <div className="preview-container">
                {type.startsWith("image") && (
                    <img
                        src={processedImage}
                        alt="Preview"
                        className="filtered-media"
                        // style={{ filter: selectedFilter === "none" ? "" : filters[selectedFilter] }}
                    />
                )}

                {type.startsWith("video") && (
                    <div className="story-video-play-box">
                        <video
                            ref={videoRef}
                            src={media}
                            className="filtered-media"
                            autoPlay
                            style={{ filter: filters[selectedFilter] }}
                            onClick={togglePlayPause}
                        />

                        {showIcon && (
                            <div
                                onClick={togglePlayPause}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    background: "rgba(0, 0, 0, 0.5)",
                                    padding: "8px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer"
                                }}
                            >
                                {isPlaying ? <Pause color="white" size={32} /> : <Play color="white" size={32} />}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Filter Thumbnails */}
            {!type.startsWith("video") && (    <div className="filter-thumbnails">
                {Object.keys(filters).map((filter) => (
                    <div
                        key={filter}
                        className={`filter-thumb ${selectedFilter === filter ? "active" : ""}`}
                        onClick={() => { 
                    
                            applyFilter(filter)}}
                    >
                        {type.startsWith("image") && (
                            <img src={media} alt={filter} style={{ filter: filters[filter] }} />
                        )}
                        {type.startsWith("video") && (
                            <video src={media} muted loop style={{ filter: filters[filter] }} />
                        )}
                        <span>{filter}</span>
                    </div>
                ))}
            </div>)}
        </div>
    );
};

export default PhotoFilter;
