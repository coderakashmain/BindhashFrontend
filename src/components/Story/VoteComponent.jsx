import { useState, useEffect } from "react";
import axios from "axios";

const VoteComponent = ({ storyId }) => {
    const [votesData, setVotesData] = useState([]);
    const [reactionsData, setReactionsData] = useState([]);
    const [selectedVote, setSelectedVote] = useState("");
    const [selectedReaction, setSelectedReaction] = useState("");

    // Fetch votes and reactions when component loads
    useEffect(() => {
        fetchVotes();
        fetchReactions();
    }, [storyId]);

    const fetchVotes = async () => {
        try {
            const response = await axios.get(`/api/stories/votes/${storyId}`);
            setVotesData(response.data);
        } catch (error) {
            console.error("Error fetching votes:", error);
        }
    };

    const fetchReactions = async () => {
        try {
            const response = await axios.get(`/api/stories/reactions/${storyId}`);
            setReactionsData(response.data);
        } catch (error) {
            console.error("Error fetching reactions:", error);
        }
    };

    // Submit vote
    const handleVote = async (option) => {
        try {
            await axios.post("/api/stories/vote", { story_id: storyId, option_selected: option }, { withCredentials: true });
            setSelectedVote(option);
            fetchVotes(); // Refresh votes
        } catch (error) {
            console.error("Error submitting vote:", error.response?.data?.error || error.message);
        }
    };

    // Submit reaction
    const handleReaction = async (emoji) => {
        try {
            await axios.post("/api/stories/react", { story_id: storyId, emoji }, { withCredentials: true });
            setSelectedReaction(emoji);
            fetchReactions(); // Refresh reactions
        } catch (error) {
            console.error("Error submitting reaction:", error.response?.data?.error || error.message);
        }
    };

    return (
        <div>
            <h3>Vote on this story:</h3>
            <button onClick={() => handleVote("Option 1")}>🔥 Option 1</button>
            <button onClick={() => handleVote("Option 2")}>❄️ Option 2</button>

            <h3>Add a Reaction:</h3>
            <button onClick={() => handleReaction("👍")}>👍 Like</button>
            <button onClick={() => handleReaction("❤️")}>❤️ Love</button>
            <button onClick={() => handleReaction("😲")}>😲 Wow</button>

            <h3>Votes:</h3>
            <ul>
                {votesData.map((v, index) => (
                    <li key={index}>
                        {v.option_selected}: {v.count} votes
                    </li>
                ))}
            </ul>

            <h3>Reactions:</h3>
            <ul>
                {reactionsData.map((r, index) => (
                    <li key={index}>
                        {r.emoji}: {r.count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VoteComponent;
