import React from "react";
import './Feedback.css'
import { Angry } from 'lucide-react'
import { Frown } from 'lucide-react'
import { Meh } from 'lucide-react'
import { Smile } from 'lucide-react'
import { Laugh } from 'lucide-react'

const Feedback = () => {
    return (
        <div className="feedback-section">
            <div className="feedback-container">

                <h2>Customer FeedBack</h2>
                <p>
                    We would love to hear your thoughts,
                    suggestions, concerns or problems with anything so we can improve!
                </p>
                <div className="separation-line"></div>
                <div className="feedback-container-feedback-type">
                    <p>Feedback Type</p>

                    <div className="feedback-container-feedback-type-details">
                        
                        <label htmlFor="1">
                            <input type="radio" id="1" name="type1" />Comment
                        </label>
                        <label htmlFor="2">
                            <input type="radio" id="2" name="type2" />Suggestion
                        </label>
                        <label htmlFor="3">
                            <input type="radio" id="3" name="type3" />Question
                        </label>
                    </div>
                </div>

                <div className="feedback-container-inside-feedbackArea">
                    <p>Describe your sweet feedback<span>*</span></p>
                    <textarea name="" id="" placeholder="Feedback"></textarea>
                </div>

                <p className="rating-question">How satisfied are you with our service ?</p>
                <ul className="rating-area">
                    <li><Angry /></li>
                    <li><Frown /></li>
                    <li><Meh /></li>
                    <li><Smile /></li>
                    <li><Laugh /></li>
                </ul>
                <div className="rating-area-details">
                    <p>Very unsatisfied</p>
                    <p>Very satisfied</p>
                </div>


                <button>Send</button>


            </div>
        </div>
    )
}
export default Feedback