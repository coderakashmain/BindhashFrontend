import react, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './PollCreate.css'
import { X, ImagePlus, MapPinPlusInside, Plus, Earth, Users } from 'lucide-react'
import CustomDropdown from '../CustomDropdown/CustomDropdown'
import gsap from 'gsap'
import { UserAuthCheckContext } from '../../Context/UserAuthCheck'
import Bangbox from '../Bangbox/Bangbox'

const PollCreate = ({ onClose, pollcreation }) => {
    const [dropselect, setDropselect] = useState();
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [visibility, setVisibility] = useState("public");
    const [images, setImages] = useState([]);
    const pollsectionRef = useRef(null);
    const pollboxRef = useRef(null);
    const {usertoken} = useContext(UserAuthCheckContext);
    const [postbutton,setPostbutton] = useState(false);

    const handleImageUpload = (e, index) => {
        const newImages = [...images];
        newImages[index] = e.target.files[0];
        setImages(newImages);
    };

    useEffect(()=>{
        const allowoptions = options.filter(options => options.trim() !== "");
        
        if(question &&allowoptions.length > 1 ){
            setPostbutton(true)
        }
        else{
            setPostbutton(false);
        }
        

    },[question,options])




    const createPoll = async (e) => {
        e.preventDefault();
        if(!question){
            return
        }
        
        const formData = new FormData();
        formData.append("user_id", usertoken.user.id);
        
        formData.append("question", question);
        formData.append("visibility", visibility);

        const allowoptions = options.filter(options => options.trim() !== "");
        if(allowoptions.length <2){
            return
        }
  

        formData.append("options", JSON.stringify(allowoptions));
        images.forEach((image, index) => {
            if (image) {
              formData.append(`option_images`, image);
            }
          });

        try {
            const response = await axios.post("/api/polls/creation", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            console.log("Poll Created:", response.data);
            onClose();
          } catch (error) {
            console.error("Error Creating Poll:", error);
          }
      
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);
      };

    useEffect(() => {
        if (pollcreation) {
            gsap.fromTo(pollsectionRef.current,
                { backgroundColor: 'rgba(0, 0, 0, 0)',backdropFilter : 'blur(0px)',  },
                { backgroundColor: "var(--popupbackcolor)",backdropFilter : 'blur(4px)', duration: 0.5, ease: "power2.out" });
            gsap.fromTo(pollboxRef.current,
                { y: '100%', opacity: 0.8 },
                { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
            )
        }



    }, [pollcreation])
    
    const handleclose = () => {
        gsap.to(pollsectionRef.current,
            { backgroundColor: "rgba(0, 0, 0, 0)",backdropFilter : 'blur(0px)', duration: 0.5, ease: "power2.out" });
        gsap.to(pollboxRef.current,
            { y: '120%', opacity: 0.8, duration: 0.5, ease: "power2.out", onComplete: onClose },

        )
    }

    
const addOption = () => {
    if(options.length < 5){

        setOptions([...options, ""]);
    }
  };
    return (

        <section ref={pollsectionRef} className='poll-section '>
            <div ref={pollboxRef} className="poll-container  scrollbar">
                <form >
            <h2><Bangbox size={"1.5rem"} click = {true}/><span className='poll-post-box'><button disabled = {!postbutton} type='submit' onClick={createPoll} className={`poll-submit-button active ${!postbutton  ?  'post-off-poll' : ''}`}>Post</button><X size={18} style={{ cursor: 'pointer' }} onClick={handleclose}  /></span> </h2>
                    <div className="poll-container-inside scrollbar">
                        <p className="create-poll-small-msg">Complete the below fields to create your poll </p>


                        <p className='poll-container-input-above-msg-question'>Poll Question<span>*</span></p>
                        <div className="poll-container-input-question">

                            <textarea type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Poll Question"></textarea>
                        </div>


                        <div className="poll-container-option">
                            {options.map((opt, i) => (

                                <div className="poll-container-option-input-group-field" key={i}>
                                    <div className="poll-container-option-input-group-field-option-input">

                                        <input type="text" value={opt} placeholder={`Option ${i + 1}`} onChange={(e) => {
                                            const newOptions = [...options];
                                            newOptions[i] = e.target.value;
                                            setOptions(newOptions);
                                        }} />
                                    </div>
                                    <div className="uplode-image-btn">

                                        {images[i] && (
                                            <div className="image-preview">
                                                <img src={URL.createObjectURL(images[i])} alt="Preview" className="preview-img" />
                                                <button onClick={() => removeImage(i)} className="remove-btn">✖</button>
                                            </div>
                                        )}
                                        <p className="active"> 
                                          { !images[i] && (  <>
                                            <ImagePlus size={18} />  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i)} />
                                            </>)}
                                        </p>
                                    </div>
                                </div>


                            ))}
                            <div className="poll-container-add-another-option-btn">
                                <p  onClick={addOption}><Plus size={18} />Add an another Option </p> <p ><MapPinPlusInside size={18} />Add location</p> <CustomDropdown setDropselect={setDropselect} />


                            </div>
                        </div>





                    </div>
                </form>

            </div>
        </section>
    )
}

export default PollCreate