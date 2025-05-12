import React, { useContext, useEffect, useState } from "react";
import { usePolls } from "../../Context/PollProvider";
import "./PollView.css";
import { EllipsisVertical, ThumbsUp, MessageCircle, ScanEye, AlignEndHorizontal, Heart, MessageSquare } from "lucide-react";
import Followbtn from "../ProfileStats/Followbtn";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import Time from "../Time/Time";
import { io } from "socket.io-client";
import axios from "axios";
import { useSocket } from "../../Context/SocketContext";
import { LinearProgress, Box, Typography } from "@mui/material";
import PostOptions from '../PostOptions/PostOptions'


const PollView = ({ pollId }) => {
    const { polls,setPolls } = usePolls(); // Get polls from context
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const { usertoken } = useContext(UserAuthCheckContext)
    const socket = useSocket();


  
        // console.log(selectedPoll)

   

  
    const handleViewPoll = async (pollId, userId) => {
        try {
            await axios.post(`/api/polls/view/${pollId}`, { user_id: userId });
        } catch (error) {
            console.error("Error updating views:", error);
        }
    };

    useEffect(() => {
        if (pollId && usertoken?.user?.id) {
            handleViewPoll(pollId, usertoken.user.id);
    
        }
    }, [pollId, usertoken]);

    

    useEffect(() => {
        if (polls.length > 0) {
            const pollData = polls.find((poll) => poll.poll_id === pollId);
            setSelectedPoll(pollData);
         
        }
    }, [polls, pollId]);



useEffect(() => {
    socket.on("poll_update", (data) => {
        console.log("🔥 Received poll_update:", data);
     

        // setPolls((prevPolls) =>
        //     prevPolls.map((poll) =>
        //         poll.poll_id === data.poll_id
        //             ? { ...poll, likes: poll.likes + (data.decrement ? -1 : 1) }
        //             : poll
        //     )
        // );


        setSelectedPoll((prev) => {
            if (!prev || prev.poll_id !== data.poll_id) return prev;
            if (data.user_id === usertoken?.user?.id) return prev;

           
          

            let updatedOptions;
            let newTotalVotes = prev.total_votes;

            switch (data.type) {

                case "like":
                    return {
                        ...prev,
                        likes: prev.likes + (data.decrement ? -1 : 1)
                    };

                case "comment":
                    return {
                        ...prev,
                        comments: prev.comments + 1
                    };

                case "view":
                    return {
                        ...prev,
                        views: prev.views + 1
                    };

                    case "vote":
                        newTotalVotes += data.decrement ? -1 : 1;
    
                        updatedOptions = prev.options.map((opt) => ({
                            ...opt,
                            votes: opt.option_id === data.poll_option_id
                                ? opt.votes + (data.decrement ? -1 : 1)
                                : opt.votes,
                            user_voted: opt.option_id === data.poll_option_id && !data.decrement,
                        }));
    
                        break;
    
                    case "vote_transfer":
                        updatedOptions = prev.options.map((opt) => ({
                            ...opt,
                            votes: opt.option_id === data.poll_option_id
                                ? opt.votes + 1 // New option gets a vote
                                : opt.option_id === data.previousOptionId
                                ? opt.votes - 1 // Previous option loses a vote
                                : opt.votes,
                            user_voted: opt.option_id === data.poll_option_id,
                        }));
    
                        break;
    
                    default:
                        return prev;
                }
    
                // **Recalculate Percentage** after updating votes
                const updatedOptionsWithPercentage = updatedOptions.map((opt) => ({
                    ...opt,
                    percentage: newTotalVotes > 0 ? ((opt.votes / newTotalVotes) * 100).toFixed(2) : 0,
                }));
    
                return {
                    ...prev,
                    options: updatedOptionsWithPercentage,
                    total_votes: newTotalVotes,
                };
            });
        });
    
        return () => socket.off("poll_update");
    }, [pollId, socket, usertoken]);


    
    

    if (!selectedPoll) return <p>Loading poll...</p>;

    const handleLike = async () => {
        if (!selectedPoll) return;
    
        const alreadyLiked = selectedPoll.user_has_liked;
        
     
        setSelectedPoll((prevPoll) => {
            if (!prevPoll) return prevPoll;
    
            return {
                ...prevPoll,
                likes: alreadyLiked ? prevPoll.likes - 1 : prevPoll.likes + 1,
                user_has_liked: !alreadyLiked 
            };
        });
    
        try {
            await axios.post(`/api/polls/like/${pollId}`, { 
                user_id: usertoken.user.id 
            });
        } catch (error) {
            console.error("Error liking poll:", error);
    
            // Rollback UI if request fails
            setSelectedPoll((prevPoll) => {
                if (!prevPoll) return prevPoll;
                return {
                    ...prevPoll,
                    likes: alreadyLiked ? prevPoll.likes + 1 : prevPoll.likes - 1, // Revert like count
                    user_has_liked: alreadyLiked, // Restore like state
                };
            });
        }
    };
    
   

    const handleComment = async (commentText) => {
        await axios.post(`/api/polls/comment/${pollId}`, { comment: commentText, user_id: usertoken.user.id });
    };

    const handleVote = async (option_id) => {

    
        if (!selectedPoll) return;
    
        setSelectedPoll((prevPoll) => {
            if (!prevPoll) return prevPoll;
    
            const previousOptionId = prevPoll.user_voted_option;
            let updatedOptions;
            let newUserVotedOption;
            let newVoterUserId;
    
            if (previousOptionId === option_id) {
           
                // User is unvoting
                updatedOptions = prevPoll.options.map((option) =>
                    option.option_id === option_id
                        ? { ...option, votes: option.votes - 1, user_voted: false }
                        : option
                );
                newUserVotedOption = null; 
                newVoterUserId = null;// Reset user's vote
            } else {
                // User is voting/changing vote
                updatedOptions = prevPoll.options.map((option) => ({
                    ...option,
                    votes:
                        option.option_id === option_id
                            ? option.votes + 1
                            : option.option_id === previousOptionId
                            ? option.votes - 1
                            : option.votes,
                    user_voted: option.option_id === option_id, // Set correct user_voted flag
                }));
                newUserVotedOption = option_id;
                newVoterUserId = usertoken.user.id; 
            }
    
            const totalVotes = updatedOptions.reduce((sum, option) => sum + option.votes, 0);
    
            const updatedOptionsWithPercentage = updatedOptions.map((option) => ({
                ...option,
                percentage: totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(2) : 0,
            }));
    
            return {
                ...prevPoll,
                options: updatedOptionsWithPercentage,
                total_votes: totalVotes,
                user_voted_option: newUserVotedOption,
                voter_user_id: newVoterUserId,
            };
        });
    
        
        try {
            await axios.post(`/api/polls/vote/${option_id}`, {
                user_id: usertoken.user.id,
                poll_id: pollId,
            });
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    
    
  


    const progressColors = [
        "rgba(165, 165, 165, 0.1)",  // Light Blue
      ];
    return (
        <section className="poll-view-section">
            <div className="poll-view-container">
                <div className="poll-view-container-inside">
                    {/* Profile Section */}
                    <div className="poll-view-container-inside-profile-details">
                        <div className="poll-view-container-inside-profile-details-user-details">
                            <img
                                src={selectedPoll.posted_by.profile_pic || "/default-profile.png"}
                                alt="Profile"
                                className="poll-view-container-inside-profile-details-profile-pic"
                            />
                            <div className="poll-view-container-inside-profile-details-username-deatils">
                                <h3>{selectedPoll.posted_by.username}</h3>
                                <p><Time posttime={selectedPoll.created_at} /></p>

                            </div>
                        </div>
                        <div className="profile-details-right">
                            {/* {!(usertoken.user.id === selectedPoll.posted_by.user_id)  && <Followbtn  targetUserId={selectedPoll.posted_by.user_id} />} */}

                            <span className="more-btn">
                                 <PostOptions
                                                    onEdit={() => console.log("Edit clicked")}
                                                    onDelete={() => console.log("Delete clicked")}
                                                    onShare={() => console.log("Share clicked")}
                                                    onSave={() => console.log("Post saved")}
                                                    onReport={() => console.log("Post reported")}
                                                    onCopyLink={() => {
                                                      navigator.clipboard.writeText("https://yourwebsite.com/post/123");
                                                      console.log("Link copied!");
                                                    }}
                                                    onHide={() => console.log("Post hidden")}
                                                  />
                            </span>
                        </div>
                    </div>

                    {/* Poll Question */}
                    <div className="poll-view-container-inside-question">
                        <p>~ {selectedPoll.question}</p>
                    </div>

                    {/* Poll Options */}
                    <div className="poll-view-container-inside-option">
                        {selectedPoll.options.map((option,index) => (
                            <label key={option.option_id} className="option-child"style={{
                                border:  option.option_id === selectedPoll.user_voted_option &&
                                selectedPoll.voter_user_id === usertoken.user.id?  progressColors[index % progressColors.length].replace(/0\.1\)$/, "0.4)")  : `1px solid ${progressColors[index % progressColors.length]}`
                              ,  backgroundColor:  option.option_id === selectedPoll.user_voted_option &&
                              selectedPoll.voter_user_id === usertoken.user.id ? progressColors[index % progressColors.length].replace(/0\.1\)$/, "0.3)")  : ""}}>
                                <input type="radio" name="poll-option" onClick={() => handleVote(option.option_id)} />

                                {option.image && <div className="poll-view-img-box"><img src={option.image} alt="Option" className="option-image" />    </div>}

                                <Box sx={{
                                    width: "100%",
                                    height : "100%",
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between", // Text on left & percentage on right
                                }}>
                                  
                                    <LinearProgress
                                        variant="determinate"
                                        value={parseInt(option.percentage)}
                                        sx={{
                                            width: "100%",
                                            height: "100%", 
                                            backgroundColor: "#5d5d5d14",
                                            "& .MuiLinearProgress-bar": {
                                                backgroundColor: progressColors[index % progressColors.length], 
                                            },
                                            position: "absolute", 
                                            top: 0,
                                            left: 0,
                                        }}
                                    />

                             
                                    <Typography
                                        variant="body1"
                                        sx={{ fontWeight: "bold", zIndex: 2, paddingLeft: "10px", color: "#333" }}
                                    >
                                        {option.text}
                                    </Typography>

                           
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: "bold", zIndex: 2, paddingRight: "10px", color: "#333" }}
                                    >
                                        {`${option.percentage}%`}
                                    </Typography>
                                </Box>
                            </label>
                        ))}
                    </div>

                    {/* Reactions */}
                    <div className="poll-reaction">
                        <div className="poll-reaction-left">
                        <div onClick={handleLike} className="poll-reaction-item" style={{ color : selectedPoll.user_has_liked ? 'rgb(0, 123, 255)' : '',gap :'0.3rem'}}>
                            <button>
                                <Heart size={20} />{selectedPoll.likes} Like
                            </button>
                            
                        </div>
                        <div className="poll-reaction-item" style={{gap : '0.3rem'}}>
                            <button>
                                <MessageSquare size={20}/> {selectedPoll.comments} comments
                            </button>
                            <p></p>
                        </div>
                        </div>
                        <div className="poll-reaction-right">
                        <div className="poll-reaction-item " style={{gap : '0.3rem'}}>
                            <p>{selectedPoll.views}</p>
                            <span>
                                <ScanEye size={18}/>
                            </span>
                        </div>
                        <div className="poll-reaction-item" style={{gap : '0.3rem'}}>
                            <p>{selectedPoll.total_votes}</p>
                            <span>
                                <AlignEndHorizontal size={18}/>
                            </span>
                        </div>
                        </div>
                       
                      
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PollView;
