import react from 'react'
import './PollCreate.css'

const PollCreate = () => {
    return (

        <section className='poll-section '>
            <div className="poll-container">
                <div className="poll-container-inside">
                    <h2>Create a Poll</h2>
                    <p className="create-poll-small-msg">Complete the below fields to create your poll </p>

                    <form action="">

                        <p className='poll-container-input-above-msg-question'>Poll Question<span>*</span></p>
                        <div className="poll-container-input-question">
                            
                            <textarea name="poll-question" id="poll-question" placeholder='What is on your mind ?'></textarea>
                        </div>

                        
                        <div className="poll-container-option">

                            <p className='poll-container-input-above-msg'>Poll Option<span>*</span></p>
                            <div className="poll-container-option-input-group-field">
                                <div className="poll-container-option-input-group-field-option-input">
                                    
                                    <input type="text" placeholder='Option 1' />
                                </div>
                                <div className="uplode-image-btn">
                                    <a className="active" href="">ADD IMAGE</a>
                                </div>
                            </div>

                            <p className='poll-container-input-above-msg'>Poll Option<span>*</span></p>
                            <div className="poll-container-option-input-group-field">
                                <div className="poll-container-option-input-group-field-option-input">
                                    <input type="text" placeholder='Option 2' />
                                </div>
                                <div className="uplode-image-btn">
                                    <a href="">ADD IMAGE</a>
                                </div>
                            </div>

                            <div className="poll-container-add-another-option-btn">
                                <a href="">Add an another Option +</a>
                            </div>
                        </div>

                        <div className="poll-visiblity-box">
                            <p className='poll-visiblity-msg'>Poll Visiblity<span>*</span></p>

                            <div className="poll-container-poll-visiblity-toUser">
                                <label htmlFor="1" className='first-child'>
                                    <input type="radio" id='1' name='a' value='' />Private
                                </label>
                                <label htmlFor="2" className='second-child'>
                                    <input type="radio" id='2' name='a' value='' />Public
                                </label>
                            </div>
                        </div>


                        <button type='submit' className='submit-button'>Create a poll</button>

                    </form>
                </div>

            </div>
        </section>
    )
}

export default PollCreate