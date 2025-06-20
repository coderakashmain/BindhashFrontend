import React, { useContext, useEffect, useState } from "react"
import "./LandingPage.css"
import { Helmet } from "react-helmet";


import {
  ChatBubbleOutline,
  GroupsOutlined,
  PsychologyOutlined,
  SecurityOutlined,
  ConnectWithoutContactOutlined,
  CategoryOutlined,
  FavoriteOutlined,
  SchoolOutlined,
  WorkOutlineOutlined,
  FavoriteBorderOutlined,
  PsychologyOutlined as MentalHealthIcon,
  AttachMoneyOutlined,
  FitnessCenter,
  PaletteOutlined,
  FamilyRestroomOutlined,
  PersonOutlined,
  RefreshOutlined,
  NatureOutlined,
  HandshakeOutlined,
  LockOutlined as PrivacyIcon,
  BlockOutlined,
  VolunteerActivismOutlined,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { UserAuthCheckContext } from "../../Context/UserAuthCheck";
import Bangbox from "../../components/Bangbox/Bangbox";


export default function LandingPage() {

  const navigate = useNavigate();
  const { usertoken } = useContext(UserAuthCheckContext);
  const [loading,setLoading] = useState(true);

  return (
    <div className="land-p-container">


      <Helmet >
        <title>Bindhash – Where Real Stories Begin</title>
        <meta
          name="description"
          content="Bindhash is a platform where users share anonymous failures, emotions, and personal stories. Join rooms, chat, and connect with similar minds without judgment."
        />
      </Helmet>



      {/* Navigation */}
      <nav className="land-p-nav">
        <div className="land-p-nav-content">
          <div className="land-p-logo">
            {/* <div className="land-p-logo-icon">
              <ChatBubbleOutline sx={{ fontSize: 32, color: "#1976d2" }} />
            </div>
            <h2>Bindhash</h2> */}
            <Bangbox size='2rem' click={false} />
          </div>
          <div className="land-p-nav-links">
            <a href="#home" className="land-p-nav-link">
              Home
            </a>
            <a href="#features" className="land-p-nav-link">
              Features
            </a>
            <a href="#how-it-works" className="land-p-nav-link">
              How It Works
            </a>
            <a href="#categories" className="land-p-nav-link">
              Categories
            </a>
            {usertoken && (<Avatar alt={usertoken?.user?.username} src={usertoken?.user?.profile_pic} style={{ cursor: 'pointer'}} onClick={() => navigate('/')} />)}
            <button className="land-p-join-btn" onClick={() => navigate(usertoken ? '/' : '/login')}>Join Anonymous</button>
          </div>
          <div className="land-p-mobile-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="land-p-hero" id="home">
        <div className="land-p-hero-content">
          <div className="land-p-hero-text">
            <h1 className="land-p-hero-title">
              Share Your Failures.
              <br />
              Find Your Tribe.
            </h1>
            <p className="land-p-hero-subtitle">
              The anonymous social platform where vulnerability becomes strength. Share failures, connect randomly, and
              find support in category-based communities.
            </p>
            <div className="land-p-hero-buttons">
              <button className="land-p-cta-btn primary" onClick={() => navigate(usertoken ? '/' : '/login')}>Start Sharing Anonymously</button>
              <button className="land-p-cta-btn secondary">Explore Communities</button>
            </div>
            <div className="land-p-hero-stats">
              <div className="land-p-stat">
                <span className="land-p-stat-number">50K+</span>
                <span className="land-p-stat-label">Anonymous Posts</span>
              </div>
              <div className="land-p-stat">
                <span className="land-p-stat-number">25K+</span>
                <span className="land-p-stat-label">Active Members</span>
              </div>
              <div className="land-p-stat">
                <span className="land-p-stat-number">100+</span>
                <span className="land-p-stat-label">Categories</span>
              </div>
            </div>
          </div>
          <div className="land-p-hero-visual">
            <svg width="500" height="400" viewBox="0 0 500 400" className="land-p-hero-svg">
              {/* Anonymous chat bubbles */}
              <g className="land-p-chat-group">
                <rect
                  x="50"
                  y="80"
                  width="120"
                  height="60"
                  rx="20"
                  fill="rgba(25, 118, 210, 0.1)"
                  stroke="#1976d2"
                  strokeWidth="2"
                />
                <text x="110" y="105" textAnchor="middle" fill="#1976d2" fontSize="12">
                  Failed my exam...
                </text>
                <text x="110" y="120" textAnchor="middle" fill="#1976d2" fontSize="10">
                  Anonymous
                </text>
              </g>
              <g className="land-p-chat-group" style={{ animationDelay: "0.5s" }}>
                <rect
                  x="200"
                  y="150"
                  width="140"
                  height="60"
                  rx="20"
                  fill="rgba(117, 117, 117, 0.1)"
                  stroke="#757575"
                  strokeWidth="2"
                />
                <text x="270" y="175" textAnchor="middle" fill="#424242" fontSize="12">
                  Lost my job today
                </text>
                <text x="270" y="190" textAnchor="middle" fill="#757575" fontSize="10">
                  Anonymous
                </text>
              </g>
              <g className="land-p-chat-group" style={{ animationDelay: "1s" }}>
                <rect
                  x="80"
                  y="220"
                  width="130"
                  height="60"
                  rx="20"
                  fill="rgba(76, 175, 80, 0.1)"
                  stroke="#4caf50"
                  strokeWidth="2"
                />
                <text x="145" y="245" textAnchor="middle" fill="#4caf50" fontSize="12">
                  You're not alone!
                </text>
                <text x="145" y="260" textAnchor="middle" fill="#4caf50" fontSize="10">
                  Anonymous
                </text>
              </g>
              {/* Connection lines */}
              <path
                d="M170 110 Q185 130 200 150"
                stroke="#1976d2"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                className="land-p-connection-line"
              />
              <path
                d="M210 210 Q195 215 145 220"
                stroke="#4caf50"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                className="land-p-connection-line"
              />
              {/* Anonymous masks */}
              <circle cx="380" cy="120" r="25" fill="rgba(117, 117, 117, 0.1)" stroke="#757575" strokeWidth="2" />
              <circle cx="375" cy="115" r="3" fill="#757575" />
              <circle cx="385" cy="115" r="3" fill="#757575" />
              <path d="M375 125 Q380 130 385 125" stroke="#757575" strokeWidth="2" fill="none" />

              <circle cx="420" cy="200" r="25" fill="rgba(25, 118, 210, 0.1)" stroke="#1976d2" strokeWidth="2" />
              <circle cx="415" cy="195" r="3" fill="#1976d2" />
              <circle cx="425" cy="195" r="3" fill="#1976d2" />
              <path d="M415 205 Q420 210 425 205" stroke="#1976d2" strokeWidth="2" fill="none" />

              <circle cx="350" cy="280" r="25" fill="rgba(76, 175, 80, 0.1)" stroke="#4caf50" strokeWidth="2" />
              <circle cx="345" cy="275" r="3" fill="#4caf50" />
              <circle cx="355" cy="275" r="3" fill="#4caf50" />
              <path d="M345 285 Q350 290 355 285" stroke="#4caf50" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="land-p-features" id="features">
        <div className="land-p-features-content">
          <div className="land-p-section-header">
            <h2 className="land-p-section-title">Why Choose Bindhash?</h2>
            <p className="land-p-section-subtitle">A safe space for authentic connections and personal growth</p>
          </div>
          <div className="land-p-features-grid">
            <div className="land-p-feature-card">
              <div className="land-p-feature-visual">
                <div className="land-p-feature-icon-wrapper">
                  <ChatBubbleOutline sx={{ fontSize: 48, color: "#1976d2" }} />
                </div>
              </div>
              <h3>Anonymous Failure Sharing</h3>
              <p>
                Share your setbacks without judgment. Transform failures into learning experiences with community
                support.
              </p>
            </div>

            <div className="land-p-feature-card">
              <div className="land-p-feature-visual">
                <div className="land-p-feature-icon-wrapper">
                  <ConnectWithoutContactOutlined sx={{ fontSize: 48, color: "#ff9800" }} />
                </div>
              </div>
              <h3>Random Anonymous Chat</h3>
              <p>
                Connect with strangers instantly. No profiles, no history - just genuine conversations in the moment.
              </p>
            </div>

            <div className="land-p-feature-card">
              <div className="land-p-feature-visual">
                <div className="land-p-feature-icon-wrapper">
                  <FavoriteOutlined sx={{ fontSize: 48, color: "#9c27b0" }} />
                </div>
              </div>
              <h3>Smart Matching</h3>
              <p>Our algorithm connects you with people who understand your struggles and share similar experiences.</p>
            </div>

            <div className="land-p-feature-card">
              <div className="land-p-feature-visual">
                <div className="land-p-feature-icon-wrapper">
                  <CategoryOutlined sx={{ fontSize: 48, color: "#4caf50" }} />
                </div>
              </div>
              <h3>Category-Based Rooms</h3>
              <p>
                Join specific communities: Students, Professionals, Relationships, Mental Health, and 100+ more
                categories.
              </p>
            </div>

            <div className="land-p-feature-card">
              <div className="land-p-feature-visual">
                <div className="land-p-feature-icon-wrapper">
                  <PsychologyOutlined sx={{ fontSize: 48, color: "#f44336" }} />
                </div>
              </div>
              <h3>Emotion-Aware Feed</h3>
              <p>
                Content curated based on your emotional state. Get support when you need it, celebrate when you're
                ready.
              </p>
            </div>

            <div className="land-p-feature-card">
              <div className="land-p-feature-visual">
                <div className="land-p-feature-icon-wrapper">
                  <SecurityOutlined sx={{ fontSize: 48, color: "#3f51b5" }} />
                </div>
              </div>
              <h3>End-to-End Privacy</h3>
              <p>
                Military-grade encryption ensures your conversations stay private. No data tracking, no profile
                building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="land-p-how-it-works" id="how-it-works">
        <div className="land-p-how-content">
          <div className="land-p-section-header">
            <h2 className="land-p-section-title">How Bindhash Works</h2>
            <p className="land-p-section-subtitle">Simple steps to start your anonymous journey</p>
          </div>
          <div className="land-p-steps-container">
            <div className="land-p-step">
              <div className="land-p-step-visual">
                <div className="land-p-step-icon-wrapper">
                  <div className="land-p-step-number">1</div>
                  <PersonOutlined sx={{ fontSize: 40, color: "#1976d2" }} />
                </div>
              </div>
              <h3>Join Anonymously</h3>
              <p>No email, no phone number, no personal details. Just pick a temporary username and you're in.</p>
            </div>

            <div className="land-p-step">
              <div className="land-p-step-visual">
                <div className="land-p-step-icon-wrapper">
                  <div className="land-p-step-number">2</div>
                  <ChatBubbleOutline sx={{ fontSize: 40, color: "#ff9800" }} />
                </div>
              </div>
              <h3>Share Your Story</h3>
              <p>Post about your failures, setbacks, or struggles. Choose from 100+ categories or create your own.</p>
            </div>

            <div className="land-p-step">
              <div className="land-p-step-visual">
                <div className="land-p-step-icon-wrapper">
                  <div className="land-p-step-number">3</div>
                  <GroupsOutlined sx={{ fontSize: 40, color: "#4caf50" }} />
                </div>
              </div>
              <h3>Connect & Support</h3>
              <p>Get matched with others who understand. Chat randomly or join category-specific support groups.</p>
            </div>

            <div className="land-p-step">
              <div className="land-p-step-visual">
                <div className="land-p-step-icon-wrapper">
                  <div className="land-p-step-number">4</div>
                  <NatureOutlined sx={{ fontSize: 40, color: "#9c27b0" }} />
                </div>
              </div>
              <h3>Grow Together</h3>
              <p>Transform failures into wisdom. Help others while healing yourself in a judgment-free community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="land-p-categories" id="categories">
        <div className="land-p-categories-content">
          <div className="land-p-section-header">
            <h2 className="land-p-section-title">Find Your Community</h2>
            <p className="land-p-section-subtitle">Join category-based rooms where you belong</p>
          </div>
          <div className="land-p-categories-grid">
            <div className="land-p-category-card">
              <div className="land-p-category-icon">
                <SchoolOutlined sx={{ fontSize: 48, color: "#1976d2" }} />
              </div>
              <h3>Students</h3>
              <p>Academic failures, exam stress, career confusion</p>
              <span className="land-p-member-count">12.5K members</span>
            </div>
            <div className="land-p-category-card">
              <div className="land-p-category-icon">
                <WorkOutlineOutlined sx={{ fontSize: 48, color: "#ff9800" }} />
              </div>
              <h3>Professionals</h3>
              <p>Job rejections, workplace struggles, career setbacks</p>
              <span className="land-p-member-count">8.3K members</span>
            </div>
            <div className="land-p-category-card">
              <div className="land-p-category-icon">
                <FavoriteBorderOutlined sx={{ fontSize: 48, color: "#e91e63" }} />
              </div>
              <h3>Relationships</h3>
              <p>Breakups, dating failures, family issues</p>
              <span className="land-p-member-count">15.2K members</span>
            </div>
            <div className="land-p-category-card">
              <div className="land-p-category-icon">
                <MentalHealthIcon sx={{ fontSize: 48, color: "#9c27b0" }} />
              </div>
              <h3>Mental Health</h3>
              <p>Depression, anxiety, self-doubt, therapy journey</p>
              <span className="land-p-member-count">20.1K members</span>
            </div>
            <div className="land-p-category-card">
              <div className="land-p-category-icon">
                <AttachMoneyOutlined sx={{ fontSize: 48, color: "#4caf50" }} />
              </div>
              <h3>Financial</h3>
              <p>Business failures, debt, investment losses</p>
              <span className="land-p-member-count">6.7K members</span>
            </div>
            <div className="land-p-category-card">
              <div className="land-p-category-icon">
                <FitnessCenter sx={{ fontSize: 48, color: "#ff5722" }} />
              </div>
              <h3>Health & Fitness</h3>
              <p>Diet failures, workout struggles, health setbacks</p>
              <span className="land-p-member-count">9.4K members</span>
            </div>
            <div className="land-p-category-card">
              <div className="land-p-category-icon">
                <PaletteOutlined sx={{ fontSize: 48, color: "#673ab7" }} />
              </div>
              <h3>Creative</h3>
              <p>Artistic blocks, rejected projects, creative burnout</p>
              <span className="land-p-member-count">4.8K members</span>
            </div>
            <div className="land-p-category-card">
              <div className="land-p-category-icon">
                <FamilyRestroomOutlined sx={{ fontSize: 48, color: "#795548" }} />
              </div>
              <h3>Parenting</h3>
              <p>Parenting mistakes, family challenges, guilt</p>
              <span className="land-p-member-count">7.9K members</span>
            </div>
          </div>
          <div className="land-p-categories-cta">
            <p>
              Can't find your category? <strong>Create your own room</strong> and find others like you.
            </p>
            <button className="land-p-cta-btn primary">Explore All 100+ Categories</button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="land-p-benefits">
        <div className="land-p-benefits-content">
          <div className="land-p-benefits-text">
            <h2>Why Anonymous Sharing Works</h2>
            <div className="land-p-benefit-item">
              <div className="land-p-benefit-icon">
                <PersonOutlined sx={{ fontSize: 32, color: "#1976d2" }} />
              </div>
              <div>
                <h3>No Social Pressure</h3>
                <p>Share without fear of judgment from friends, family, or colleagues. Your reputation stays intact.</p>
              </div>
            </div>
            <div className="land-p-benefit-item">
              <div className="land-p-benefit-icon">
                <RefreshOutlined sx={{ fontSize: 32, color: "#4caf50" }} />
              </div>
              <div>
                <h3>Honest Feedback</h3>
                <p>Get genuine advice from people who have no agenda. Pure, unbiased support and guidance.</p>
              </div>
            </div>
            <div className="land-p-benefit-item">
              <div className="land-p-benefit-icon">
                <NatureOutlined sx={{ fontSize: 32, color: "#ff9800" }} />
              </div>
              <div>
                <h3>Personal Growth</h3>
                <p>Transform shame into strength. Learn from failures and help others do the same.</p>
              </div>
            </div>
            <div className="land-p-benefit-item">
              <div className="land-p-benefit-icon">
                <HandshakeOutlined sx={{ fontSize: 32, color: "#9c27b0" }} />
              </div>
              <div>
                <h3>Real Connections</h3>
                <p>Bond over shared struggles. Form deeper relationships based on vulnerability and authenticity.</p>
              </div>
            </div>
          </div>
          <div className="land-p-benefits-visual">
            <svg width="400" height="300" viewBox="0 0 400 300">
              <defs>
                <linearGradient id="benefitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1976d2" />
                  <stop offset="100%" stopColor="#42a5f5" />
                </linearGradient>
              </defs>
              {/* Central figure */}
              <circle cx="200" cy="150" r="40" fill="url(#benefitGradient)" opacity="0.8" />
              <circle cx="190" cy="140" r="3" fill="white" />
              <circle cx="210" cy="140" r="3" fill="white" />
              <path d="M185 160 Q200 170 215 160" stroke="white" strokeWidth="3" fill="none" />

              {/* Surrounding support figures */}
              <g className="land-p-support-figure" style={{ animationDelay: "0s" }}>
                <circle cx="120" cy="80" r="25" fill="rgba(25, 118, 210, 0.2)" />
                <circle cx="115" cy="75" r="2" fill="#1976d2" />
                <circle cx="125" cy="75" r="2" fill="#1976d2" />
                <path d="M112 85 Q120 90 128 85" stroke="#1976d2" strokeWidth="2" fill="none" />
                <path
                  d="M145 105 Q172 125 200 150"
                  stroke="#1976d2"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="3,3"
                />
              </g>

              <g className="land-p-support-figure" style={{ animationDelay: "0.5s" }}>
                <circle cx="280" cy="80" r="25" fill="rgba(76, 175, 80, 0.3)" />
                <circle cx="275" cy="75" r="2" fill="#4caf50" />
                <circle cx="285" cy="75" r="2" fill="#4caf50" />
                <path d="M272 85 Q280 90 288 85" stroke="#4caf50" strokeWidth="2" fill="none" />
                <path
                  d="M255 105 Q228 125 200 150"
                  stroke="#4caf50"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="3,3"
                />
              </g>

              <g className="land-p-support-figure" style={{ animationDelay: "1s" }}>
                <circle cx="120" cy="220" r="25" fill="rgba(255, 152, 0, 0.3)" />
                <circle cx="115" cy="215" r="2" fill="#ff9800" />
                <circle cx="125" cy="215" r="2" fill="#ff9800" />
                <path d="M112 225 Q120 230 128 225" stroke="#ff9800" strokeWidth="2" fill="none" />
                <path
                  d="M145 195 Q172 175 200 150"
                  stroke="#ff9800"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="3,3"
                />
              </g>

              <g className="land-p-support-figure" style={{ animationDelay: "1.5s" }}>
                <circle cx="280" cy="220" r="25" fill="rgba(156, 39, 176, 0.3)" />
                <circle cx="275" cy="215" r="2" fill="#9c27b0" />
                <circle cx="285" cy="215" r="2" fill="#9c27b0" />
                <path d="M272 225 Q280 230 288 225" stroke="#9c27b0" strokeWidth="2" fill="none" />
                <path
                  d="M255 195 Q228 175 200 150"
                  stroke="#9c27b0"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="3,3"
                />
              </g>

              {/* Hearts floating around */}
              <g className="land-p-floating-heart" style={{ animationDelay: "0s" }}>
                <path
                  d="M50 50 Q45 45 40 50 Q35 45 30 50 Q35 60 50 70 Q65 60 70 50 Q65 45 60 50 Q55 45 50 50"
                  fill="#ff4081"
                  opacity="0.6"
                />
              </g>
              <g className="land-p-floating-heart" style={{ animationDelay: "2s" }}>
                <path
                  d="M350 250 Q345 245 340 250 Q335 245 330 250 Q335 260 350 270 Q365 260 370 250 Q365 245 360 250 Q355 245 350 250"
                  fill="#ff4081"
                  opacity="0.6"
                />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="land-p-testimonials">
        <div className="land-p-testimonials-content">
          <div className="land-p-section-header">
            <h2 className="land-p-section-title">Real Stories, Real Impact</h2>
            <p className="land-p-section-subtitle">How Bindhash changed lives (shared anonymously, of course)</p>
          </div>
          <div className="land-p-testimonials-grid">
            <div className="land-p-testimonial-card">
              <div className="land-p-testimonial-content">
                <p>
                  "I failed my startup and felt like a complete failure. Sharing my story here helped me realize I
                  wasn't alone. The support I received gave me courage to try again."
                </p>
              </div>
              <div className="land-p-testimonial-author">
                <div className="land-p-author-avatar">
                  <WorkOutlineOutlined sx={{ fontSize: 24, color: "#1976d2" }} />
                </div>
                <div>
                  <span className="land-p-author-name">Anonymous Entrepreneur</span>
                  <span className="land-p-author-category">Business Failures</span>
                </div>
              </div>
            </div>

            <div className="land-p-testimonial-card">
              <div className="land-p-testimonial-content">
                <p>
                  "After my third job rejection, I was devastated. The random chat feature connected me with someone who
                  went through the same thing. We motivated each other to keep going."
                </p>
              </div>
              <div className="land-p-testimonial-author">
                <div className="land-p-author-avatar">
                  <ConnectWithoutContactOutlined sx={{ fontSize: 24, color: "#4caf50" }} />
                </div>
                <div>
                  <span className="land-p-author-name">Anonymous Job Seeker</span>
                  <span className="land-p-author-category">Career Struggles</span>
                </div>
              </div>
            </div>

            <div className="land-p-testimonial-card">
              <div className="land-p-testimonial-content">
                <p>
                  "The student category became my safe haven during exam failures. Knowing others struggled too made me
                  feel less alone. I found study partners and emotional support."
                </p>
              </div>
              <div className="land-p-testimonial-author">
                <div className="land-p-author-avatar">
                  <SchoolOutlined sx={{ fontSize: 24, color: "#ff9800" }} />
                </div>
                <div>
                  <span className="land-p-author-name">Anonymous Student</span>
                  <span className="land-p-author-category">Academic Pressure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="land-p-final-cta">
        <div className="land-p-final-cta-content">
          <div className="land-p-cta-visual">
            <svg width="300" height="200" viewBox="0 0 300 200">
              <circle
                cx="150"
                cy="100"
                r="80"
                fill="rgba(25, 118, 210, 0.1)"
                stroke="#1976d2"
                strokeWidth="3"
                strokeDasharray="10,5"
              />
              <circle cx="150" cy="100" r="50" fill="rgba(25, 118, 210, 0.2)" />
              <circle cx="140" cy="90" r="3" fill="#1976d2" />
              <circle cx="160" cy="90" r="3" fill="#1976d2" />
              <path d="M130 110 Q150 120 170 110" stroke="#1976d2" strokeWidth="3" fill="none" />
              <text x="150" y="140" textAnchor="middle" fill="#1976d2" fontSize="12" fontWeight="bold">
                You're Not Alone
              </text>
            </svg>
          </div>
          <div className="land-p-cta-text">
            <h2>Ready to Turn Your Failures into Strength?</h2>
            <p>Join thousands who've found support, growth, and genuine connections through shared vulnerability.</p>
            <div className="land-p-final-buttons">
              <button className="land-p-cta-btn primary large" onClick={() => navigate(usertoken ? '/' : '/login')}>Start Your Anonymous Journey</button>
              <button className="land-p-cta-btn secondary large">Explore Communities First</button>
            </div>
            <div className="land-p-trust-indicators">
              <div className="land-p-trust-item">
                <PrivacyIcon sx={{ fontSize: 20, color: "#1976d2" }} />
                <span>100% Anonymous</span>
              </div>
              <div className="land-p-trust-item">
                <BlockOutlined sx={{ fontSize: 20, color: "#1976d2" }} />
                <span>No Data Tracking</span>
              </div>
              <div className="land-p-trust-item">
                <VolunteerActivismOutlined sx={{ fontSize: 20, color: "#1976d2" }} />
                <span>Always Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="land-p-footer">
        <div className="land-p-footer-content">
          <div className="land-p-footer-main">
            <div className="land-p-footer-brand">
              <div className="land-p-footer-logo">
                {/* <ChatBubbleOutline sx={{ fontSize: 32, color: "#1976d2" }} />
                <span>Bindhash</span> */}
                <Bangbox size='1.8rem' click={false} />
              </div>
              <p>A safe space for authentic connections and personal growth through shared vulnerability.</p>
            </div>
            <div className="land-p-footer-links">
              <div className="land-p-footer-column">
                <h4>Platform</h4>
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#categories">Categories</a>
                <a href="#safety">Safety</a>
              </div>
              <div className="land-p-footer-column">
                <h4>Community</h4>
                <a href="#guidelines">Guidelines</a>
                <a href="#support">Support</a>
                <a href="#resources">Resources</a>
                <a href="#blog">Blog</a>
              </div>
              <div className="land-p-footer-column">
                <h4>Legal</h4>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#cookies">Cookie Policy</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
          </div>
          <div className="land-p-footer-bottom">
            <p>&copy; 2024 Bindhash. All rights reserved. Built with ❤️ for those who dare to be vulnerable.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
