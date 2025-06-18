import React, { useContext, useState } from "react";
import "./Feedback.css";
import axios from "axios";
import { Angry, Frown, Meh, Smile, Laugh } from "lucide-react";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import { Helmet } from "react-helmet";

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { usertoken } = useContext(UserAuthCheckContext);

  const handleSubmit = async () => {
    if (!feedbackText || !feedbackType || rating === null) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      const payload = {
        type: feedbackType,
        feedback: feedbackText,
        rating: rating,
        user: usertoken.user.username, // Optional: you can fetch from context/session
      };

      await axios.post("/api/feedback", payload);
      setSubmitted(true);
    } catch (error) {
      alert("Something went wrong while sending feedback.");
    }
  };

  if (submitted) {
    return (
      <div className="feedback-section">
        <div className="feedback-container">
          <h2>Thank You! 🎉</h2>
          <p>Your feedback helps us improve Bindhash.</p>
        </div>
      </div>
    );
  }

  return (

    <div className="feedback-section">
      <Helmet>
        <title>Feedback – Help Us Improve | Bindhash</title>
        <meta
          name="description"
          content="We value your voice. Share your feedback, suggestions, or report any issues to help us make Bindhash better for everyone."
        />
      </Helmet>
      <div className="feedback-container">
        <h2>Customer FeedBack</h2>
        <p>
          We would love to hear your thoughts, suggestions, concerns or problems
          with anything so we can improve!
        </p>
        <div className="separation-line"></div>

        <div className="feedback-container-feedback-type">
          <p>Feedback Type</p>
          <div className="feedback-container-feedback-type-details">
            <label style={feedbackType === "Comment" ? { background: 'var(--buttoncolor)', color: 'var(--bothwhitecolor)' } : {}}  >
              <input

                type="radio"
                name="type"
                value="Comment"
                onChange={(e) => setFeedbackType(e.target.value)}
              />
              Comment
            </label>
            <label style={feedbackType === "Suggestion" ? { background: 'var(--buttoncolor)', color: 'var(--bothwhitecolor)' } : {}} >
              <input
                type="radio"
                name="type"
                value="Suggestion"
                onChange={(e) => setFeedbackType(e.target.value)}
              />
              Suggestion
            </label>
            <label style={feedbackType === "Question" ? { background: 'var(--buttoncolor)', color: 'var(--bothwhitecolor)' } : {}} >
              <input
                type="radio"
                name="type"
                value="Question"
                onChange={(e) => setFeedbackType(e.target.value)}
              />
              Question
            </label>
          </div>
        </div>

        <div className="feedback-container-inside-feedbackArea">
          <p>
            Describe your sweet feedback<span>*</span>
          </p>
          <textarea
            placeholder="Feedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          ></textarea>
        </div>

        <p className="rating-question">
          How satisfied are you with our service?
        </p>
        <ul className="rating-area">
          {[1, 2, 3, 4, 5].map((val) => (
            <li
              key={val}
              onClick={() => setRating(val)}
              className={rating === val ? "selected" : ""}
              title={
                ["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"][val - 1]
              }
            >
              {val === 1 && <Angry />}
              {val === 2 && <Frown />}
              {val === 3 && <Meh />}
              {val === 4 && <Smile />}
              {val === 5 && <Laugh />}
            </li>
          ))}
        </ul>
        <div className="rating-area-details">
          <p>Very unsatisfied</p>
          <p>Very satisfied</p>
        </div>

        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Feedback;
