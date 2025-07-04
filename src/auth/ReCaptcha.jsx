import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // if using React Router

const ReCaptcha = ({ onSuccess }) => {
  const scriptLoaded = useRef(false);
  const widgetIdRef = useRef(null);
  const siteKey = import.meta.env.VITE_ARECAPTCHA_SITE_KEY_CLOUDFIRE;
  const navigate = useNavigate();

  useEffect(() => {
    if (!siteKey) {
      console.error("Cloudflare Turnstile site key is missing.");
      return;
    }

    if (!scriptLoaded.current && siteKey) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        if (window.turnstile) {
          widgetIdRef.current = window.turnstile.render("#captcha-container", {
            sitekey: siteKey,
            size: "compact",
            callback: async (token) => {
              try {
                const res = await axios.post("/api/auth-check/recaptcha/verify-turnstile", { token }, { withCredentials: true });

                if (res.data.success) {
                  onSuccess();

                } else {
                  console.warn("Turnstile failed");
                  navigate("/not-authorized");
                }
              } catch (err) {
                console.error("Turnstile error:", err);
                navigate("/error");
              }
            },
          });


          if (window.turnstile && widgetIdRef.current) {
            window.turnstile.reset(widgetIdRef.current); // Add this line
            window.turnstile.execute(widgetIdRef.current);
          }
        }

        scriptLoaded.current = true;
      };

      document.body.appendChild(script);
    }
  }, [siteKey, onSuccess, navigate]);

  return (
    <div id="captcha-container" style={{ display: "none" }} />

  );
};

export default ReCaptcha;
