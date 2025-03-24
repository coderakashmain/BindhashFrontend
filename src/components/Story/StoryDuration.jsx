import React, { useState, useRef, useEffect } from "react";
import { Slider, Typography } from "@mui/material";

const StoryDuration = ({maxDuration,setMaxDuration}) => {
    const progressRef = useRef(null);

    useEffect(() => {
        if (progressRef.current) {
            progressRef.current.style.width = `${(maxDuration / 24) * 100}%`;
        }
    }, [maxDuration]);

    return (
        <div className="story-duration" style={{ width: "80%", margin: "1.2rem auto",textAlign : 'center' }}>
            <Typography variant="h6" fontSize="1rem">Story Duration: {maxDuration} hours</Typography>
            
            <Slider
                value={maxDuration}
                onChange={(e, newValue) => setMaxDuration(newValue)}
                min={1}
                max={24}
                step={1}
                marks
                valueLabelDisplay="auto"
            />

        </div>
    );
};

export default StoryDuration;
