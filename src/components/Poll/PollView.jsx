import react from 'react'
import './PollView.css'
import { EllipsisVertical } from 'lucide-react'
import { ThumbsUp } from 'lucide-react'
import { MessageCircle } from 'lucide-react'
import { Eye } from 'lucide-react'

const PollView = () => {
    return (
        <section className='poll-view-section'>
            <div className='poll-view-container'>
                <div className="poll-view-container-inside">

                    <div className="poll-view-container-inside-profile-details">
                        <div className="poll-view-container-inside-profile-details-user-details">
                            <div className="poll-view-container-inside-profile-details-profile-pic"></div>
                            <div className="poll-view-container-inside-profile-details-username-deatils">
                                <h2>UserName</h2>
                                <p>Time</p>
                            </div>
                        </div>
                        <div className="profile-details-right">
                            <button className='follow-btn'>Follow</button>
                            <span className="more-btn"><EllipsisVertical /></span>
                        </div>
                    </div>

                    <p className="poll-view-container-inside-question-msg">Question</p>
                    <div className="poll-view-container-inside-question">
                        <p>Given Question</p>
                    </div>

                    <p className="poll-view-container-inside-options-msg">Select one</p>
                    <div className="poll-view-container-inside-option">

                        <label htmlFor="1" className='first-child'>
                            <input type="radio" id='1' name='a' value='' />Option 1
                        </label>
                        <label htmlFor="2" className='second-child'>
                            <input type="radio" id='2' name='a' value='' />Option 2
                        </label>
                        <label htmlFor="3" className='third-child'>
                            <input type="radio" id='3' name='a' value='' />Option 3
                        </label>
                        <label htmlFor="4" className='forth-child'>
                            <input type="radio" id='4' name='a' value='' />Option 4
                        </label>
                    </div>
                    <div className="poll-reaction">
                        <div className="poll-reaction-item">
                            <span><ThumbsUp /></span>
                            <p>Like</p>
                        </div>
                        <div className="poll-reaction-item">
                            <span><MessageCircle /></span>
                            <p>comment</p>
                        </div>
                        <div className="poll-reaction-item">
                            <span><Eye /></span>
                            <p>Total view</p>
                        </div>

                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PollView 