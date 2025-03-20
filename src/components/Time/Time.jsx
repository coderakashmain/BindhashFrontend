import React, { useEffect, useState } from "react";
import { formatDistanceToNow, isToday, parseISO } from "date-fns";

const Time = ({ posttime }) => {
    const [formattedTime, setFormattedTime] = useState("");

    useEffect(() => {
        if (!posttime) return;

        const date = parseISO(posttime);
        const timeAgo = isToday(date)
            ? formatDistanceToNow(date, { addSuffix: true })
            : formatDistanceToNow(date, { addSuffix: true, includeSeconds: false });

        setFormattedTime(timeAgo);
    }, [posttime]);

    return <span>{formattedTime}</span>;
};

export default Time;
