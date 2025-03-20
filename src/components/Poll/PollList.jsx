import React, { useContext } from "react";
import { usePolls } from "../../Context/PollProvider";
import PollView from "./PollView";
import { PollProvider } from "../../Context/PollProvider";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";

const PollList = () => {
    const { polls } = usePolls();
    const { usertoken } = useContext(UserAuthCheckContext); 

    if (!usertoken || !usertoken.user) return <p>Loading...</p>;


    return (

        <div>
            {polls.map((poll) => (
                <PollView key={poll.poll_id} pollId={poll.poll_id} />
            ))}
        </div>
       
    );
};

export default PollList;
