import React from "react";
import { Send } from "lucide-react";
import "./ShareProfile.css";

const ShareProfile = ({fontsize,profileurllink,backcolor,content,btnhover}) => {
  const profileLink = window.location.href; // Get the current page URL

  const handleShare = async () => {
    try {
      // Copy the link to clipboard
      await navigator.clipboard.writeText(profileLink);
      

      // Open the native share options (if supported)
      if (navigator.share) {
        await navigator.share({
          title: "Check out this profile!",
          text: "Here's a profile you might like:",
          url:profileurllink ? profileurllink : profileLink,
        });
      } else {
        alert("Sharing options are not supported in this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <button  className={`share-btn iconbtn active ${ btnhover===false ? '' : 'btnhover' }`} style={{background : backcolor ? backcolor : '',color :'black' , padding : btnhover  ? btnhover : ''}}  onClick={handleShare}>
        <Send color="black"  size={fontsize ? fontsize : 18}  /> {content ? content : ''}
    </button>
  );
};

export default ShareProfile;
